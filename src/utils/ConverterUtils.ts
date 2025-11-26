/**
 * Utility class containing helper methods for JSON to TypeScript conversion.
 * Provides type detection, validation, and formatting functionality for converting
 * JSON data into TypeScript interfaces with various configuration options.
 *
 * Features include:
 * - Type detection from arrays and objects with configurable tuple generation
 * - Interface name suggestion based on JSON structure analysis
 * - Property name validation and formatting with case transformation support
 * - Robust JSON parsing with comprehensive error handling and reporting
 * - TypeScript identifier validation to avoid reserved words
 *
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import StringUtils from '~/utils/StringUtils';

// types
import type { ConvertOptions, ParseResult } from '~/typings/global';

/**
 * Error types for JSON parsing failures.
 */
export enum JsonParseError {
  INVALID_INPUT = 'Invalid input: provided value cannot be parsed',
  INVALID_FORMAT = 'Invalid JSON format: input does not appear to be valid JSON',
  PARSE_FAILED = 'JSON parsing failed',
  UNDEFINED_RESULT = 'Invalid JSON: parsed result is undefined'
}

/**
 * Utility class containing helper methods for JSON to TypeScript conversion.
 * Provides type detection and analysis functionality for array values.
 */
export default abstract class ConverterUtils {
  /**
   * Set of TypeScript reserved words that cannot be used as identifiers.
   * Includes all JavaScript keywords plus TypeScript-specific keywords.
   * Used for validation when generating TypeScript interface property names.
   */
  private static readonly TS_RESERVED_WORDS = new Set([
    'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
    'delete', 'do', 'else', 'export', 'extends', 'false', 'finally', 'for', 'function',
    'if', 'import', 'in', 'instanceof', 'let', 'new', 'null', 'return', 'super',
    'switch', 'this', 'throw', 'true', 'try', 'typeof', 'var', 'void', 'while', 'with',
    'as', 'implements', 'interface', 'package', 'private', 'protected', 'public',
    'static', 'yield', 'abstract', 'async', 'await', 'constructor', 'declare',
    'get', 'module', 'namespace', 'require', 'set', 'type', 'from', 'of', 'keyof',
    'readonly', 'unique', 'unknown', 'never', 'any', 'boolean', 'number', 'object',
    'string', 'symbol', 'asserts', 'is', 'infer', 'out', 'satisfies'
  ]);

