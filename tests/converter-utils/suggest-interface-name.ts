/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import ConverterUtils from '../../src/utils/ConverterUtils';

/**
 * Comprehensive demonstration of suggestInterfaceName method with various input patterns.
 * This method showcases how the converter handles different types of interface names,
 * including edge cases and complex scenarios.
 */

// Test case groups for better organization
const testGroups = {
  basicValid: [
    { name: 'Valid lowercase identifier', data: 'user', expected: 'User' },
    { name: 'Valid camelCase', data: 'firstName', expected: 'FirstName' },
    { name: 'Valid with underscore', data: 'user_profile', expected: 'UserProfile' },
    { name: 'Valid with dollar sign', data: '$variable', expected: '$Variable' },
    { name: 'Valid with numbers at end', data: 'prop123', expected: 'Prop123' },
    { name: 'Valid with multiple underscores', data: 'a_b_c_d_e', expected: 'ABCDE' },
    { name: 'Valid single letter', data: 'a', expected: 'A' },
    { name: 'Valid with unicode letters', data: 'café', expected: 'Café' },
    { name: 'Valid with leading underscore', data: '_property', expected: '_Property' },
    { name: 'Valid with leading dollar', data: '$property', expected: '$Property' },
    { name: 'Valid with complex underscore pattern', data: 'test_case_123_value', expected: 'TestCase123Value' },
    { name: 'Valid with mixed case and numbers', data: 'Prop123Name', expected: 'Prop123Name' },
    { name: 'Valid with valid special chars underscore', data: 'property_name', expected: 'PropertyName' },
    { name: 'Valid with valid special chars dollar', data: '$property', expected: '$Property' },
    { name: 'Valid with multiple underscores and numbers', data: 'test_1_2_3_test', expected: 'Test123Test' },
    { name: 'Valid with leading underscore and letters', data: '_property', expected: '_Property' },
    { name: 'Valid with leading dollar and letters', data: '$property', expected: '$Property' },
    { name: 'Valid with only underscores', data: '___', expected: '__' },
    { name: 'Valid with complex unicode', data: 'naïve', expected: 'Naïve' },
    { name: 'Valid with valid special chars underscore and numbers', data: 'prop_123_test_456', expected: 'Prop123Test456' },
    { name: 'Valid with complex underscore pattern 2', data: 'test_case_123_value', expected: 'TestCase123Value' },
    { name: 'Valid with single valid char', data: 'a', expected: 'A' },
  ],

  invalidConverted: [
    { name: 'Invalid with space', data: 'first name', expected: 'FirstName' },
    { name: 'Invalid with space 2', data: 'user id', expected: 'UserId' },
    { name: 'Invalid not starting with lowercase', data: 'Name', expected: 'Name' },
    { name: 'Invalid not starting with lowercase 2', data: 'ID', expected: 'ID' },
    { name: 'Invalid not starting with lowercase 3', data: 'Property123', expected: 'Property123' },
    { name: 'Invalid with hyphen', data: 'first-name', expected: 'FirstName' },
    { name: 'Invalid with dot', data: 'user.name', expected: 'UserName' },
    { name: 'Invalid with at symbol', data: 'user@domain', expected: 'UserDomain' },
    { name: 'Invalid numeric start', data: '123', expected: 'UnnamedInterface' },
    { name: 'Invalid numeric start 2', data: '1property', expected: 'UnnamedInterface' },
    { name: 'Empty string', data: '', expected: 'UnnamedInterface' },
    { name: 'Null input', data: null, expected: 'UnnamedInterface' },
    { name: 'Undefined input', data: undefined, expected: 'UnnamedInterface' },
    { name: 'Invalid with underscore and hyphen', data: 'prop_name-test', expected: 'PropNameTest' },
    { name: 'Invalid with trailing space', data: 'name ', expected: 'Name' },
    { name: 'Invalid with leading space', data: ' name', expected: 'Name' },
    { name: 'Invalid with multiple spaces', data: 'first  name', expected: 'FirstName' },
    { name: 'Invalid with multiple consecutive spaces', data: 'first   name', expected: 'FirstName' },
    { name: 'Invalid with invalid leading uppercase', data: 'TestProperty', expected: 'TestProperty' },
    { name: 'Invalid with leading uppercase and numbers', data: 'Test123', expected: 'Test123' },
    { name: 'Invalid with single uppercase', data: 'A', expected: 'A' },
    { name: 'Invalid with only spaces', data: '   ', expected: 'UnnamedInterface' },
    { name: 'Invalid with single digit', data: '1', expected: 'UnnamedInterface' },
    { name: 'Invalid with valid special chars in middle', data: 'property-name-test', expected: 'PropertyNameTest' },
    { name: 'Invalid with special chars in middle', data: 'prop@name', expected: 'PropName' },
    { name: 'Invalid with multiple special chars', data: 'test@#$%name', expected: 'TestName' },
    { name: 'Invalid with multiple dots', data: 'a.b.c', expected: 'ABC' },
    { name: 'Invalid with valid special chars underscore and numbers', data: 'prop_123_test_456', expected: 'Prop123Test456' },
    { name: 'Invalid with only digits', data: '123456', expected: 'UnnamedInterface' },
    { name: 'Invalid with complex case and digits', data: 'Property123Test', expected: 'Property123Test' },
    { name: 'Invalid with lowercase start but invalid chars', data: 'test-property', expected: 'TestProperty' },
    { name: 'Invalid with complex case and special chars', data: 'Test.Property', expected: 'TestProperty' },
    { name: 'Invalid with mixed case and numbers', data: 'Prop123Name', expected: 'Prop123Name' },
    { name: 'Invalid with lowercase start and invalid chars', data: 'prop-name-test', expected: 'PropNameTest' },
    { name: 'Invalid with valid special chars underscore and numbers', data: 'prop_123_test_456', expected: 'Prop123Test456' },
    { name: 'Invalid with complex underscore pattern', data: 'a_b_c_d_e_f_g', expected: 'ABCDEFG' },
    { name: 'Invalid with trailing underscore', data: 'property_', expected: 'Property' },
    { name: 'Invalid with leading underscore and trailing underscore', data: '_property_', expected: 'Property' },
    { name: 'Invalid with multiple underscores and special chars', data: '_prop__name__', expected: 'PropName' },
    { name: 'Invalid with consecutive special chars', data: 'prop--name', expected: 'PropName' },
    { name: 'Invalid with multiple underscores and spaces', data: 'prop_ _name', expected: 'PropName' },
    { name: 'Invalid with mixed special chars', data: 'prop@#$%name', expected: 'PropName' },
    { name: 'Invalid with space and hyphen', data: 'first - name', expected: 'FirstName' },
    { name: 'Invalid with space and dot', data: 'first . name', expected: 'FirstName' },
    { name: 'Invalid with space and @', data: 'first @ name', expected: 'FirstName' },
    { name: 'Invalid with multiple special chars and spaces', data: 'first @#$. name', expected: 'FirstName' },
    { name: 'Invalid with underscore and special chars', data: 'prop_name@test', expected: 'PropNameTest' },
    { name: 'Invalid with underscore and space', data: 'prop_name test', expected: 'PropNameTest' },
    { name: 'Invalid with underscore and multiple spaces', data: 'prop_name  test', expected: 'PropNameTest' },
    { name: 'Invalid with underscore and trailing space', data: 'prop_name ', expected: 'PropName' },
    { name: 'Invalid with underscore and leading space', data: ' prop_name', expected: 'PropName' },
    { name: 'Invalid with underscore and mixed spaces', data: ' prop_name test ', expected: 'PropNameTest' },
    { name: 'Invalid with underscore and special chars in middle', data: 'prop_name-test', expected: 'PropNameTest' },
    { name: 'Invalid with underscore and multiple special chars', data: 'prop_@#$%_name', expected: 'PropName' },
    { name: 'Invalid with underscore and numbers', data: 'prop_123_test', expected: 'Prop123Test' },
    { name: 'Invalid with underscore and digits at end', data: 'prop_123', expected: 'Prop123' },
    { name: 'Invalid with underscore and numbers at start', data: '123_prop', expected: 'UnnamedInterface' },
    { name: 'Invalid with underscore and numbers at start and end', data: '123_prop_456', expected: 'UnnamedInterface' },
    { name: 'Invalid with underscore and numbers in middle', data: 'prop_123_test', expected: 'Prop123Test' },
    { name: 'Invalid with underscore and numbers at start and end', data: '123_prop_456', expected: 'UnnamedInterface' },
  ],

  advanced: [
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
  ],
};

// Process each test group
Object.entries(testGroups).forEach(([groupName, tests]) => {
  console.log(`\n=== ${groupName.toUpperCase()} TESTS ===`);

  tests.forEach((test: any, index: number) => {
    const detected = ConverterUtils.suggestInterfaceName(test.data);
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
});

// Additional edge case demonstrations
console.log('\n=== ADDITIONAL EDGE CASES ===');

const edgeCases = [
  { name: 'Array with Date objects', data: new Date() },
  { name: 'Array with RegExp', data: /test/ },
  { name: 'Array with mixed functions', data: () => {} },
  { name: 'Array with cyclic objects', data: (() => { const obj = { a: 1 }; return obj; })() },
  { name: 'Array with getters/setters', data: Object.defineProperty({}, 'value', { get: () => 1, set: () => {} }) },
];

edgeCases.forEach((test, index) => {
  try {
    const detected = ConverterUtils.suggestInterfaceName(test.data);
    console.log(`${index + 1}. ${test.name}: ${detected}`);
  } catch (error) {
    console.log(`${index + 1}. ${test.name}: Error - ${error}`);
  }
});

console.log('\nDemonstration completed!');
