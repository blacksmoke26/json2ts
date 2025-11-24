/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 *
 * @fileoverview This script demonstrates comprehensive examples of JsonToTsConverter
 * covering all supported scenarios including nested objects, arrays, primitives,
 * circular references, and various export modes with all parameter combinations.
 */

// classes
import { JsonToTsConverter } from '../src/index';

/**
 * Main function to demonstrate all JsonToTsConverter scenarios.
 * Tests various JSON structures and edge cases to showcase the converter's capabilities.
 */
async function run(): Promise<void> {
  console.log('=== Example 1: Basic User Profile (Default Parameters) ===');
  const userJson = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    isActive: true,
    tags: ["user", "premium"],
    metadata: null
  };
  console.log(JsonToTsConverter.convert(userJson)); // Using all defaults

  console.log('\n=== Example 2: Custom Interface Name and Export Type ===');
  console.log(JsonToTsConverter.convert(userJson, 'CustomUser', 'all'));

  console.log('\n=== Example 3: No Export Mode ===');
  console.log(JsonToTsConverter.convert(userJson, 'InternalUser', 'none'));

  console.log('\n=== Example 4: String Input JSON ===');
  const jsonString = JSON.stringify(userJson);
  console.log(JsonToTsConverter.convert(jsonString, 'StringUser', 'root'));

  console.log('\n=== Example 5: Complex Nested Structure (All Exports) ===');
  const complexJson = {
    user: {
      id: 1,
      profile: {
        firstName: "John",
        lastName: "Doe",
        address: {
          street: "123 Main St",
          city: "New York",
          coordinates: [40.7128, -74.0060],
          metadata: {
            verified: true,
            timestamp: "2023-01-01",
            flags: [true, false, null]
          }
        }
      },
      contacts: [
        { type: "email", value: "john@example.com", primary: true },
        { type: "phone", value: "+1234567890", primary: false },
        { type: "address", value: "Home", primary: null }
      ],
      preferences: {
        theme: "dark",
        language: "en",
        notifications: {
          email: true,
          messaging: false,
          push: true,
          frequency: ["daily", "weekly", "monthly"]
        }
      }
    },
    settings: {
      theme: "dark",
      notifications: {
        email: true,
        messaging: false,
        push: true
      },
      features: {
        beta: true,
        alpha: false,
        experimental: null
      }
    }
  };
  console.log(JsonToTsConverter.convert(complexJson, 'ComplexUser', 'all', {
    arrayMaxTupleSize: 5,
    arrayMinTupleSize: 2
  }));

  console.log('\n=== Example 6: Arrays with Mixed Types (Custom Tuple Settings) ===');
  const mixedArrayJson = {
    mixedData: ["string", 42, true, null, { nested: "object" }, [1, 2, 3]],
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    strings: ["a", "b", "c", "d", "e"],
    objects: [{ id: 1, name: "first" }, { id: 2, name: "second" }, { id: 3, name: "third" }],
    tuples: ["first", 2, true, null, undefined],
    nestedArrays: [[1, 2], ["a", "b"], [true, false]],
    mixedNested: [1, [2, 3], { key: "value" }, null]
  };
  console.log(JsonToTsConverter.convert(mixedArrayJson, 'MixedArrays', 'root', {
    arrayMaxTupleSize: 3,
    arrayMinTupleSize: 1
  }));

  console.log('\n=== Example 7: Primitive Values (All Export Types) ===');
  const primitiveJson = {
    stringValue: "hello",
    numberValue: 42,
    booleanValue: true,
    nullValue: null,
    emptyString: "",
    zero: 0,
    falseValue: false,
    negativeNumber: -100,
    floatNumber: 3.14159
  };
  console.log('Root export:');
  console.log(JsonToTsConverter.convert(primitiveJson, 'PrimitivesRoot', 'root'));
  console.log('\nAll export:');
  console.log(JsonToTsConverter.convert(primitiveJson, 'PrimitivesAll', 'all'));
  console.log('\nNo export:');
  console.log(JsonToTsConverter.convert(primitiveJson, 'PrimitivesNone', 'none'));

  console.log('\n=== Example 8: Empty and Edge Cases ===');
  const edgeCasesJson = {
    emptyObject: {},
    emptyArray: [],
    arrayWithNulls: [null, null, null],
    arrayWithMixedNulls: [1, null, "string", null, true],
    deeplyNested: {
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                value: "deep",
                more: {
                  data: "here"
                }
              }
            }
          }
        }
      }
    },
    sparseArray: [1, , 3, , 5],
    specialNumbers: [Infinity, -Infinity, NaN],
    dates: {
      iso: "2023-01-01T00:00:00.000Z",
      timestamp: 1672531200000
    }
  };
  console.log(JsonToTsConverter.convert(edgeCasesJson, 'EdgeCases', 'all'));

  console.log('\n=== Example 9: Large Structure with Many Properties ===');
  const largeJson = {
    id: 1,
    name: "Large Object",
    created: "2023-01-01",
    updated: "2023-12-31",
    active: true,
    count: 100,
    score: 99.9,
    description: "This is a very long description that demonstrates how the converter handles string properties with lots of content",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
    metadata: {
      version: "1.0.0",
      environment: "production",
      features: {
        featureA: true,
        featureB: false,
        featureC: null,
        featureD: "enabled",
        featureE: 42
      }
    },
    statistics: {
      totalUsers: 1000,
      activeUsers: 750,
      growth: [
        { month: "Jan", value: 100, percentage: 10 },
        { month: "Feb", value: 150, percentage: 15 },
        { month: "Mar", value: 200, percentage: 20 },
        { month: "Apr", value: 250, percentage: 25 },
        { month: "May", value: 300, percentage: 30 }
      ],
      trends: [100, 150, 200, 250, 300, 350, 400]
    },
    permissions: ["read", "write", "delete", "admin", "super", "moderator"],
    config: {
      timeout: 30,
      retries: 3,
      async: true,
      debug: false,
      cache: null
    },
    relationships: {
      parent: null,
      children: [],
      siblings: [1, 2, 3],
      references: {
        primary: { id: 1, type: "user" },
        secondary: { id: 2, type: "admin" },
        tertiary: null
      }
    }
  };
  console.log(JsonToTsConverter.convert(largeJson, 'LargeObject', 'root', {
    arrayMaxTupleSize: 10,
    arrayMinTupleSize: 3
  }));

  console.log('\n=== Example 10: Special Characters in Keys ===');
  const specialCharsJson = {
    "with-dash": "value1",
    "with_underscore": "value2",
    "with space": "value3",
    "with.number": "value4",
    "with$symbol": "value5",
    "123startsWithNumber": "value6",
    "mixed-CASE_keys": "value7",
    "@special": "value8",
    "#hash": "value9",
    "normalKey": "value10",
    "with.dot.notation": "nested",
    "with/slash": "path",
    "with\\backslash": "windows",
    "with@at": "email",
    "with!exclamation": "excited",
    "with?question": "query",
    "with*asterisk": "wildcard",
    "with+plus": "add",
    "with=equals": "assign",
    "with%percent": "modulus",
    "with^caret": "power",
    "with&ampersand": "and",
    "with(parentheses)": "group",
    "with[brackets]": "array",
    "with{braces}": "object",
    "with|pipe": "or",
    "with:colon": "time",
    "with;semicolon": "separator",
    "with\"quotes\"": "quoted",
    "with_apostrophe": "possessive",
    "with<angle>": "html",
    "with>greater>": "comparison",
    "with,comma": "list",
    "with.period.": "end"
  };
  console.log(JsonToTsConverter.convert(specialCharsJson, 'SpecialKeys', 'root'));

  console.log('\n=== Example 11: Circular Reference Simulation ===');
  const circularJson = {
    name: "root",
    child: {
      name: "child",
      value: 42,
      nested: {
        name: "nested",
        items: ["a", "b", "c"]
      }
    },
    array: [
      { type: "object", id: 1 },
      { type: "object", id: 2 },
      { type: "object", id: 3 }
    ],
    mixed: {
      primitives: [1, "two", true, null],
      objects: [{ a: 1 }, { b: 2 }],
      arrays: [[1, 2], [3, 4]],
      deep: {
        deeper: {
          deepest: {
            value: "found it",
            more: {
              data: "keep going"
            }
          }
        }
      }
    }
  };
  console.log(JsonToTsConverter.convert(circularJson, 'CircularDemo', 'all', {
    arrayMaxTupleSize: 4,
    arrayMinTupleSize: 2
  }));

  console.log('\n=== Example 12: All Export Modes Comparison ===');
  const comparisonJson = {
    id: 1,
    data: {
      name: "test",
      values: [1, 2, 3],
      nested: {
        flag: true,
        items: ["a", "b"]
      }
    }
  };
  console.log('ROOT export:');
  console.log(JsonToTsConverter.convert(comparisonJson, 'TestRoot', 'root'));
  console.log('\nALL export:');
  console.log(JsonToTsConverter.convert(comparisonJson, 'TestAll', 'all'));
  console.log('\nNONE export:');
  console.log(JsonToTsConverter.convert(comparisonJson, 'TestNone', 'none'));

  console.log('\n=== Example 13: Maximum Tuple Size Configuration ===');
  const tupleJson = {
    smallArray: [1, 2, 3],
    mediumArray: [1, 2, 3, 4, 5, 6],
    largeArray: Array.from({ length: 15 }, (_, i) => i + 1),
    mixedArray: ["a", 1, true, null, {}, []]
  };
  console.log('With max tuple size 3:');
  console.log(JsonToTsConverter.convert(tupleJson, 'TupleSmall', 'root', {
    arrayMaxTupleSize: 3,
    arrayMinTupleSize: 1
  }));
  console.log('\nWith max tuple size 8:');
  console.log(JsonToTsConverter.convert(tupleJson, 'TupleLarge', 'root', {
    arrayMaxTupleSize: 8,
    arrayMinTupleSize: 2
  }));

  console.log('\n=== Example 14: Invalid JSON Handling ===');
  console.log('Invalid string (null expected):');
  console.log(JsonToTsConverter.convert('invalid json', 'InvalidTest', 'root'));
  console.log('\nNull input (null expected):');
  console.log(JsonToTsConverter.convert(null, 'NullTest', 'root'));
  console.log('\nUndefined input (null expected):');
  console.log(JsonToTsConverter.convert(undefined, 'UndefinedTest', 'root'));

  console.log('\n=== Example 15: Non-Object Root ===');
  console.log('String root:');
  console.log(JsonToTsConverter.convert("just a string", 'StringRoot', 'root'));
  console.log('\nNumber root:');
  console.log(JsonToTsConverter.convert(42, 'NumberRoot', 'root'));
  console.log('\nBoolean root:');
  console.log(JsonToTsConverter.convert(true, 'BooleanRoot', 'root'));
  console.log('\nArray root:');
  console.log(JsonToTsConverter.convert([1, 2, 3], 'ArrayRoot', 'root'));

  console.log('\n=== Example 16: Strict Mode Configuration ===');
  const strictJson = {
    id: 1,
    name: "Test",
    value: null,
    active: true,
    tags: ["tag1", "tag2"]
  };
  console.log('Non-strict mode:');
  console.log(JsonToTsConverter.convert(strictJson, 'NonStrict', 'root', { strict: false }));
  console.log('\nStrict mode:');
  console.log(JsonToTsConverter.convert(strictJson, 'Strict', 'root', { strict: true }));

  console.log('\n=== Example 17: Custom Type Mapping ===');
  const typeMapJson = {
    id: "uuid-1234",
    timestamp: "2023-01-01T00:00:00Z",
    status: "active",
    count: 42,
    tags: ["tag1", "tag2", "tag3"],
    metadata: { key: "value" }
  };
  console.log('With custom type mapping:');
  console.log(JsonToTsConverter.convert(typeMapJson, 'CustomTypes', 'root', {
    typeMap: {
      'string': 'CustomString',
      'number': 'CustomNumber',
      'boolean': 'CustomBoolean',
      'active': 'ActiveStatus',
      'uuid-1234': 'UUID'
    }
  }));

  console.log('\n=== Example 18: Array Type Detection Edge Cases ===');
  const arrayEdgeJson = {
    singleElement: [42],
    twoElements: [1, "two"],
    mixedPrimitives: [1, "two", true, null],
    withObjects: [{ a: 1 }, { b: 2 }, { c: 3 }],
    nestedArrays: [[1, 2], [3, 4], [5, 6]],
    complexMixed: [1, "two", { three: 3 }, [4, 5], null, true]
  };
  console.log('Default array settings:');
  console.log(JsonToTsConverter.convert(arrayEdgeJson, 'DefaultArrays', 'root'));
  console.log('\nCustom array settings:');
  console.log(JsonToTsConverter.convert(arrayEdgeJson, 'CustomArrays', 'root', {
    arrayMaxTupleSize: 2,
    arrayMinTupleSize: 2
  }));

  console.log('\n=== Example 19: Interface Name Sanitization ===');
  const nameSanitizeJson = {
    "123invalid": "value1",
    "with-dash": "value2",
    "with space": "value3",
    "with.dot": "value4",
    "with@symbol": "value5",
    "with&符号": "value6",
    "with#hash": "value7",
    "normalKey": "value8"
  };
  console.log(JsonToTsConverter.convert(nameSanitizeJson, 'NameSanitize', 'all'));

  console.log('\n=== Example 20: All Parameters Combined ===');
  const allParamsJson = {
    user: {
      id: "uuid-123",
      name: "John",
      status: "active",
      profile: {
        age: 30,
        verified: true,
        preferences: ["email", "sms", "push"],
        metadata: { source: "web", version: "1.0" }
      },
      contacts: [
        { type: "email", value: "john@example.com" },
        { type: "phone", value: "+1234567890" }
      ]
    },
    settings: {
      theme: "dark",
      notifications: true,
      features: {
        beta: false,
        experimental: null
      }
    },
    tags: ["premium", "verified", "2023"],
    statistics: {
      loginCount: 42,
      lastActive: "2023-12-31",
      activities: [
        { type: "login", timestamp: "2023-12-30T10:00:00Z" },
        { type: "logout", timestamp: "2023-12-30T18:00:00Z" }
      ]
    }
  };
  console.log(JsonToTsConverter.convert(allParamsJson, 'AllParamsTest', 'root', {
    arrayMaxTupleSize: 4,
    arrayMinTupleSize: 2,
    strict: true,
    typeMap: {
      'string': 'CustomString',
      'number': 'CustomNumber',
      'boolean': 'CustomBoolean',
      'uuid-123': 'UserID',
      'active': 'ActiveStatus',
      'premium': 'PremiumTag'
    }
  }));
}

run();
