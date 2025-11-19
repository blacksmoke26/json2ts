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
   * @param interfaceName The name for the generated interface (e.g., 'User', 'ApiResponse').
   *                     Defaults to 'RootObject' if not specified.
   * @returns A formatted string containing the complete TypeScript interface definition.
   *          The interface will include all nested objects flattened into the main definition.
   * @throws {Error} If the input is not a valid JSON object (null, primitive, or undefined).
   */
  public static convert(jsonData: string | unknown, interfaceName?: string): string | null {
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
  protected constructor() {
  }

  /**
    * The main internal method that orchestrates the conversion process.
    *
    * This method validates the input, initializes the conversion state, triggers the
    * interface generation, and assembles the final output in the correct order.
    *
    * @param jsonData - The JSON object to convert. Must be a valid object, not null or primitive.
    * @param rootInterfaceName - The name to use for the root interface (e.g., 'User', 'ApiResponse').
    * @returns A formatted string containing all generated TypeScript interfaces.
    * @throws {Error} If the input is not a valid JSON object.
    */
  protected abstract convertJson(jsonData: unknown, rootInterfaceName: string): string;
}