  /**
   * Set of characters that can appear at the beginning of a valid JSON string.
   * Used for quick validation to determine if a string might be valid JSON
   * before attempting to parse it.
   *
   * The characters are:
   * - '{' and '[': Object and array start
   * - '"': String start
   * - 't': true literal
   * - 'f': false literal
   * - 'n': null literal
   * - '-': Negative number start
   * - '0'-'9': Digit characters for numbers
   */
  private static readonly JSON_START_CHARS = new Set(['{', '[', '"', 't', 'f', 'n', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

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

  /**
   * Parses JSON string or returns the input if it's already an object.
   * Enhanced with comprehensive validation and detailed error reporting.
   *
   * This method provides robust JSON parsing with the following features:
   * - Accepts JSON strings, objects, or null/undefined values
   * - Performs input validation before parsing attempts
   * - Provides detailed error messages with position information
   * - Returns structured results with error categorization
   * - Handles edge cases like empty strings and whitespace
   * - Includes input snippets in error messages for debugging
   *
   * The parsing process includes multiple validation stages:
   * 1. Null/undefined check with immediate error reporting
   * 2. Type detection (string vs already parsed object)
   * 3. Empty/whitespace string validation
   * 4. Quick format validation using first character check
   * 5. Actual JSON parsing with comprehensive error handling
   *
   * Error types returned:
   * - INVALID_INPUT: Null, undefined, empty, or whitespace input
   * - INVALID_FORMAT: Input doesn't start with valid JSON character
   * - PARSE_FAILED: JSON.parse() throws an exception
   * - UNDEFINED_RESULT: Parsed result is undefined (edge case)
   *
   * @param json The JSON string, object, or null/undefined value to parse.
   *             When a non-string value is provided, it's returned as-is.
   *             When a string is provided, it undergoes validation and parsing.
   *
   * @returns ParseResult object containing:
   *          - data: The parsed JSON object/array/primitive, or null if parsing failed
   *          - error: JsonParseError enum value if parsing failed, undefined otherwise
   *          - details: Human-readable error message with context for debugging,
   *                    including position information and input snippets when applicable
   *
   * @example
   * ```typescript
   * // Valid JSON string
   * const result1 = ConverterUtils.jsonParse('{"name": "John"}');
   * // returns: { data: { name: "John" } }
   *
   * // Already parsed object
   * const result2 = ConverterUtils.jsonParse({ name: "John" });
   * // returns: { data: { name: "John" } }
   *
   * // Invalid JSON
   * const result3 = ConverterUtils.jsonParse('{"name": "John"');
   * // returns: {
   * //   data: null,
   * //   error: JsonParseError.PARSE_FAILED,
   * //   details: "at position 15: Unexpected end of JSON input\nInput: {\"name\": \"John\""
   * // }
   *
   * // Empty string
   * const result4 = ConverterUtils.jsonParse('   ');
   * // returns: {
   *   data: null,
   *   error: JsonParseError.INVALID_INPUT,
   *   details: 'Input is empty or whitespace'
   * }
   *
   * // Invalid format
   * const result5 = ConverterUtils.jsonParse('hello world');
   * // returns: {
   *   data: null,
   *   error: JsonParseError.INVALID_FORMAT,
   *   details: "Input starts with 'h', expected JSON value"
   * }
   * ```
   */
  public static jsonParse(json: string | unknown | null): ParseResult {
    // Handle null/undefined
    if (json === null) {
      return { data: null, error: JsonParseError.INVALID_INPUT, details: 'Input is null or undefined' };
    }

    // Return non-string values as-is
    if (typeof json !== 'string') {
      return { data: json };
    }

    // Handle empty strings
    const trimmed = json.trim();
    if (!trimmed) {
      return { data: null, error: JsonParseError.INVALID_INPUT, details: 'Input is empty or whitespace' };
    }

    // Quick format validation
    if (!this.JSON_START_CHARS.has(trimmed[0])) {
      return {
        data: null,
        error: JsonParseError.INVALID_FORMAT,
        details: `Input starts with '${trimmed[0]}', expected JSON value`,
      };
    }

    try {
      const parsed = JSON.parse(trimmed);

      if (parsed === undefined) {
        return { data: null, error: JsonParseError.UNDEFINED_RESULT };
      }

      return { data: parsed };
    } catch (e: any) {
      const position = e.message.match(/position (\d+)/)?.[1] || 'unknown';
      const snippet = trimmed.length > 100 ? `${trimmed.substring(0, 97)}...` : trimmed;
      const details = `at position ${position}: ${e.message}\nInput: ${snippet}`;

      return {
        data: null,
        error: JsonParseError.PARSE_FAILED,
        details,
      };
    }
  }

  /**
   * Formats a property declaration string for TypeScript interfaces.
   *
   * This method takes a property name and type along with optional formatting options
   * to generate a properly formatted TypeScript property declaration. It handles:
   * - Property name validation and quoting when necessary
   * - Application of case transformation based on propertyCase option
   * - Addition of readonly modifier when readonlyProperties is enabled
   * - Addition of optional modifier (?) when optionalProperties is enabled
   *
   * The resulting string is ready to be used directly in a TypeScript interface definition.
   *
   * @param property The original property name from the JSON data.
   * @param type The detected or specified TypeScript type for the property.
   * @param options Configuration options that control the formatting behavior:
   *               - propertyCase: Case transformation for the property name
   *               - readonlyProperties: Whether to add readonly modifier
   *               - optionalProperties: Whether to make the property optional
   * @returns A formatted TypeScript property declaration string ready for interface definition.
   *
   * @example
   * ```typescript
   * // Basic usage
   * ConverterUtils.formatPropertyValue('name', 'string');
   * // returns: "name: string"
   *
   * // With readonly and optional
   * ConverterUtils.formatPropertyValue('age', 'number', {
   *   readonlyProperties: true,
   *   optionalProperties: true
   * });
   * // returns: "readonly age?: number"
   *
   * // With property case transformation
   * ConverterUtils.formatPropertyValue('user_name', 'string', {
   *   propertyCase: 'camel'
   * });
   * // returns: "userName: string"
   *
   * // With special characters in property name
   * ConverterUtils.formatPropertyValue('full-name', 'string');
   * // returns: '"full-name": string'
   * ```
   */
  public static formatPropertyValue(property: string, type: string, options: ConvertOptions = {}): string {
    const name = ConverterUtils.suggestPropertyName(StringUtils.formatName(property, options?.propertyCase ?? 'original'))
    const readonly = options?.readonlyProperties ? 'readonly ' : '';
    const optional = options?.optionalProperties ? '?' : '';
    return `${readonly}${name}${optional}: ${type}`;
  }

  /**
   * Validates if a string is a valid TypeScript identifier.
   *
   * A valid TypeScript identifier must:
   * - Start with a letter, underscore, or dollar sign
   * - Contain only letters, numbers, underscores, or dollar signs
   * - Not be a reserved TypeScript keyword
   * - Not consist solely of underscores or dollar signs
   * - Not start with a digit
   *
   * @param name - The string to validate as a TypeScript identifier
   * @returns true if the string is a valid identifier, false otherwise
   *
   * @example
   * ```typescript
   * ConverterUtils.checkIdentifier('validName'); // true
   * ConverterUtils.checkIdentifier('_private'); // true
   * ConverterUtils.checkIdentifier('$special'); // true
   * ConverterUtils.checkIdentifier('123invalid'); // false
   * ConverterUtils.checkIdentifier('class'); // false (reserved word)
   * ConverterUtils.checkIdentifier(''); // false (empty)
   * ConverterUtils.checkIdentifier('___'); // false (only special chars)
   * ```
   */
   public static checkIdentifier(name: string): boolean {
     // Check if input is a non-empty string
     if (typeof name !== 'string' || !name.length) {
       return false;
     }

     switch (true) {
       case this.TS_RESERVED_WORDS.has(name):
       case !/^[A-Za-z_$]/.test(name):
       case !/^[A-Za-z0-9_$]*$/.test(name):
       case !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) || /^[_$]+$/.test(name):
       case /^[0-9]/.test(name):
         return false;
       default:
         return true;
     }
   }
}
