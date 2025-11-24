/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import ConverterUtils from '../src/utils/ConverterUtils';



/**
 * Comprehensive demonstration of detectTypeFromArray method with various array patterns.
 * This method showcases how the converter handles different types of arrays and values,
 * including edge cases and complex scenarios.
 */

  // Test case groups for better organization
const testGroups = {
    simple: [
      { name: 'Numbers', data: [1, 2, 3], expected: 'number[]' },
      { name: 'Strings', data: ['a', 'b', 'c'], expected: 'string[]' },
      { name: 'Booleans', data: [true, false, true], expected: 'boolean[]' },
      { name: 'Mixed numbers', data: [1, 2.5, -3], expected: 'number[]' },
    ],

    mixedPrimitives: [
      { name: 'Number-String', data: [1, 'two', 3], expected: '[number, string, number]' },
      { name: 'String-Boolean', data: ['a', true], expected: '[string, boolean]' },
      { name: 'Three types', data: ['a', 2, true], expected: '[string, number, boolean]' },
      { name: 'All primitives', data: [1, 'str', true, Symbol()], expected: '[number, string, boolean, symbol]' },
    ],

    specialValues: [
      { name: 'With null', data: [1, null, 3], expected: '[number, null, number]' },
      { name: 'With undefined', data: ['a', undefined, 'c'], expected: '[string, undefined, string]' },
      { name: 'Both null and undefined', data: [null, undefined], expected: '[null, undefined]' },
      { name: 'Null array', data: [null, null, null], expected: '[null, null, null]' },
      { name: 'Undefined array', data: [undefined, undefined], expected: '[undefined, undefined]' },
    ],

    nestedStructures: [
      { name: 'Objects', data: [{ id: 1 }, { id: 2 }], expected: 'object[]' },
      { name: 'Nested arrays', data: [[1, 2], [3, 4]], expected: 'any[]' },
      { name: 'Mixed nested', data: [{}, []], expected: '[object, array]' },
      { name: 'Complex nested', data: [{ arr: [1, 2] }, { obj: { a: 1 } }], expected: 'object[]' },
    ],

    sizeEdgeCases: [
      { name: 'Large number array', data: Array.from({ length: 15 }, (_, i) => i), expected: 'number[]' },
      { name: 'Large string array', data: Array.from({ length: 20 }, (_, i) => `item${i}`), expected: 'string[]' },
      { name: 'Very large mixed', data: Array.from({ length: 25 }, (_, i) => i % 2 === 0 ? i : `str${i}`), expected: 'any[]' },
      { name: 'Single number', data: [42], expected: 'number[]' },
      { name: 'Single string', data: ['single'], expected: 'string[]' },
      { name: 'Single object', data: [{ a: 1 }], expected: 'object[]' },
      { name: 'Empty array', data: [], expected: 'any[]' },
    ],

    complexMixed: [
      { name: 'Mixed with object', data: [1, 'two', null, { key: 'value' }], expected: '[number, string, null, object]' },
      { name: 'Nested with undefined', data: [[1, 2], { nested: true }, undefined], expected: '[any[], object, undefined]' },
      {
        name: 'All types',
        data: [1, 'str', true, null, undefined, { a: 1 }, [1, 2], Symbol(), BigInt(1)],
        expected: '[number, string, boolean, null, undefined, object, array, symbol, bigint]',
      },
      { name: 'Symbol array', data: [Symbol('a'), Symbol('b')], expected: 'symbol[]' },
      { name: 'BigInt array', data: [BigInt(1), BigInt(2)], expected: 'bigint[]' },
      {
        name: 'Function array', data: [() => {
        }, function() {
        }], expected: 'function[]',
      },
    ],

    tupleSize: [
      { name: 'Min size boundary', data: [1, 2], expected: 'number[]' },
      { name: 'Max size boundary', data: Array.from({ length: 10 }, (_, i) => i), expected: 'number[]' },
      { name: 'Just over max', data: Array.from({ length: 11 }, (_, i) => i), expected: 'number[]' },
      { name: 'Under min', data: [1], expected: 'number[]' },
      { name: 'At min mixed', data: [1, 'str'], expected: '[number, string]' },
    ],
  };

// Process each test group
Object.entries(testGroups).forEach(([groupName, tests]) => {
  console.log(`\n=== ${groupName.toUpperCase()} TESTS ===`);

  tests.forEach((test: any, index: number) => {
    const detected = ConverterUtils.detectTypeFromArray(test.data);
    const status = detected === test.expected ? '✓' : '✗';
    const dataStr = test.data.length > 5
      ? `[${test.data.slice(0, 3).map((v: any) =>
          typeof v === 'symbol' ? 'Symbol()' :
          typeof v === 'bigint' ? `${v}n` :
          typeof v === 'function' ? 'function()' :
          typeof v === 'object' && v !== null ? 'object' :
          String(v)
        ).join(', ')}...${test.data.slice(-2).map((v: any) =>
          typeof v === 'symbol' ? 'Symbol()' :
          typeof v === 'bigint' ? `${v}n` :
          typeof v === 'function' ? 'function()' :
          typeof v === 'object' && v !== null ? 'object' :
          String(v)
        ).join(', ')}]`
      : `[${test.data.map((v: any) =>
          typeof v === 'symbol' ? 'Symbol()' :
          typeof v === 'bigint' ? `${v}n` :
          typeof v === 'function' ? 'function()' :
          typeof v === 'object' && v !== null ? 'object' :
          String(v)
        ).join(', ')}]`;

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
  { name: 'Array with Date objects', data: [new Date(), new Date()] },
  { name: 'Array with RegExp', data: [/test/, /pattern/] },
  {
    name: 'Array with mixed functions', data: [() => {
    }, function named() {
    }],
  },
  {
    name: 'Array with cyclic objects', data: (() => {
      const obj = { a: 1 };
      return [obj];
    })(),
  },
  {
    name: 'Array with getters/setters', data: [Object.defineProperty({}, 'value', {
      get: () => 1, set: () => {
      },
    })],
  },
];

edgeCases.forEach((test, index) => {
  try {
    const detected = ConverterUtils.detectTypeFromArray(test.data);
    console.log(`${index + 1}. ${test.name}: ${detected}`);
  } catch (error) {
    console.log(`${index + 1}. ${test.name}: Error - ${error}`);
  }
});

console.log('\nDemonstration completed!');
