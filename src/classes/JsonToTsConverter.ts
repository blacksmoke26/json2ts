/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import ConverterBase, { ConvertOptions, ExportType } from '~/base/ConverterBase';
import ConverterUtils from '~/utils/ConverterUtils';

/**
 * Converts JSON data into TypeScript interface definitions with advanced type inference.
 *
 * This class provides comprehensive functionality to analyze JSON objects and generate
 * corresponding TypeScript interface definitions with intelligent type detection.
 * It supports nested objects, arrays, primitive types, and handles circular references
 * to prevent infinite recursion.
 *
 * Key Features:
 * - Intelligent interface naming based on object keys and structure
 * - Full support for nested objects and arrays
 * - Circular reference detection to prevent infinite loops
 * - Flexible export modes (root, all, none) for different use cases
 * - Automatic type inference for JSON primitives
 * - Advanced array type detection with tuple types for mixed arrays
 * - Configurable array tuple size limits for optimal type representation
 *
 * @example
 * ```typescript
 * const json = {
 *   name: "John",
 *   age: 30,
 *   isActive: true,
 *   address: {
 *     street: "123 Main St",
 *     city: "New York",
 *     coordinates: [40.7128, -74.0060]
 *   },
 *   tags: ["user", "active", 2025]
 * };
 * const tsInterface = JsonToTsConverter.convert(json, "User", "root", {
 *   arrayMaxTupleSize: 5,
 *   arrayMinTupleSize: 2
 * });
 * console.log(tsInterface);
 * ```
 */
export default class JsonToTsConverter extends ConverterBase {
  /**
   * Cache storing generated TypeScript interface definitions.
   *
   * Maps interface names to their complete definition strings. This prevents duplicate
   * interface generation and maintains proper dependency ordering when assembling
   * the final output.
   */
  private interfaces: Map<string, string> = new Map();

  /**
   * Tracks visited objects to detect circular references.
   *
   * Uses WeakSet to avoid memory leaks while preventing infinite recursion
   * when objects reference themselves or create circular dependencies.
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
   * Converts JSON data into TypeScript interface strings.
   *
   * Static entry point that parses input JSON and generates corresponding
   * TypeScript interfaces. Supports both object and string inputs.
   *
   * @param jsonData - JSON object or string to convert
   * @param interfaceName - Name for the root interface (default: 'RootObject')
   * @param exportType - Export mode: 'root', 'all', or 'none' (default: 'root')
   * @param options - Configuration options for the conversion process
   * @returns Generated TypeScript interface string or null if parsing fails
   *
   * @example
   * ```typescript
   * const result = JsonToTsConverter.convert(
   *   '{"name": "John", "age": 30}',
   *   'Person',
   *   'all',
   *   { arrayMaxTupleSize: 5, arrayMinTupleSize: 2 }
   * );
   * ```
   */
  public static convert(jsonData: unknown | string, interfaceName: string = 'RootObject', exportType: ExportType = 'root', options: ConvertOptions = {}): string | null {
    const parsed = this.parseJson(jsonData);

    if (!parsed) return null;

    return (exportType === 'root' ? 'export ' : '')
      + new JsonToTsConverter(options).convertJson(parsed, interfaceName, exportType);
  }

  /**
   * Core conversion method that processes parsed JSON data.
   *
   * Handles the main conversion logic, including initialization,
   * interface generation, and final assembly of the output string.
   *
   * @param jsonData - Parsed JSON object to convert
   * @param rootInterfaceName - Name for the root interface
   * @param exportType - Export mode configuration
   * @returns Complete TypeScript interface definitions
   */
  protected convertJson(jsonData: unknown, rootInterfaceName: string, exportType: ExportType = 'root'): string {
    if (typeof jsonData !== 'object' || jsonData === null) {
      return `${exportType !== 'none' ? 'export ' : ''}interface ${rootInterfaceName} {\n  [p: string]: unknown;\n}`;
    }

    this.interfaces.clear();
    this.visitedObjects = new WeakSet<object>();

    this.generateInterface(jsonData, rootInterfaceName, exportType === 'all');

    // Reverse the order to ensure dependencies are declared before dependents
    const orderedInterfaces = Array.from(this.interfaces.entries()).reverse();

    return orderedInterfaces.map(([, content]) => content).join('\n\n');
  }

  /**
   * Recursively generates interface definition for an object.
   *
   * Analyzes object structure and creates TypeScript interface matching its properties.
   * Handles nested objects recursively and tracks visited objects to prevent
   * infinite recursion with circular references.
   *
   * @param obj - Object to convert to interface
   * @param interfaceName - Name for the generated interface
   * @param appendExport - Whether to include export keyword
   */
  private generateInterface(obj: any, interfaceName: string, appendExport: boolean): void {
    // Prevent infinite recursion from circular references
    if (typeof obj === 'object' && obj !== null) {
      if (this.visitedObjects.has(obj)) {
        return;
      }
      this.visitedObjects.add(obj);
    }

    if (this.interfaces.has(interfaceName)) return; // Interface already generated


    let interfaceBody = '';
    const keys = Object.keys(obj);

    for (const key of keys) {
      const value = obj[key];
      const type = this.getType(value, this.capitalize(key), appendExport);
      interfaceBody += `  ${key}: ${type};\n`;
    }

    const fullInterface = `${appendExport ? 'export ' : ''}interface ${interfaceName} {\n${interfaceBody.trimEnd()}\n}`;
    this.interfaces.set(interfaceName, fullInterface);
  }

  /**
   * Determines TypeScript type string for a given value.
   *
   * Analyzes value and returns appropriate TypeScript type. Handles all JSON
   * primitives, arrays, and objects. For objects, triggers new interface generation
   * and returns the interface name. For arrays, uses ArrayUtil to detect appropriate
   * type including tuple types for mixed arrays.
   *
   * @param value - Value to analyze
   * @param parentKey - Property key used for naming child interfaces
   * @param appendExport - Whether child interfaces should be exported
   * @returns TypeScript type string representation
   */
  private getType(value: any, parentKey: string, appendExport: boolean): string {
    if (value === null) return 'null';

    if (Array.isArray(value)) {
      // Use ArrayUtil to detect the appropriate array type
      const arrayType = ConverterUtils.detectTypeFromArray(
        value,
        this.options.arrayMaxTupleSize ?? 10,
        this.options.arrayMinTupleSize ?? 2
      );

      // If the array contains objects, we need to generate interfaces for them
      const hasObjects = value.some(v => typeof v === 'object' && v !== null && !Array.isArray(v));
      if (hasObjects) {
        const firstObject = value.find(v => typeof v === 'object' && v !== null && !Array.isArray(v));
        const interfaceName = this.capitalize(parentKey);
        this.generateInterface(firstObject, interfaceName, appendExport);
        return `${interfaceName}[]`;
      }

      return arrayType;
    }

    if (typeof value === 'object') {
      const interfaceName = this.capitalize(parentKey);
      this.generateInterface(value, interfaceName, appendExport);
      return interfaceName;
    }

    return typeof value; // 'string', 'number', 'boolean'
  }

  /**
   * Sanitizes and capitalizes string for interface naming.
   *
   * Converts JSON keys into valid TypeScript interface names by removing
   * invalid characters and capitalizing the first letter.
   *
   * @param str - String to process
   * @returns Sanitized string suitable for interface names
   */
  private capitalize(str: string): string {
    if (!str) return '';
    // Remove invalid characters and capitalize first letter
    const sanitizedKey = str.replace(/[^a-zA-Z0-9_$]/g, '');
    return sanitizedKey.charAt(0).toUpperCase() + sanitizedKey.slice(1);
  }
}
