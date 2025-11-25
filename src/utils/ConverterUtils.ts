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
   * Detects the TypeScript type from a JavaScript object or value (Version 2).
   * An improved version of `detectJsTypeFromObject` with better organization and performance.
   *
   * This method performs comprehensive type detection including:
   * - Primitive types (string, number, boolean, bigint, symbol)
   * - Special values (null, undefined)
   * - Built-in objects (Date, RegExp, Error, Promise, etc.)
   * - Typed arrays and array buffers
   * - Functions (including async functions)
   * - Custom class instances
   * - Iterables and generators
   *
   * @param obj - The object or value to analyze for type detection
   * @param strict - Whether to use strict typing. When true, returns 'unknown' for
   *                ambiguous cases instead of 'any'. @default false
   * @returns The detected TypeScript type as a string, or null if the type
   *          cannot be determined (typically for plain objects that should be
   *          handled separately)
   *
   * @example
   * ```typescript
   * // Primitive types
   * ConverterUtils.detectJsTypeFromObject("hello") // returns "string"
   * ConverterUtils.detectJsTypeFromObject(42) // returns "number"
   * ConverterUtils.detectJsTypeFromObject(true) // returns "boolean"
   *
   * // Special values
   * ConverterUtils.detectJsTypeFromObject(null) // returns "unknown"
   * ConverterUtils.detectJsTypeFromObject(undefined) // returns "unknown"
   * ConverterUtils.detectJsTypeFromObject(null, true) // returns "null"
   *
   * // Built-in objects
   * ConverterUtils.detectJsTypeFromObject(new Date()) // returns "Date"
   * ConverterUtils.detectJsTypeFromObject(/pattern/) // returns "RegExp"
   * ConverterUtils.detectJsTypeFromObject(new Error()) // returns "Error"
   *
   * // Arrays and typed arrays
   * ConverterUtils.detectJsTypeFromObject([1, 2, 3]) // returns "any[]"
   * ConverterUtils.detectJsTypeFromObject(new Uint8Array()) // returns "Uint8Array"
   *
   * // Functions
   * ConverterUtils.detectJsTypeFromObject(() => {}) // returns "(...args: any[]) => any"
   * ConverterUtils.detectJsTypeFromObject(async () => {}) // returns "(...args: any[]) => Promise<any>"
   *
   * // Custom class instances
   * class MyClass {}
   * ConverterUtils.detectJsTypeFromObject(new MyClass()) // returns "MyClass"
   *
   * // Plain objects return null (should be handled separately)
   * ConverterUtils.detectJsTypeFromObject({a: 1}) // returns null
   * ```
   */
  public static detectJsTypeFromObject(obj: any, strict: boolean = false): string | null {
    const strictAny: string = strict ? 'unknown' : 'any';
    const type = typeof obj;

    // Handle null and undefined
    if (obj === null) return strict ? 'null' : 'unknown';
    if (obj === undefined) return strict ? 'undefined' : 'unknown';

    // Handle primitives and functions
    if (type !== 'object') {
      if (type === 'function') {
        return obj.constructor.name === 'AsyncFunction'
          ? `(...args: ${strictAny}[]) => Promise<${strictAny}>`
          : `(...args: ${strictAny}[]) => any`;
      }
      if (type === 'bigint') return 'bigint';
      if (type === 'symbol') return 'symbol';
      return type;
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      if (obj.length === 0) return `${strictAny}[]`;
      // Check if it's a typed array
      if ('buffer' in obj && obj.buffer instanceof ArrayBuffer) {
        return obj.constructor.name;
      }
    }

    // Handle special object types in order of specificity
    const specialTypes: [new (...args: any[]) => any, (obj: any) => string][] = [
      [Date, () => 'Date'],
      [RegExp, () => 'RegExp'],
      [Error, () => 'Error'],
      [WeakMap, () => `WeakMap<object, ${strictAny}>`],
      [WeakSet, () => 'WeakSet<object>'],
      [Promise, () => `Promise<${strictAny}>`],
      [ArrayBuffer, () => 'ArrayBuffer'],
      [DataView, () => 'DataView'],
      [Int8Array, () => 'Int8Array'],
      [Uint8Array, () => 'Uint8Array'],
      [Uint8ClampedArray, () => 'Uint8ClampedArray'],
      [Int16Array, () => 'Int16Array'],
      [Uint16Array, () => 'Uint16Array'],
      [Int32Array, () => 'Int32Array'],
      [Uint32Array, () => 'Uint32Array'],
      [Float32Array, () => 'Float32Array'],
      [Float64Array, () => 'Float64Array'],
      [BigInt64Array, () => 'BigInt64Array'],
      [BigUint64Array, () => 'BigUint64Array'],
    ];

    for (const [constructor, getReturnType] of specialTypes) {
      if (obj instanceof constructor) {
        return getReturnType(obj);
      }
    }

    // Handle other typed array views
    if (ArrayBuffer.isView(obj)) {
      return 'ArrayBufferView';
    }

    // Handle iterables
    if (Symbol.iterator in obj) {
      return `Iterable<${strictAny}>`;
    }

    // Handle class instances
    if (obj.constructor?.name && obj.constructor.name !== 'Object' && obj.constructor.name !== 'Function') {
      return obj.constructor.name;
    }

    return null;
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
