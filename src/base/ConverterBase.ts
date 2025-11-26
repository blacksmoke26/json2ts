/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// utils
import ConverterUtils from '~/utils/ConverterUtils';

// types
import type { ExportType, ConvertOptions } from '~/typings/global';

/**
 * Abstract base class for JSON to TypeScript interface converters.
 * Provides robust common functionality with enhanced error handling and validation.
 */
export default abstract class ConverterBase {
  /**
   * Protected constructor to enforce factory pattern usage.
   */
  protected constructor() {
  }

  /**
   * Converts a JSON object into a TypeScript interface.
   * Implements template method pattern with validation and error handling.
   *
   * @param jsonData The JSON object to convert. Must be a valid object structure.
   * @param interfaceName The name for the generated interface. Defaults to 'RootObject'.
   * @param exportType Determines the export strategy. Defaults to 'root'.
   * @param options Configuration options for the conversion process.
   * @returns Formatted TypeScript interface string or null if conversion fails.
   * @throws {Error} If conversion encounters unrecoverable errors.
   * @example
   * ```typescript
   * const json = '{"name": "John", "age": 30}';
   * const interface = ConverterBase.convert(json, 'Person', 'all', {
   *   arrayMaxTupleSize: 5,
   *   strict: true
   * });
   * ```
   */
  public static convert(
    jsonData: string | unknown,
    interfaceName: string = 'RootObject',
    exportType: ExportType = 'root',
    options: ConvertOptions = {},
  ): string | null {
    // Validate interface name
    if (!ConverterUtils.checkIdentifier(interfaceName)) {
      throw new Error(`Invalid interface name: "${interfaceName}". Must be a valid TypeScript identifier.`);
    }

    // Parse JSON with enhanced error handling
    const parseResult = ConverterUtils.jsonParse(jsonData);
    if (parseResult.error) {
      console.error(`Conversion failed: ${parseResult.error}${parseResult.details ? ` - ${parseResult.details}` : ''}`);
      return null;
    }

    // Create converter instance and delegate conversion
    try {
      const converter = this.createConverter(options);
      return converter.convertJson(parseResult.data, interfaceName, exportType);
    } catch (error) {
      console.error('Conversion failed:', error instanceof Error ? error.message : String(error));
      return null;
    }
  }

  /**
   * Factory method to create converter instance.
   * Must be implemented by concrete converter classes.
   */
  protected static createConverter(options: ConvertOptions): ConverterBase {
    throw new Error('createConverter must be implemented by concrete converter class');
  }

  /**
   * Converts a JSON object into TypeScript interface definitions.
   * Core conversion logic to be implemented by concrete converters.
   *
   * @param jsonData The JSON object to convert. Must be a valid object.
   * @param rootInterfaceName The name for the root interface.
   * @param exportType Export strategy for generated interfaces.
   * @returns Formatted TypeScript interface definitions.
   * @throws {Error} If conversion fails due to invalid input or processing errors.
   */
  protected abstract convertJson(
    jsonData: unknown,
    rootInterfaceName: string,
    exportType?: ExportType,
  ): string;
}
