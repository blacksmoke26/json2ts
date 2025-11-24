/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

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
}
