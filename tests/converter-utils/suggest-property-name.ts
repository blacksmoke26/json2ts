/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import ConverterUtils from '../../src/utils/ConverterUtils';

/**
 * Test cases for suggestPropertyName function
 * These tests cover various edge cases and scenarios for property name validation
 */
const propertyNameTests = [
  { name: 'Valid lowercase identifier', data: 'name', expected: 'name' },
  { name: 'Valid camelCase', data: 'firstName', expected: 'firstName' },
  { name: 'Valid with underscore', data: '_private', expected: '_private' },
  { name: 'Valid with dollar sign', data: '$variable', expected: '$variable' },
  { name: 'Invalid with space', data: 'first name', expected: '"first name"' },
  { name: 'Invalid with space 2', data: 'user id', expected: '"user id"' },
  { name: 'Invalid not starting with lowercase', data: 'Name', expected: '"Name"' },
  { name: 'Invalid not starting with lowercase 2', data: 'ID', expected: '"ID"' },
  { name: 'Invalid not starting with lowercase 3', data: 'Property123', expected: '"Property123"' },
  { name: 'Invalid with hyphen', data: 'first-name', expected: '"first-name"' },
  { name: 'Invalid with dot', data: 'user.name', expected: '"user.name"' },
  { name: 'Invalid with at symbol', data: 'user@domain', expected: '"user@domain"' },
  { name: 'Invalid numeric start', data: '123', expected: '"123"' },
  { name: 'Invalid numeric start 2', data: '1property', expected: '"1property"' },
  { name: 'Empty string', data: '', expected: '""' },
  { name: 'Null input', data: null, expected: 'unnamedProperty' },
  { name: 'Undefined input', data: undefined, expected: 'unnamedProperty' },
  { name: 'Complex valid identifier', data: 'camelCaseProperty', expected: 'camelCaseProperty' },
  { name: 'Snake case valid', data: 'snake_case_property', expected: 'snake_case_property' },
  { name: 'PascalCase invalid', data: 'PascalCaseProperty', expected: '"PascalCaseProperty"' },
  { name: 'Mixed case invalid', data: 'mixed_Case_Property123', expected: '"mixed_Case_Property123"' },
  { name: 'Valid with numbers at end', data: 'prop123', expected: 'prop123' },
  { name: 'Valid with underscore and numbers', data: 'prop_123_test', expected: 'prop_123_test' },
  { name: 'Valid with multiple underscores', data: 'a_b_c_d_e', expected: 'a_b_c_d_e' },
  { name: 'Valid with dollar and underscore', data: '$var_test', expected: '$var_test' },
  { name: 'Invalid with space and special char', data: 'prop-name', expected: '"prop-name"' },
  { name: 'Invalid with multiple spaces', data: 'first  name', expected: '"first  name"' },
  { name: 'Valid single letter', data: 'a', expected: 'a' },
  { name: 'Invalid single uppercase', data: 'A', expected: '"A"' },
  { name: 'Valid with unicode letters', data: 'café', expected: 'café' },
  { name: 'Invalid with unicode and space', data: 'café name', expected: '"café name"' },
  { name: 'Valid with underscore and hyphen', data: 'prop_name-test', expected: '"prop_name-test"' },
  { name: 'Invalid with trailing space', data: 'name ', expected: '"name "' },
  { name: 'Invalid with leading space', data: ' name', expected: '" name"' },
  { name: 'Valid with long name', data: 'veryLongPropertyNameThatShouldBeValid', expected: 'veryLongPropertyNameThatShouldBeValid' },
  { name: 'Invalid long name with space', data: 'veryLongPropertyName ThatShouldBeInvalid', expected: '"veryLongPropertyName ThatShouldBeInvalid"' },
  { name: 'Valid with only underscores', data: '___', expected: '___' },
  { name: 'Invalid with only spaces', data: '   ', expected: '"   "' },
  { name: 'Valid with mixed case and numbers', data: 'Prop123Name', expected: '"Prop123Name"' },
  { name: 'Valid with numbers at start and end', data: '123test456', expected: '"123test456"' },
  { name: 'Valid with symbol in middle', data: 'prop@name', expected: '"prop@name"' },
  { name: 'Valid with multiple dots', data: 'a.b.c', expected: '"a.b.c"' },
  { name: 'Valid with dollar and numbers', data: '$123abc', expected: '$123abc' },
  { name: 'Valid with multiple underscores and numbers', data: 'test_1_2_3_test', expected: 'test_1_2_3_test' },
  { name: 'Invalid with multiple consecutive spaces', data: 'first   name', expected: '"first   name"' },
  { name: 'Valid with leading underscore and letters', data: '_property', expected: '_property' },
  { name: 'Valid with leading dollar and letters', data: '$property', expected: '$property' },
  { name: 'Valid with only digits', data: '123456', expected: '"123456"' },
  { name: 'Valid with mixed case and digits', data: 'Property123Test', expected: '"Property123Test"' },
  { name: 'Valid with complex underscore pattern', data: 'a_b_c_d_e_f_g', expected: 'a_b_c_d_e_f_g' },
  { name: 'Invalid with leading uppercase and numbers', data: 'Test123', expected: '"Test123"' },
  { name: 'Valid with complex unicode', data: 'naïve', expected: '"naïve"' },
  { name: 'Valid with complex underscore pattern 2', data: 'test_case_123_value', expected: 'test_case_123_value' },
  { name: 'Invalid with multiple special chars', data: 'test@#$%name', expected: '"test@#$%name"' },
  { name: 'Valid with valid special chars underscore', data: 'property_name', expected: 'property_name' },
  { name: 'Valid with valid special chars dollar', data: '$property', expected: '$property' },
  { name: 'Valid with valid special chars underscore and numbers', data: 'prop_123_test_456', expected: 'prop_123_test_456' },
  { name: 'Invalid with invalid leading uppercase', data: 'TestProperty', expected: '"TestProperty"' },
  { name: 'Valid with single valid char', data: 'a', expected: 'a' },
  { name: 'Valid with single digit', data: '1', expected: '"1"' },
  { name: 'Valid with special chars in middle', data: 'property-name-test', expected: '"property-name-test"' },
  { name: 'Valid with underscore and special char', data: 'prop_name-test', expected: '"prop_name-test"' },
  { name: 'Valid lowercase starts with numbers', data: '401k', expected: '"401k"' },
];

// Process tests
console.log('\n=== SUGGEST PROPERTY NAME TESTS ===');

propertyNameTests.forEach((test: any, index: number) => {
  const detected = ConverterUtils.suggestPropertyName(test.data);
  const status = detected === test.expected ? '✓' : '✗';
  const dataStr = typeof test.data === 'string' ? `"${test.data}"` : String(test.data);

  console.log(`${index + 1}. ${test.name}`);
  console.log(`   Data: ${dataStr}`);
  console.log(`   Expected: ${test.expected}`);
  console.log(`   Detected: ${detected} ${status}`);

  if (detected !== test.expected) {
    console.log(`   ⚠️ Mismatch detected!`);
  }
});
