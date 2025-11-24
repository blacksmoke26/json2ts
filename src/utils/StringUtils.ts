/**
  * String utility methods
  * @author Junaid Atari <mj.atari@gmail.com>
  * @copyright 2025 Junaid Atari
  * @see https://github.com/blacksmoke26
  */
import { camelCase, kebabCase, pascalCase, snakeCase } from 'change-case';

// types
import type { CaseType } from '~/typings/global';

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

   /**
    * Formats a string according to the specified case type.
    *
    * @param name - The string to format
    * @param [caseType] - The case type to apply ('camel', 'lower_snake', 'pascal', 'upper_snake', 'kebab', or undefined)
    * @returns The formatted string in the specified case, or the original name if caseType is undefined
    *
    * @example
    * ```typescript
    * StringUtils.formatName('userName', 'camel') // returns 'userName'
    * StringUtils.formatName('userName', 'lower_snake') // returns 'user_name'
    * StringUtils.formatName('userName', 'pascal') // returns 'UserName'
    * StringUtils.formatName('userName', 'upper_snake') // returns 'USER_NAME'
    * StringUtils.formatName('userName', 'kebab') // returns 'user-name'
    * StringUtils.formatName('userName', undefined) // returns 'userName'
    * ```
    */
   public static formatName(name: string, caseType: CaseType | undefined = undefined): string {
     switch (caseType) {
       case 'camel':
         return camelCase(name);
       case 'lower_snake':
         return snakeCase(name);
       case 'pascal':
         return pascalCase(name);
       case 'upper_snake':
         return snakeCase(name).toUpperCase();
       case 'kebab':
         return kebabCase(name);
       default:
         return name;
     }
   }
}
