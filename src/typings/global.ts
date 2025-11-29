/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { JsonParseError } from '~/utils/ConverterUtils';

/**
 * Supported case naming conventions for transforming strings.
 * - camel: camelCase (first letter lowercase, subsequent words capitalized)
 * - lower_snake: snake_case (all lowercase with underscores)
 * - original: unchanged case (preserves original casing)
 * - pascal: PascalCase (first letter and subsequent words capitalized)
 * - upper_snake: UPPER_SNAKE_CASE (all uppercase with underscores)
 * - kebab: kebab-case (all lowercase with hyphens)
 */
export type CaseType = 'camel' | 'lower_snake' | 'original' | 'pascal' | 'upper_snake' | 'kebab';

/**
 * Result of JSON parsing operation.
 */
export interface ParseResult {
  /** The parsed JSON data or null if parsing failed */
  data: unknown | null;
  /** The type of parsing error that occurred, if any */
  error?: JsonParseError;
  /** Additional error details for debugging purposes */
  details?: string;
}

/**
 * Represents the export strategy for generated TypeScript interfaces.
 * - 'all': Export all generated interfaces
 * - 'root': Export only the root interface
 * - 'none': No exports (interface definitions only)
 */
export type ExportType = 'all' | 'root' | 'none';

/**
 * Configuration options for JSON to TypeScript conversion.
 * Extensible interface for future converter options.
 */
export interface ConvertOptions {
  /**
   * Maximum number of items to convert to tuple type.
   * If array length exceeds this value, returns array type instead.
   * @default 10
   * @example
   * // With arrayMaxTupleSize: 3
   * // ["a", "b", "c"] -> [string, string, string]
   * // ["a", "b", "c", "d"] -> string[]
   */
  arrayMaxTupleSize?: number;

  /**
   * Minimum number of items required to create a tuple type.
   * If array length is less than this value, returns array type instead.
   * @default 2
   * @example
   * // With arrayMinTupleSize: 3
   * // ["a"] -> string[]
   * // ["a", "b", "c"] -> [string, string, string]
   */
  arrayMinTupleSize?: number;

  /**
   * Enable strict type checking for better type inference.
   * @default false
   * @example
   * // With strict: true
   * // { "name": "John" } -> { name: string }
   * // With strict: false
   * // { "name": "John" } -> { name: any }
   */
  strict?: boolean;

  /**
   * Custom type mapping for specific JSON structures.
   * Allows overriding default type detection logic.
   * @example
   * // { "user_id": "123" }
   * // With typeMap: { "user_id": "UserID" }
   * // -> { user_id: UserID }
   */
  typeMap?: Record<string, string>;

  /**
   * The naming convention for generated property names within models.
   * Controls the case transformation applied to class properties.
   * @default 'original'
   * @example
   * // With propertyCase: 'camelCase'
   * // { "user_name": "John" } -> { userName: string }
   * // With propertyCase: 'snake_case'
   * // { "userName": "John" } -> { user_name: string }
   */
  propertyCase?: CaseType;

  /**
   * Make all generated properties readonly.
   * When enabled, all properties in the generated TypeScript interfaces will be marked as readonly.
   * @default false
   * @example
   * // With readonlyProperties: true
   * // { "name": "John" } -> { readonly name: string }
   * // With readonlyProperties: false
   * // { "name": "John" } -> { name: string }
   */
  readonlyProperties?: boolean;

  /**
   * Make all generated properties optional.
   * When enabled, all properties in the generated TypeScript interfaces will be marked as optional with the '?' modifier.
   * @default false
   * @example
   * // With optionalProperties: true
   * // { "name": "John" } -> { name?: string }
   * // With optionalProperties: false
   * // { "name": "John" } -> { name: string }
   */
  optionalProperties?: boolean;
}
