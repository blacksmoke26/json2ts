/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import StringUtils from '~/utils/StringUtils';
import ConverterUtils from '~/utils/ConverterUtils';

// types
import type { ExportType, ConvertOptions, ParseResult, CaseType } from '~/typings/global';

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
 * Abstract base class for JSON to TypeScript interface converters.
 * Provides robust common functionality with enhanced error handling and validation.
 */
export default abstract class ConverterBase {
  private static readonly JSON_START_CHARS = new Set(['{', '[', '"', 't', 'f', 'n', '-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

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
    if (!this.isValidIdentifier(interfaceName)) {
      throw new Error(`Invalid interface name: "${interfaceName}". Must be a valid TypeScript identifier.`);
    }

    // Parse JSON with enhanced error handling
    const parseResult = this.parseJson(jsonData);
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
   * Validates if a string is a valid TypeScript identifier.
   */
  private static isValidIdentifier(name: string): boolean {
    return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name);
  }

  /**
   * Parses JSON string or returns the input if it's already an object.
   * Enhanced with comprehensive validation and detailed error reporting.
   *
   * @param json The JSON string or object to parse.
   * @returns ParseResult containing parsed data or error information.
   */
  protected static parseJson(json: string | unknown | null): ParseResult {
    // Handle null/undefined
    if (json == null) {
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
   * @param property The original property name.
   * @param type The TypeScript type for the property.
   * @param options Configuration options for formatting. Optional.
   * @returns A formatted TypeScript property declaration string.
   */
  protected formatPropertyValue(property: string, type: string, options: ConvertOptions = {}): string {
    const name = ConverterUtils.suggestPropertyName(StringUtils.formatName(property, options?.propertyCase ?? 'original'))
    const readonly = options?.readonlyProperties ? 'readonly ' : '';
    return `${readonly}${name}: ${type};`;
  }

  /**
   * Protected constructor to enforce factory pattern usage.
   */
  protected constructor() {
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
