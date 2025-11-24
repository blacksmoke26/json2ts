/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import ConverterBase, { ConvertOptions, ExportType } from '~/base/ConverterBase';

// utils
import ConverterUtils from '~/utils/ConverterUtils';

/**
 * A utility class that converts JSON objects into flattened TypeScript interfaces.
 * This converter embeds all nested object properties into a single interface definition,
 * eliminating the need for separate interface definitions for nested structures.
 *
 * Key features:
 * - Converts JSON objects to TypeScript interfaces
 * - Embeds nested objects into the main interface
 * - Handles arrays and primitive types appropriately
 * - Prevents infinite recursion with circular reference detection
 * - Supports custom interface names and export types
 *
 * @example
 * Input JSON:
 * ```json
 * {
 *   "user": {
 *     "id": 1,
 *     "name": "John Doe"
 *   },
 *   "posts": [
 *     { "title": "First Post", "content": "Hello World" }
 *   ]
 * }
 * ```
 *
 * Generated TypeScript interface:
 * ```typescript
 * export interface RootObject {
 *   user: {
 *     id: number;
 *     name: string;
 *   };
 *   posts: {
 *     title: string;
 *     content: string;
 *   }[];
 * }
 * ```
 */
export default class JsonToFlattenedTsConverter extends ConverterBase {
  /**
   * Tracks visited objects during conversion to prevent infinite recursion
   * when circular references are encountered in the input JSON.
   * Uses WeakSet to avoid memory leaks for objects that are no longer referenced.
   */
  private visitedObjects = new WeakSet<object>();

  /**
   * Creates an instance of JsonToFlattenedTsConverter.
   * @param options Configuration options for the conversion process.
   */
  private constructor(private options: ConvertOptions = {}) {
    super();
  }

  /**
   * Converts a JSON object or string into a flattened TypeScript interface.
   *
   * @param jsonData - The JSON data to convert. Can be an object or a JSON string.
   * @param interfaceName - Name for the generated interface. Defaults to 'RootObject'.
   * @param exportType - Type of export ('root' or 'interface'). Defaults to 'root'.
   * @param options Configuration options for the conversion process, including array
   *                tuple size constraints and other conversion settings.
   * @returns The generated TypeScript interface as a string, or null if input is invalid.
   *
   * @example
   * ```typescript
   * const jsonData = {
   *   user: { id: 1, name: "John" },
   *   posts: [{ title: "Hello", content: "World" }]
   * };
   * const interfaceString = JsonToFlattenedTsConverter.convert(jsonData, "UserData");
   * console.log(interfaceString);
   * // Output:
   * // export interface UserData {
   * //   user: {
   * //     id: number;
   * //     name: string;
   * //   };
   * //   posts: {
   * //     title: string;
   * //     content: string;
   * //   }[];
   * // }
   * ```
   */
  public static convert(jsonData: unknown | string, interfaceName: string = 'RootObject', exportType: ExportType = 'root', options: ConvertOptions = {}): string | null {
    return super.convert(jsonData, interfaceName, exportType, options);
  }

  /**
   * Factory method to create converter instance.
   */
  protected static createConverter(options: ConvertOptions): ConverterBase {
    return new JsonToFlattenedTsConverter(options);
  }

  /**
   * Generates the TypeScript interface code from parsed JSON data.
   *
   * @param jsonData - The parsed JSON object to convert.
   * @param interfaceName - Name for the generated interface.
   * @param exportType - Type of export ('root' or 'interface').
   * @returns The complete TypeScript interface code.
   */
  protected convertJson(jsonData: unknown, interfaceName: string, exportType: ExportType = 'root'): string {
    const exports = exportType !== 'none' ? 'export ' : '';

    if (typeof jsonData !== 'object' || jsonData === null) {
      return exports + `interface ${interfaceName} {}`;
    }

    // Reset the visited set for each conversion run
    this.visitedObjects = new WeakSet<object>();

    const interfaceBody = this.generateObjectBody(jsonData, 0).trim();

    return exports + `interface ${interfaceName} ${interfaceBody}`.replace(/\[]$/, '');
  }

  /**
   * Recursively generates TypeScript type definitions for objects and their properties.
   * Embeds nested objects into the current interface definition.
   *
   * @param obj - The object or value to convert to a TypeScript type.
   * @param indentLevel - Current indentation level for formatting the output.
   * @returns A string containing the TypeScript type definition.
   */
  private generateObjectBody(obj: any, indentLevel: number): string {
    const indent = this.getIndent(indentLevel);
    const nextIndent = this.getIndent(indentLevel + 1);

    // Handle null values
    if (obj === null) {
      return 'null';
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return '{}[]'; // Empty array type
      }

      // Check if array contains only primitives or mixed types
      const containsOnlyPrimitives = obj.every(item => item === null || typeof item !== 'object');

      if (containsOnlyPrimitives) {
        // Use ArrayUtil to detect the array type (including tuple detection)
        const maxTupleSize = this.options.arrayMaxTupleSize ?? 10;
        const minTupleSize = this.options.arrayMinTupleSize ?? 2;
        return ConverterUtils.detectTypeFromArray(obj, maxTupleSize, minTupleSize);
      }

      // For arrays with objects, use the first element's type as the representative
      const elementType = this.getType(obj[0], indentLevel);
      return `${elementType}[]`;
    }

    // Handle primitives
    if (typeof obj !== 'object') {
      return typeof obj;
    }

    // --- Handle Objects ---
    // Check for circular references
    if (this.visitedObjects.has(obj)) {
      return 'any'; // Fallback for circular references
    }

    // Mark object as visited to detect cycles
    this.visitedObjects.add(obj);

    let body = '';
    const keys = Object.keys(obj);

    for (const key of keys) {
      const value = obj[key];
      const type = this.getType(value, indentLevel + 1);
      body += `${nextIndent}${ConverterUtils.suggestPropertyName(key)}: ${type};\n`;
    }

    // Remove object from visited set after processing
    this.visitedObjects.delete(obj);

    // Handle empty objects
    if (keys.length === 0) {
      return '{}';
    }

    // Return the embedded object definition
    return `{\n${body.trimEnd()}\n${indent}}`;
  }

  /**
   * Determines the appropriate TypeScript type for a given value.
   * Delegates to generateObjectBody for complex types (objects and arrays).
   *
   * @param value - The value to analyze for type determination.
   * @param indentLevel - Current indentation level for formatting.
   * @returns The TypeScript type string for the given value.
   */
  private getType(value: any, indentLevel: number): string {
    if (value === null || typeof value !== 'object') {
      // Direct handling for primitives and null
      return this.generateObjectBody(value, indentLevel);
    }
    // Delegate to main recursive logic for objects and arrays
    return this.generateObjectBody(value, indentLevel);
  }

  /**
   * Creates an indentation string based on the specified level.
   * Uses two spaces per indentation level for consistent formatting.
   *
   * @param level - The number of indentation levels.
   * @returns A string containing the appropriate number of spaces.
   */
  private getIndent(level: number): string {
    return '  '.repeat(level);
  }
}
