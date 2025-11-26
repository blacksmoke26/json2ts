/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import ConverterUtils from '../../src/utils/ConverterUtils';

/**
 * Comprehensive demonstration of toInterfaceName method with various input patterns.
 * This method showcases how the converter handles different types of interface names,
 * including edge cases and complex scenarios.
 */

// Test case groups for better organization
const testGroups = {
  validIdentifiers: [
    { name: 'Valid lowercase', data: 'user', expected: 'User' },
    { name: 'Valid camelCase', data: 'firstName', expected: 'FirstName' },
    { name: 'Valid with underscores', data: 'user_profile', expected: 'UserProfile' },
    { name: 'Valid with numbers', data: 'prop123', expected: 'Prop123' },
    { name: 'Valid with dollar', data: '$variable', expected: '$Variable' },
    { name: 'Valid single letter', data: 'a', expected: 'A' },
    { name: 'Valid with unicode', data: 'café', expected: 'Café' },
    { name: 'Valid with leading underscore', data: '_property', expected: '_Property' },
    { name: 'Valid complex pattern', data: 'test_case_123_value', expected: 'TestCase123Value' },
  ],

  invalidIdentifiers: [
    { name: 'Invalid with space', data: 'first name', expected: 'FirstName' },
    { name: 'Invalid with hyphen', data: 'first-name', expected: 'FirstName' },
    { name: 'Invalid with dot', data: 'user.name', expected: 'UserName' },
    { name: 'Invalid with at symbol', data: 'user@domain', expected: 'UserDomain' },
    { name: 'Invalid numeric start', data: '123', expected: 'UnnamedInterface' },
    { name: 'Invalid uppercase start', data: 'Name', expected: 'Name' },
    { name: 'Empty string', data: '', expected: 'UnnamedInterface' },
    { name: 'Null input', data: null, expected: 'UnnamedInterface' },
    { name: 'Undefined input', data: undefined, expected: 'UnnamedInterface' },
  ],

  edgeCases: [
    { name: 'Multiple spaces', data: 'first  name', expected: 'FirstName' },
    { name: 'Multiple special chars', data: 'test@#$%name', expected: 'TestName' },
    { name: 'Trailing space', data: 'name ', expected: 'Name' },
    { name: 'Leading space', data: ' name', expected: 'Name' },
    { name: 'Only spaces', data: '   ', expected: 'UnnamedInterface' },
    { name: 'Single digit', data: '1', expected: 'UnnamedInterface' },
    { name: 'Mixed case and numbers', data: 'Prop123Name', expected: 'Prop123Name' },
  ],

  unicodeAndSpecial: [
    { name: 'Unicode with space', data: 'café name', expected: 'CaféName' },
    { name: 'Unicode complex', data: 'naïve résumé', expected: 'NaïveRésumé' },
    { name: 'Emojis', data: 'user👤name', expected: 'Username' },
    { name: 'Non-ASCII chars', data: 'пользователь', expected: 'Пользователь' },
    { name: 'Mixed unicode and special', data: 'café-name@test', expected: 'CaféNameTest' },
  ],

  lengthBased: [
    { name: 'Very short valid', data: 'a', expected: 'A' },
    { name: 'Very long valid', data: 'veryLongPropertyNameThatShouldBeValid', expected: 'VeryLongPropertyNameThatShouldBeValid' },
    { name: 'Very long with spaces', data: 'very long property name with spaces', expected: 'VeryLongPropertyNameWithSpaces' },
    { name: 'Boundary length valid', data: 'a'.repeat(50), expected: 'A'.repeat(50) },
    { name: 'Over boundary with invalid', data: 'a'.repeat(51) + ' ', expected: 'A'.repeat(51) },
  ],

  numericPatterns: [
    { name: 'Numbers at end', data: 'prop123', expected: 'Prop123' },
    { name: 'Numbers in middle', data: 'prop123test', expected: 'Prop123test' },
    { name: 'Multiple numbers', data: 'test123case456value', expected: 'Test123case456value' },
    { name: 'Numbers with underscores', data: 'prop_123_test', expected: 'Prop123Test' },
    { name: 'Leading numbers invalid', data: '123test', expected: 'UnnamedInterface' },
  ],

  underscoreVariations: [
    { name: 'Single underscore', data: 'test_case', expected: 'TestCase' },
    { name: 'Multiple underscores', data: 'a_b_c_d_e', expected: 'ABCDE' },
    { name: 'Leading underscore', data: '_property', expected: '_Property' },
    { name: 'Trailing underscore', data: 'property_', expected: 'Property' },
    { name: 'Consecutive underscores', data: 'prop__name', expected: 'PropName' },
    { name: 'Underscore with numbers', data: 'test_1_2_3', expected: 'Test123' },
  ],

  complexMixed: [
    { name: 'All special chars', data: 'test@#$%^&*()name', expected: 'TestName' },
    { name: 'Mixed separators', data: 'first.name-last_test', expected: 'FirstNameLastNameTest' },
    { name: 'Camel with invalid', data: 'firstName-lastName', expected: 'FirstNameLastName' },
    { name: 'Pascal with space', data: 'FirstName LastName', expected: 'FirstNameLastName' },
    { name: 'Snake with numbers', data: 'test_case_123', expected: 'TestCase123' },
  ],
};

// Process each test group
Object.entries(testGroups).forEach(([groupName, tests]) => {
  console.log(`\n=== ${groupName.toUpperCase()} TESTS ===`);

  tests.forEach((test: any, index: number) => {
    const detected = ConverterUtils.toInterfaceName(test.data, 'UnnamedInterface');
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
  { name: 'Array input', data: ['array'] },
  { name: 'Object input', data: { key: 'value' } },
  { name: 'Number input', data: 123 },
  { name: 'Boolean input', data: true },
  { name: 'Function input', data: () => {} },
  { name: 'Date input', data: new Date() },
  { name: 'RegExp input', data: /test/ },
  { name: 'Symbol input', data: Symbol('test') },
  { name: 'BigInt input', data: BigInt(123) },
];

edgeCases.forEach((test, index) => {
  try {
    // @ts-ignore
    const detected = ConverterUtils.toInterfaceName(test.data);
    console.log(`${index + 1}. ${test.name}: ${detected}`);
  } catch (error) {
    console.log(`${index + 1}. ${test.name}: Error - ${error}`);
  }
});

// Performance and stress tests
console.log('\n=== PERFORMANCE TESTS ===');

const performanceTests = [
  { name: 'Large valid name', data: 'a'.repeat(1000) },
  { name: 'Large name with spaces', data: 'a '.repeat(500) },
  { name: 'Large name with special chars', data: '@#$%^'.repeat(250) },
  { name: 'Deeply nested pattern', data: 'a_b_c_d_e_f_g_h_i_j_k_l_m_n_o_p_q_r_s_t_u_v_w_x_y_z' },
];

performanceTests.forEach((test, index) => {
  const start = performance.now();
  try {
    const detected = ConverterUtils.toInterfaceName(test.data);
    const end = performance.now();
    console.log(`${index + 1}. ${test.name}: ${detected} (${(end - start).toFixed(2)}ms)`);
  } catch (error) {
    console.log(`${index + 1}. ${test.name}: Error - ${error}`);
  }
});

console.log('\nDemonstration completed!');
