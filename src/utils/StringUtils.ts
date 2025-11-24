 /**
  * String utility methods
  * @author Junaid Atari <mj.atari@gmail.com>
  * @copyright 2025 Junaid Atari
  * @see https://github.com/blacksmoke26
  */

export default abstract class StringUtils {
  /**
   * Capitalizes the first letter of a string.
   * If the input is null, undefined, or empty, returns an empty string.
   * @param str - The string to capitalize
   * @returns The capitalized string, or empty string if input is falsy
   */
  public static capitalize(str: string): string {
    if (!str) return '';
    return String(str || '') // convert it to string to prevent the unexpected error
      .charAt(0).toUpperCase() + str.slice(1);
  }
}
