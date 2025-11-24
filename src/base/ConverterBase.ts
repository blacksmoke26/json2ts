/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Represents the export strategy for generated TypeScript interfaces.
 * - 'all': Export all generated interfaces
 * - 'root': Export only the root interface
 * - 'none': No exports (interface definitions only)
 */
export type ExportType = 'all' | 'root' | 'none';

/**
 * Configuration options for JSON to TypeScript conversion.
 *
 * @interface ConvertOptions
 */
export interface ConvertOptions {
  /**
   * Maximum number of items to convert to tuple type.
   * If array length exceeds this value, returns array type instead.
   * @default 10
   */
  arrayMaxTupleSize?: number;

  /**
   * Minimum number of items required to create a tuple type.
   * If array length is less than this value, returns array type instead.
   * @default 2
   */
  arrayMinTupleSize?: number;
}

/**
 * Abstract base class for JSON to TypeScript interface converters.
 * Provides common functionality for parsing JSON and converting it to TypeScript interfaces.
 */
export default abstract class ConverterBase {
  /**
   * Converts a JSON object into a TypeScript interface.
   * This static method serves as the main entry point for the conversion process,
   * creating an instance of the converter and delegating the actual conversion work.
   *
   * @param jsonData The JSON object to convert. Must be a valid object structure.
   *                 Can be a JSON string or a parsed object.
   * @param interfaceName The name for the generated interface (e.g., 'User', 'ApiResponse').
   *                      Defaults to 'RootObject' if not specified.
   * @param exportType Determines the export strategy for the generated interfaces.
   *                   'all' exports all interfaces, 'root' exports only the root interface,
   *                   'none' generates no exports. Defaults to 'all'.
   * @param options Configuration options for the conversion process, including array
   *                tuple size constraints and other conversion settings.
   * @returns A formatted string containing the complete TypeScript interface definition.
   *          The interface will include all nested objects flattened into the main definition.
   *          Returns null if the input cannot be parsed or converted.
   * @throws {Error} If the input is not a valid JSON object (null, primitive, or undefined).
   * @example
   * ```typescript
   * const json = '{"name": "John", "age": 30}';
   * const interface = ConverterBase.convert(json, 'Person', 'all', {
   *   arrayMaxTupleSize: 5,
   *   arrayMinTupleSize: 2
   * });
   * ```
   */
  public static convert(jsonData: string | unknown, interfaceName?: string, exportType?: ExportType, options?: ConvertOptions): string | null {
    throw new Error('No implemented yet');
  }

  /**
   * Parses JSON string or returns the input if it's already an object.
   * Handles null, undefined, and empty string inputs gracefully.
   *
   * @param json The JSON string or object to parse. Can be null or undefined.
   * @returns The parsed JSON object or null if parsing fails or input is invalid.
   */
  protected static parseJson(json: string | unknown | null): unknown | null {
    if (!json) return null;

    if (typeof json !== 'string') {
      return json;
    }

    if (!json.trim()) return null;

    try {
      return JSON.parse(json);
    } catch (e: any) {
      console.error('Failed to parse JSON due to ' + e.message);
      return null;
    }
  }

  /**
   * Creates an instance of ConverterBase.
   * The constructor is protected to enforce the use of the static factory method `convert`.
   */
  protected constructor() {}

  /**
   * Converts a JSON object into TypeScript interface definitions.
   *
   * This abstract method must be implemented by concrete converter classes to define
   * the specific conversion logic. It handles the core transformation of JSON structures
   * into TypeScript interface strings.
   *
   * @param jsonData - The JSON object to convert. Must be a valid object, not null or primitive.
   * @param rootInterfaceName - The name to use for the root interface (e.g., 'User', 'ApiResponse').
   * @param exportType - Optional export strategy for the generated interfaces.
   *                     Controls which interfaces are exported in the output.
   * @returns A formatted string containing the generated TypeScript interface definitions.
   * @throws {Error} If the input is not a valid JSON object or conversion fails.
   */
  protected abstract convertJson(jsonData: unknown, rootInterfaceName: string, exportType?: ExportType): string;
}
