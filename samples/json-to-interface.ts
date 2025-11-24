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

  // NEW TEST CASES FOR ALL OPTIONS FROM CONVERTERBASE.TS

  console.log('\n=== Example 21: Property Case Transformations ===');
  const propertyCaseJson = {
    firstName: "John",
    lastName: "Doe",
    email_address: "john@example.com",
    phone_number: "+1234567890",
    isActive: true,
    created_at: "2023-01-01",
    lastLoginTime: "2023-12-31",
    user_id: 12345
  };

  console.log('Original case:');
  console.log(JsonToTsConverter.convert(propertyCaseJson, 'OriginalCase', 'root', {
    propertyCase: 'original'
  }));

  console.log('\nCamel case:');
  console.log(JsonToTsConverter.convert(propertyCaseJson, 'CamelCase', 'root', {
    propertyCase: 'camel'
  }));

  console.log('\nLower snake case:');
  console.log(JsonToTsConverter.convert(propertyCaseJson, 'SnakeCase', 'root', {
    propertyCase: 'lower_snake'
  }));

  console.log('\nUpper snake case:');
  console.log(JsonToTsConverter.convert(propertyCaseJson, 'UpperSnakeCase', 'root', {
    propertyCase: 'upper_snake'
  }));

  console.log('\nPascal case:');
  console.log(JsonToTsConverter.convert(propertyCaseJson, 'PascalCase', 'root', {
    propertyCase: 'pascal'
  }));

  console.log('\nKebab case:');
  console.log(JsonToTsConverter.convert(propertyCaseJson, 'KebabCase', 'root', {
    propertyCase: 'kebab'
  }));

  console.log('\n=== Example 22: Array Tuple Configuration Edge Cases ===');
  const tupleConfigJson = {
    emptyArray: [],
    singleItem: [42],
    twoItems: [1, "two"],
    threeItems: [1, "two", true],
    fourItems: [1, "two", true, null],
    fiveItems: [1, "two", true, null, {}],
    sixItems: [1, "two", true, null, {}, []],
    tenItems: Array.from({ length: 10 }, (_, i) => i + 1),
    fifteenItems: Array.from({ length: 15 }, (_, i) => i + 1),
    twentyItems: Array.from({ length: 20 }, (_, i) => i + 1)
  };

  // Test with minSize 1, maxSize 5
  console.log('Min 1, Max 5:');
  console.log(JsonToTsConverter.convert(tupleConfigJson, 'TupleMin1Max5', 'root', {
    arrayMinTupleSize: 1,
    arrayMaxTupleSize: 5
  }));

  // Test with minSize 3, maxSize 10
  console.log('\nMin 3, Max 10:');
  console.log(JsonToTsConverter.convert(tupleConfigJson, 'TupleMin3Max10', 'root', {
    arrayMinTupleSize: 3,
    arrayMaxTupleSize: 10
  }));

  // Test with minSize 5, maxSize 20
  console.log('\nMin 5, Max 20:');
  console.log(JsonToTsConverter.convert(tupleConfigJson, 'TupleMin5Max20', 'root', {
    arrayMinTupleSize: 5,
    arrayMaxTupleSize: 20
  }));

  // Test with minSize > maxSize (should use default values)
  console.log('\nMin 10, Max 5 (invalid):');
  console.log(JsonToTsConverter.convert(tupleConfigJson, 'TupleInvalid', 'root', {
    arrayMinTupleSize: 10,
    arrayMaxTupleSize: 5
  }));

  console.log('\n=== Example 23: Strict Mode with Complex Types ===');
  const strictComplexJson = {
    // Should infer specific types in strict mode
    string_field: "hello",
    number_field: 42,
    boolean_field: true,
    null_field: null,

    // Arrays
    string_array: ["a", "b", "c"],
    number_array: [1, 2, 3],
    mixed_array: ["a", 1, true, null],

    // Nested objects
    nested_object: {
      prop1: "value1",
      prop2: 100,
      prop3: true,
      prop4: null
    },

    // Complex nested
    complex_nested: {
      level1: {
        level2: {
          strings: ["x", "y", "z"],
          numbers: [10, 20, 30],
          flags: [true, false, null],
          objects: [{ a: 1 }, { b: 2 }, { c: 3 }]
        }
      }
    }
  };

  console.log('Strict mode enabled:');
  console.log(JsonToTsConverter.convert(strictComplexJson, 'StrictMode', 'root', {
    strict: true
  }));

  console.log('\nStrict mode disabled:');
  console.log(JsonToTsConverter.convert(strictComplexJson, 'NonStrictMode', 'root', {
    strict: false
  }));

  console.log('\n=== Example 24: Comprehensive Type Mapping ===');
  const typeMappingJson = {
    // Basic types with custom mappings
    id: "uuid-v4",
    timestamp: 1672531200000,
    status: "active",
    flag: true,

    // Nested objects with mapped types
    user: {
      id: "user-123",
      email: "user@example.com",
      role: "admin",
      created: "2023-01-01"
    },

    // Arrays with mapped element types
    tags: ["tag1", "tag2", "tag3"],
    scores: [100, 200, 300],
    flags: [true, false, null],

    // Complex nested structures
    metadata: {
      version: "1.0.0",
      environment: "production",
      features: {
        beta: true,
        experimental: null
      }
    }
  };

  console.log(JsonToTsConverter.convert(typeMappingJson, 'TypeMapping', 'root', {
    typeMap: {
      // Basic type mappings
      'string': 'CustomString',
      'number': 'CustomNumber',
      'boolean': 'CustomBoolean',

      // Value-specific mappings
      'uuid-v4': 'UserID',
      '1672531200000': 'Timestamp',
      'active': 'UserStatus',
      'admin': 'UserRole',
      '2023-01-01': 'CreationDate',
      'production': 'Environment',
      '1.0.0': 'Version',
      'beta': 'FeatureFlag',
      'tag1': 'TagType',
      '100': 'ScoreType',

      // Property path mappings (if supported)
      'user.id': 'UserID',
      'user.email': 'EmailAddress',
      'metadata.features.beta': 'BetaFeature'
    }
  }));

  console.log('\n=== Example 25: All Options Combined - Maximum Complexity ===');
  const maxComplexityJson = {
    "user_id": "uuid-12345",
    "first_name": "John",
    "last_name": "Doe",
    "email_address": "john.doe@example.com",
    "is_active": true,
    "created_at_timestamp": 1672531200000,
    "last_login_date": "2023-12-31",
    "user_status": "premium",

    "profile_data": {
      "age": 30,
      "is_verified": true,
      "preferences_array": ["email", "sms", "push"],
      "settings_config": {
        "theme_name": "dark",
        "notifications_enabled": true,
        "privacy_level": "high",
        "beta_features": {
          "new_dashboard": false,
          "ai_assistant": null,
          "advanced_analytics": true
        }
      }
    },

    "contact_info_list": [
      {
        "contact_type": "email",
        "contact_value": "john@example.com",
        "is_primary": true
      },
      {
        "contact_type": "phone",
        "contact_value": "+1234567890",
        "is_primary": false
      },
      {
        "contact_type": "address",
        "contact_value": "123 Main St",
        "is_primary": null
      }
    ],

    "activity_history": [
      {
        "activity_type": "login",
        "timestamp_value": "2023-12-30T10:00:00Z",
        "success_flag": true,
        "metadata_obj": { ip: "192.168.1.1", device: "mobile" }
      },
      {
        "activity_type": "purchase",
        "timestamp_value": "2023-12-29T14:30:00Z",
        "success_flag": true,
        "metadata_obj": { amount: 99.99, currency: "USD" }
      },
      {
        "activity_type": "logout",
        "timestamp_value": "2023-12-30T18:00:00Z",
        "success_flag": true,
        "metadata_obj": { session_duration: 28800 }
      }
    ],

    "nested_data_structures": {
      "level_one": {
        "level_two": {
          "level_three": {
            "string_collection": ["a", "b", "c", "d", "e"],
            "number_sequence": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            "boolean_flags": [true, false, null, true],
            "object_collection": [
              { id: 1, type: "type1", active: true },
              { id: 2, type: "type2", active: false },
              { id: 3, type: "type3", active: null },
              { id: 4, type: "type4", active: true },
              { id: 5, type: "type5", active: false }
            ],
            "mixed_collection": [1, "two", true, null, { four: 4 }, [5, 6]]
          }
        }
      }
    },

    "special_key_values": {
      "": "empty_key",
      "123numbers": "starts_with_numbers",
      "with-dash": "dash_separated",
      "with_underscore": "underscore_separated",
      "with space": "space_separated",
      "with.dot": "dot_separated",
      "@mentions": "at_symbol",
      "#hashtags": "hash_symbol",
      "$dollars": "dollar_symbol",
      "mixed-CASE_keys": "mixed_case"
    }
  };

  console.log(JsonToTsConverter.convert(maxComplexityJson, 'MaxComplexityTest', 'all', {
    // Array configuration
    arrayMaxTupleSize: 8,
    arrayMinTupleSize: 2,

    // Strict mode
    strict: true,

    // Property case transformation
    propertyCase: 'camel',

    // Comprehensive type mapping
    typeMap: {
      // Basic types
      'string': 'CustomStringType',
      'number': 'CustomNumberType',
      'boolean': 'CustomBooleanType',

      // Specific values
      'uuid-12345': 'UserID',
      'john.doe@example.com': 'EmailAddress',
      'premium': 'UserStatus',
      '1672531200000': 'UnixTimestamp',
      '2023-12-31': 'DateString',

      // Array element mappings
      'email': 'ContactTypeEmail',
      'phone': 'ContactTypePhone',
      'address': 'ContactTypeAddress',
      'login': 'ActivityTypeLogin',
      'purchase': 'ActivityTypePurchase',
      'logout': 'ActivityTypeLogout',

      // Property mappings
      'email_address': 'userEmail',
      'first_name': 'firstName',
      'last_name': 'lastName',
      'is_active': 'isActive',
      'created_at_timestamp': 'createdAt',

      // Nested property mappings
      'profile_data.age': 'userAge',
      'profile_data.is_verified': 'isVerified',
      'settings_config.theme_name': 'theme',
      'settings_config.notifications_enabled': 'notificationsEnabled',

      // Special character keys
      '': 'EmptyKey',
      '123numbers': 'NumericKey',
      'with-dash': 'dashKey',
      'with_underscore': 'underscoreKey',
      'with space': 'spaceKey',

      // Array values
      'sms': 'SmsPreference',
      'push': 'PushPreference',
      'dark': 'DarkTheme',
      'high': 'HighPrivacy'
    }
  }));

  console.log('\n=== Example 26: Edge Cases and Error Handling ===');

  // Test invalid interface name
  console.log('Invalid interface name (should throw error):');
  try {
    JsonToTsConverter.convert({ test: 123 }, '123invalid', 'root');
  } catch (error: any) {
    console.log('Error caught:', error.message);
  }

  // Test invalid JSON string
  console.log('\nInvalid JSON string:');
  console.log(JsonToTsConverter.convert('{ invalid json }', 'InvalidJson', 'root'));

  // Test null/undefined inputs
  console.log('\nNull input:');
  console.log(JsonToTsConverter.convert(null, 'NullInput', 'root'));

  console.log('\nUndefined input:');
  console.log(JsonToTsConverter.convert(undefined, 'UndefinedInput', 'root'));

  // Test empty inputs
  console.log('\nEmpty string:');
  console.log(JsonToTsConverter.convert('', 'EmptyString', 'root'));

  console.log('\nWhitespace only:');
  console.log(JsonToTsConverter.convert('   \t\n   ', 'Whitespace', 'root'));

  // Test non-object roots with all options
  console.log('\n=== Example 27: Non-Object Roots with All Options ===');
  console.log('String root with options:');
  console.log(JsonToTsConverter.convert("test", 'StringRoot', 'root', {
    arrayMaxTupleSize: 5,
    arrayMinTupleSize: 2,
    strict: true,
    propertyCase: 'camel',
    typeMap: { 'string': 'MyStringType' }
  }));

  console.log('\nNumber root with options:');
  console.log(JsonToTsConverter.convert(42, 'NumberRoot', 'root', {
    arrayMaxTupleSize: 5,
    arrayMinTupleSize: 2,
    strict: true,
    propertyCase: 'camel',
    typeMap: { 'number': 'MyNumberType' }
  }));

  console.log('\nBoolean root with options:');
  console.log(JsonToTsConverter.convert(true, 'BooleanRoot', 'root', {
    arrayMaxTupleSize: 5,
    arrayMinTupleSize: 2,
    strict: true,
    propertyCase: 'camel',
    typeMap: { 'boolean': 'MyBooleanType' }
  }));

  console.log('\nArray root with options:');
  console.log(JsonToTsConverter.convert([1, 2, 3, 4, 5], 'ArrayRoot', 'root', {
    arrayMaxTupleSize: 5,
    arrayMinTupleSize: 2,
    strict: true,
    propertyCase: 'camel',
    typeMap: { 'number': 'MyNumberType' }
  }));

  console.log('\n=== Example 28: Performance and Stress Testing ===');

  // Very large nested structure
  const generateLargeStructure = (depth: number, width: number): any => {
    if (depth === 0) {
      return { value: `leaf_${Math.random()}` };
    }

    const obj: any = {};
    for (let i = 0; i < width; i++) {
      obj[`prop_${i}`] = generateLargeStructure(depth - 1, Math.max(1, width / 2));
    }
    obj[`array_${depth}`] = Array.from({ length: width }, (_, j) => ({ item: j, data: `item_${j}` }));
    return obj;
  };

  const stressTestJson = generateLargeStructure(4, 5);

  console.log('Large structure with all options:');
  console.log(JsonToTsConverter.convert(stressTestJson, 'StressTest', 'all', {
    arrayMaxTupleSize: 10,
    arrayMinTupleSize: 3,
    strict: true,
    propertyCase: 'lower_snake',
    typeMap: {
      'string': 'LargeString',
      'number': 'LargeNumber',
      'leaf': 'LeafType'
    }
  }));

  console.log('\n=== Example 29: Property Case Transformation with Special Characters ===');
  const specialPropertyCaseJson = {
    "NormalProperty": "value1",
    "UPPER_CASE": "value2",
    "lower_case": "value3",
    "mixedCASE": "value4",
    "with-dash": "value5",
    "with_underscore": "value6",
    "with space": "value7",
    "with.dot": "value8",
    "123starts": "value9",
    "": "value10",
    "$special": "value11",
    "@mention": "value12",
    "#hash": "value13"
  };

  console.log('Original:');
  console.log(JsonToTsConverter.convert(specialPropertyCaseJson, 'OriginalProps', 'none', {
    propertyCase: 'original'
  }));

  console.log('\nCamel case:');
  console.log(JsonToTsConverter.convert(specialPropertyCaseJson, 'CamelProps', 'none', {
    propertyCase: 'camel'
  }));

  console.log('\nLower snake case:');
  console.log(JsonToTsConverter.convert(specialPropertyCaseJson, 'SnakeProps', 'none', {
    propertyCase: 'lower_snake'
  }));

  console.log('\nUpper snake case:');
  console.log(JsonToTsConverter.convert(specialPropertyCaseJson, 'UpperSnakeProps', 'none', {
    propertyCase: 'upper_snake'
  }));

  console.log('\nPascal case:');
  console.log(JsonToTsConverter.convert(specialPropertyCaseJson, 'PascalProps', 'none', {
    propertyCase: 'pascal'
  }));

  console.log('\nKebab case:');
  console.log(JsonToTsConverter.convert(specialPropertyCaseJson, 'KebabProps', 'none', {
    propertyCase: 'kebab'
  }));

  console.log('\n=== Example 30: Complete Feature Matrix Test ===');
  const matrixTestJson = {
    id: "test-uuid-123",
    user_name: "test_user",
    is_active: true,
    created_date: "2023-01-01",
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    mixed_data: ["string", 42, true, null, { nested: "object" }, [1, 2, 3]],
    nested_config: {
      setting_one: "value1",
      setting_two: "value2",
      nested_more: {
        deep_property: "deep_value",
        deep_array: [true, false, null, true, false],
        deep_nested: {
          final_string: "final",
          final_number: 999,
          final_boolean: false
        }
      }
    }
  };

  // Test all combinations
  const exportTypes: ('root' | 'all' | 'none')[] = ['root', 'all', 'none'];
  const propertyCases: ('original' | 'camel' | 'lower_snake' | 'upper_snake' | 'pascal' | 'kebab')[] =
    ['original', 'camel', 'lower_snake', 'upper_snake', 'pascal', 'kebab'];

  for (const exportType of exportTypes) {
    for (const propertyCase of propertyCases) {
      console.log(`\n--- Export: ${exportType}, Case: ${propertyCase}, Strict: true ---`);
      console.log(JsonToTsConverter.convert(matrixTestJson, `Test_${exportType}_${propertyCase}`, exportType, {
        arrayMaxTupleSize: 10,
        arrayMinTupleSize: 3,
        strict: true,
        propertyCase: propertyCase,
        typeMap: {
          'string': 'MyString',
          'number': 'MyNumber',
          'boolean': 'MyBoolean',
          'test-uuid-123': 'TestUUID',
          'test_user': 'TestUser',
          'value1': 'SettingValue',
          'value2': 'AnotherSetting',
          'deep_value': 'DeepValue'
        }
      }));
    }
  }
}

run();
