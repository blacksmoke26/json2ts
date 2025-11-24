/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import StringUtils from '~/utils/StringUtils';

/**
 * Utility class containing helper methods for JSON to TypeScript conversion.
 * Provides type detection and analysis functionality for array values.
 */
export default abstract class ConverterUtils {
  /**
   * Detects the TypeScript type from an array of values.
   * Creates a tuple type if mixed values are present within the configured size limits.
   *
   * This method analyzes array contents to determine the most appropriate TypeScript type:
   * - For arrays with identical primitive types: returns array type (e.g., "number[]")
   * - For mixed types within size limits: returns tuple type (e.g., "[number, string]")
   * - For arrays outside size limits: returns generic type (e.g., "any[]")
   * - Handles special values like null, undefined, objects, and nested arrays
   *
   * @param values - The array of values to analyze
   * @param maxTupleSize - Maximum number of items to convert to tuple type.
   *                      If array length exceeds this, returns array type instead.
   *                      @default 10
   * @param minTupleSize - Minimum number of items required to create a tuple type.
   *                      If array length is less than this, returns array type instead.
   *                      @default 2
   * @returns A string representing the detected TypeScript type
   *
   * @example
   * ```typescript
   * // Same type array
   * ConverterUtils.detectTypeFromArray([1, 2, 3]) // returns "number[]"
   *
   * // Mixed types within tuple size limits
   * ConverterUtils.detectTypeFromArray([1, "two", true]) // returns "[number, string, boolean]"
   *
   * // Large array - returns generic type
   * ConverterUtils.detectTypeFromArray(Array(15).fill(0)) // returns "number[]"
   *
   * // Array with objects
   * ConverterUtils.detectTypeFromArray([{a: 1}, {b: 2}]) // returns "object[]"
   *
   * // Mixed with null and undefined
   * ConverterUtils.detectTypeFromArray([1, null, "str"]) // returns "[number, null, string]"
   * ```
   */
  public static detectTypeFromArray(values: unknown[], maxTupleSize: number = 10, minTupleSize: number = 2): string {
    if (!Array.isArray(values) || values.length === 0) {
      return 'any[]';
    }

    // If array is too large or too small, return generic array type
    if (values.length > maxTupleSize || values.length < minTupleSize) {
      const types = [...new Set(values.map(v => typeof v).filter(t => t !== 'object'))];
      if (types.length === 1) {
        return `${types[0]}[]`;
      }
      return 'any[]';
    }

    const uniqueTypes = new Set(values.map(v => {
      if (v === null) return 'null';
      if (v === undefined) return 'undefined';
      if (typeof v === 'object' && !Array.isArray(v)) return 'object';
      if (Array.isArray(v)) return 'array';
      return typeof v;
    }));

    // If all values are of the same primitive type
    if (uniqueTypes.size === 1 && !uniqueTypes.has('object') && !uniqueTypes.has('array')) {
      const type = [...uniqueTypes][0];
      return `${type}[]`;
    }

    // Create tuple type for mixed values
    const tupleTypes = values.map(v => {
      if (v === null) return 'null';
      if (v === undefined) return 'undefined';
      if (typeof v === 'object') return 'object';
      return typeof v;
    });

    return `[${tupleTypes.join(', ')}]`;
  }

  /**
   * Suggests a meaningful interface name based on the provided JSON data.
   * Analyzes the structure and content of JSON objects to generate
   * appropriate interface names that reflect the data's purpose and structure.
   *
   * @param jsonData - The JSON data to analyze for interface naming
   * @param defaultName - Fallback name to use when no suitable name can be derived
   * @returns A suggested interface name based on the JSON structure
   *
   * @example
   * ```typescript
   * // Simple object
   * ConverterUtils.suggestInterfaceName({ name: "John", age: 30 }) // returns "Person"
   *
   * // Object with array property
   * ConverterUtils.suggestInterfaceName({ users: [{ id: 1 }] }) // returns "UserList"
   *
   * // Nested object
   * ConverterUtils.suggestInterfaceName({ profile: { name: "John" } }) // returns "Profile"
   *
   * // Array of objects
   * ConverterUtils.suggestInterfaceName([{ id: 1 }, { id: 2 }]) // returns "Item"
   *
   * // Empty object
   * ConverterUtils.suggestInterfaceName({}) // returns "RootObject"
   * ```
   */
  public static suggestInterfaceName(jsonData: unknown, defaultName: string = 'RootObject'): string {
    if (jsonData === null || jsonData === undefined) {
      return defaultName;
    }

    if (Array.isArray(jsonData)) {
      if (jsonData.length === 0) {
        return defaultName;
      }

      // For array of objects, suggest name based on first object's structure
      const firstItem = jsonData[0];
      if (typeof firstItem === 'object' && firstItem !== null) {
        const keys = Object.keys(firstItem);
        if (keys.length > 0) {
          // Use the first key's name as base
          return StringUtils.capitalize(keys[0]);
        }
      }
      return 'Item';
    }

    if (typeof jsonData !== 'object') {
      return defaultName;
    }

    const obj = jsonData as Record<string, unknown>;
    const keys = Object.keys(obj);

    if (keys.length === 0) {
      return defaultName;
    }

    // If there's only one key and it's a common root name, use it
    if (keys.length === 1) {
      const key = keys[0];
      if (key === 'data' || key === 'result' || key === 'items' || key === 'list') {
        const value = obj[key];
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          const nestedKeys = Object.keys(value);
          if (nestedKeys.length > 0) {
            return StringUtils.capitalize(nestedKeys[0]);
          }
        }
      }
      return StringUtils.capitalize(key);
    }

    // Multiple keys - check if they form a common pattern
    const keyCounts: Record<string, number> = {};
    keys.forEach(key => {
      const baseKey = key.replace(/s$/, ''); // Remove plural 's'
      keyCounts[baseKey] = (keyCounts[baseKey] || 0) + 1;
    });

    // If all keys are variations of the same base, use that base
    const baseKeys = Object.keys(keyCounts);
    if (baseKeys.length === 1 && keyCounts[baseKeys[0]] === keys.length) {
      return StringUtils.capitalize(baseKeys[0]);
    }

    // Fallback to a general name based on number of keys
    if (keys.length <= 3) {
      return 'Data';
    }

    return 'RootObject';
  }

  /**
   * Validates and corrects a TypeScript interface property name.
   * Property names with spaces or not starting with [a-z] will be quoted.
   * @param key - The property name to validate and correct
   * @returns A valid TypeScript property name (quoted if necessary)
   */
  public static suggestPropertyName(key: string): string {
    if (key === null || key === undefined) {
      return 'unnamedProperty';
    }

    // Convert to string to handle non-string inputs
    const keyStr = String(key);

    // Check if key is a valid TypeScript identifier
    const isValidIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(keyStr);

    // If it's already a valid identifier, return as is
    if (isValidIdentifier) {
      return keyStr;
    }

    // If it contains spaces, non-ASCII, unicode or multilingual chars, quote it
    if (keyStr.includes(' ') || !/^[a-z]/.test(keyStr) || /[^a-zA-Z0-9_$]/.test(keyStr)) {
      return `"${keyStr}"`;
    }

    return keyStr;
  }
}
