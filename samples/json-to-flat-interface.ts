/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 *
 * @fileoverview This script demonstrates comprehensive usage of JsonToFlattenedTsConverter
 * with various scenarios including complex nested objects, arrays, circular references,
 * and different export types and conversion options.
 */

// classes
import { JsonToFlattenedTsConverter } from '../src/index';

/**
 * Main function to demonstrate all conversion scenarios and parameters of JsonToFlattenedTsConverter.
 * Shows various JSON structures and their corresponding TypeScript interface conversions.
 */
async function run(): Promise<void> {
  console.log('=== JsonToFlattenedTsConverter Comprehensive Examples ===\n');

  // Example 1: Basic conversion with default parameters
  console.log('--- Example 1: Basic Conversion ---');
  const basicJson = {
    name: 'John Doe',
    age: 30,
    isActive: true
  };
  const basicOutput = JsonToFlattenedTsConverter.convert(basicJson, 'UserProfile');
  console.log(basicOutput);

  // Example 2: Complex nested object with arrays
  console.log('\n--- Example 2: Complex Nested Structure ---');
  const complexJson = {
    user: {
      id: 1,
      profile: {
        personal: {
          firstName: 'John',
          lastName: 'Doe',
          contact: {
            email: 'john@example.com',
            phones: ['123-456-7890', '987-654-3210']
          }
        },
        preferences: {
          theme: 'dark',
          notifications: {
            email: true,
            sms: false,
            push: true
          }
        }
      },
      roles: ['admin', 'user'],
      metadata: {
        createdAt: '2023-01-01',
        updatedAt: '2023-12-31'
      }
    }
  };
  const complexOutput = JsonToFlattenedTsConverter.convert(complexJson, 'ComplexUser', 'root');
  console.log(complexOutput);

  // Example 3: Array with different types and tuple detection
  console.log('\n--- Example 3: Arrays and Tuples ---');
  const arrayJson = {
    primitiveArray: [1, 2, 3],
    mixedArray: [1, 'string', true, null],
    objectArray: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ],
    nestedArrays: [
      [1, 2, 3],
      ['a', 'b', 'c']
    ],
    tupleExample: ['string', 42, true]
  };
  const arrayOutput = JsonToFlattenedTsConverter.convert(arrayJson, 'ArrayExample', 'root', {
    arrayMaxTupleSize: 5,
    arrayMinTupleSize: 2
  });
  console.log(arrayOutput);

  // Example 4: Handling null and undefined values
  console.log('\n--- Example 4: Null and Undefined Handling ---');
  const nullJson = {
    nullableField: null,
    optionalField: undefined,
    mixedNulls: {
      value: null,
      nested: {
        deeplyNull: null,
        withValue: 'exists'
      }
    }
  };
  const nullOutput = JsonToFlattenedTsConverter.convert(nullJson, 'NullExample', 'root');
  console.log(nullOutput);

  // Example 5: Empty structures
  console.log('\n--- Example 5: Empty Objects and Arrays ---');
  const emptyJson = {
    emptyObject: {},
    emptyArray: [],
    nestedEmpty: {
      empty: {},
      items: []
    }
  };
  const emptyOutput = JsonToFlattenedTsConverter.convert(emptyJson, 'EmptyStructures');
  console.log(emptyOutput);

  // Example 6: JSON string input
  console.log('\n--- Example 6: JSON String Input ---');
  const jsonString = JSON.stringify({
    product: {
      id: 'prod-123',
      details: {
        name: 'Sample Product',
        price: 99.99,
        tags: ['electronics', 'gadget']
      }
    }
  });
  const stringOutput = JsonToFlattenedTsConverter.convert(jsonString, 'Product', 'root');
  console.log(stringOutput);

  // Example 7: Circular reference handling (simulated)
  console.log('\n--- Example 7: Circular Reference Protection ---');
  const circularJson: any = {
    name: 'Circular',
    value: 42
  };
  circularJson.self = circularJson; // This creates a circular reference
  const circularOutput = JsonToFlattenedTsConverter.convert(circularJson, 'CircularExample');
  console.log(circularOutput);

  // Example 8: Different export types
  console.log('\n--- Example 8: Different Export Types ---');
  const exportJson = { test: 'value' };
  const noneExport = JsonToFlattenedTsConverter.convert(exportJson, 'NoExport', 'none');
  const interfaceExport = JsonToFlattenedTsConverter.convert(exportJson, 'OnlyInterface', 'all');
  const rootExport = JsonToFlattenedTsConverter.convert(exportJson, 'RootExport', 'root');

  console.log('No export:');
  console.log(noneExport);
  console.log('\nInterface export:');
  console.log(interfaceExport);
  console.log('\nRoot export:');
  console.log(rootExport);

  // Example 9: Large nested structure with all primitive types
  console.log('\n--- Example 9: All Primitive Types ---');
  const primitivesJson = {
    stringField: 'Hello World',
    numberField: 3.14159,
    integerField: 42,
    booleanField: true,
    nullField: null,
    arrayField: ['string', 123, true, null],
    objectField: {
      nestedString: 'nested',
      nestedNumber: 456,
      nestedBoolean: false
    }
  };
  const primitivesOutput = JsonToFlattenedTsConverter.convert(primitivesJson, 'AllPrimitives', 'root');
  console.log(primitivesOutput);

  // Example 10: Using custom options
  console.log('\n--- Example 10: Custom Conversion Options ---');
  const optionsJson = {
    items: [
      { id: 1, type: 'A', values: [1, 2, 3] },
      { id: 2, type: 'B', values: ['x', 'y', 'z'] }
    ]
  };
  const optionsOutput = JsonToFlattenedTsConverter.convert(optionsJson, 'CustomOptions', 'root', {
    arrayMaxTupleSize: 3,
    arrayMinTupleSize: 1
  });
  console.log(optionsOutput);

  // Example 11: Real-world data structure
  console.log('\n--- Example 11: Real-world API Response ---');
  const apiResponse = {
    success: true,
    data: {
      users: [
        {
          id: 1,
          profile: {
            personal: {
              firstName: 'Alice',
              lastName: 'Smith',
              age: 28,
              avatar: null
            },
            contact: {
              email: 'alice@example.com',
              phone: '+1-555-0123',
              address: {
                street: '123 Main St',
                city: 'Anytown',
                country: 'USA',
                coordinates: {
                  lat: 40.7128,
                  lng: -74.0060
                }
              }
            },
            settings: {
              privacy: {
                showEmail: false,
                showPhone: true,
                showAddress: false
              },
              notifications: {
                email: true,
                sms: false,
                push: true,
                marketing: false
              }
            }
          },
          activity: {
            lastLogin: '2023-12-01T10:00:00Z',
            loginCount: 42,
            sessions: [
              {
                id: 'sess-1',
                startTime: '2023-12-01T09:00:00Z',
                endTime: '2023-12-01T10:30:00Z',
                duration: 5400,
                userAgent: 'Mozilla/5.0...'
              }
            ],
            preferences: {
              theme: 'dark',
              language: 'en',
              timezone: 'UTC'
            }
          },
          permissions: ['read', 'write', 'delete'],
          metadata: {
            createdAt: '2023-01-15T08:30:00Z',
            updatedAt: '2023-12-01T10:00:00Z',
            version: 2
          }
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        hasNext: false,
        hasPrev: false
      },
      filters: {
        search: null,
        sortBy: 'name',
        sortOrder: 'asc',
        tags: ['active', 'verified']
      }
    },
    errors: [],
    warnings: ['Deprecated field used']
  };
  const apiOutput = JsonToFlattenedTsConverter.convert(apiResponse, 'ApiResponse', 'root');
  console.log(apiOutput);

  // Example 12: Array tuple detection with different sizes
  console.log('\n--- Example 12: Tuple Detection with Custom Sizes ---');
  const tupleJson = {
    smallTuple: [1, 2],
    mediumTuple: ['a', 'b', 'c', 'd'],
    largeTuple: [true, false, true, false, true, false],
    oversizedTuple: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  };
  const tupleOutput1 = JsonToFlattenedTsConverter.convert(tupleJson, 'Tuples1', 'root', {
    arrayMaxTupleSize: 3,
    arrayMinTupleSize: 2
  });
  console.log('Max 3, Min 2:');
  console.log(tupleOutput1);
  const tupleOutput2 = JsonToFlattenedTsConverter.convert(tupleJson, 'Tuples2', 'root', {
    arrayMaxTupleSize: 8,
    arrayMinTupleSize: 4
  });
  console.log('\nMax 8, Min 4:');
  console.log(tupleOutput2);

  // Example 13: Deeply nested circular reference
  console.log('\n--- Example 13: Deeply Nested Circular Reference ---');
  const deepCircular: any = {
    level1: {
      level2: {
        level3: {
          value: 'deep'
        }
      }
    }
  };
  deepCircular.level1.level2.level3.back = deepCircular.level1;
  const deepCircularOutput = JsonToFlattenedTsConverter.convert(deepCircular, 'DeepCircular');
  console.log(deepCircularOutput);

  // Example 14: Mixed array with objects and primitives
  console.log('\n--- Example 14: Mixed Array Types ---');
  const mixedJson = {
    mixedArray: [
      'string',
      123,
      true,
      { id: 1, name: 'object' },
      ['nested', 'array']
    ]
  };
  const mixedOutput = JsonToFlattenedTsConverter.convert(mixedJson, 'MixedArray', 'root');
  console.log(mixedOutput);

  // Example 15: Default interface name
  console.log('\n--- Example 15: Default Interface Name ---');
  const defaultNameJson = { value: 'test' };
  const defaultNameOutput = JsonToFlattenedTsConverter.convert(defaultNameJson);
  console.log(defaultNameOutput);

  // Example 16: Empty array with custom tuple settings
  console.log('\n--- Example 16: Empty Array with Tuple Settings ---');
  const emptyArrayJson = {
    empty: [],
    withSettings: []
  };
  const emptyArrayOutput = JsonToFlattenedTsConverter.convert(emptyArrayJson, 'EmptyArrays', 'root', {
    arrayMaxTupleSize: 2,
    arrayMinTupleSize: 1
  });
  console.log(emptyArrayOutput);

  // Example 17: All export types with complex data
  console.log('\n--- Example 17: All Export Types with Complex Data ---');
  const complexForExports = {
    nested: {
      deep: { value: 'test' },
      array: [1, 2, 3]
    }
  };
  console.log('No export:');
  console.log(JsonToFlattenedTsConverter.convert(complexForExports, 'NoExport', 'none'));
  console.log('\nInterface export:');
  console.log(JsonToFlattenedTsConverter.convert(complexForExports, 'InterfaceExport', 'all'));
  console.log('\nRoot export:');
  console.log(JsonToFlattenedTsConverter.convert(complexForExports, 'RootExport', 'root'));

  // Example 18: Type mapping for custom types
  console.log('\n--- Example 18: Type Mapping with typeMap Option ---');
  const typeMapJson = {
    timestamp: '2023-12-01T10:00:00Z',
    uuid: '550e8400-e29b-41d4-a716-446655440000',
    status: 'active',
    priority: 1,
    score: 95.5,
    metadata: {
      created: '2023-01-01T00:00:00Z',
      updated: '2023-12-31T23:59:59Z',
      version: 1.0,
      enabled: true
    }
  };
  const typeMapOutput = JsonToFlattenedTsConverter.convert(typeMapJson, 'TypeMapExample', 'root', {
    typeMap: {
      'timestamp': 'Date',
      'uuid': 'string',
      'status': '"active" | "inactive" | "pending"',
      'priority': 'number',
      'score': 'number',
      'created': 'Date',
      'updated': 'Date',
      'version': 'number',
      'enabled': 'boolean'
    }
  });
  console.log(typeMapOutput);

  // Example 19: Type mapping with value-based mappings
  console.log('\n--- Example 19: Value-based Type Mapping ---');
  const valueMapJson = {
    role: 'admin',
    status: 'published',
    type: 'premium',
    category: 'electronics'
  };
  const valueMapOutput = JsonToFlattenedTsConverter.convert(valueMapJson, 'ValueMapExample', 'root', {
    typeMap: {
      'admin': 'AdminRole',
      'published': 'PublishedStatus',
      'premium': 'PremiumType',
      'electronics': 'ElectronicsCategory'
    }
  });
  console.log(valueMapOutput);

  // Example 20: Combined type mapping with complex structure
  console.log('\n--- Example 20: Complex Type Mapping ---');
  const complexTypeMapJson = {
    user: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      joinDate: '2023-01-01T00:00:00Z',
      lastLogin: '2023-12-01T10:00:00Z',
      status: 'active',
      profile: {
        type: 'premium',
        level: 'gold',
        settings: {
          theme: 'dark',
          notifications: true
        }
      }
    },
    content: {
      id: 12345,
      publishedAt: '2023-12-01T08:00:00Z',
      status: 'published',
      tags: ['news', 'tech', 'javascript']
    }
  };
  const complexTypeMapOutput = JsonToFlattenedTsConverter.convert(complexTypeMapJson, 'ComplexTypeMap', 'root', {
    typeMap: {
      '550e8400-e29b-41d4-a716-446655440000': 'UUID',
      'active': 'ActiveStatus',
      'published': 'PublishedStatus',
      'premium': 'PremiumAccount',
      'gold': 'GoldTier',
      'dark': 'DarkTheme',
      '2023-01-01T00:00:00Z': 'Date',
      '2023-12-01T10:00:00Z': 'Date',
      '2023-12-01T08:00:00Z': 'Date'
    }
  });
  console.log(complexTypeMapOutput);

  // Example 21: Comprehensive arrayMaxTupleSize testing
  console.log('\n--- Example 21: Array Max Tuple Size Testing ---');
  const maxTupleJson = {
    tinyArray: [1],
    smallArray: [1, 2],
    mediumArray: [1, 2, 3],
    largeArray: [1, 2, 3, 4, 5],
    hugeArray: new Array(15).fill(0).map((_, i) => i),
    mixedArray: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    nestedArrays: {
      level1: [1, 2],
      level2: [1, 2, 3, 4],
      level3: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  };
  console.log('Max tuple size = 2:');
  console.log(JsonToFlattenedTsConverter.convert(maxTupleJson, 'MaxTuple2', 'root', { arrayMaxTupleSize: 2 }));
  console.log('\nMax tuple size = 5:');
  console.log(JsonToFlattenedTsConverter.convert(maxTupleJson, 'MaxTuple5', 'root', { arrayMaxTupleSize: 5 }));
  console.log('\nMax tuple size = 20:');
  console.log(JsonToFlattenedTsConverter.convert(maxTupleJson, 'MaxTuple20', 'root', { arrayMaxTupleSize: 20 }));

  // Example 22: Comprehensive arrayMinTupleSize testing
  console.log('\n--- Example 22: Array Min Tuple Size Testing ---');
  const minTupleJson = {
    single: [1],
    double: [1, 2],
    triple: [1, 2, 3],
    quad: [1, 2, 3, 4],
    many: [1, 2, 3, 4, 5, 6]
  };
  console.log('Min tuple size = 1:');
  console.log(JsonToFlattenedTsConverter.convert(minTupleJson, 'MinTuple1', 'root', { arrayMinTupleSize: 1 }));
  console.log('\nMin tuple size = 3:');
  console.log(JsonToFlattenedTsConverter.convert(minTupleJson, 'MinTuple3', 'root', { arrayMinTupleSize: 3 }));
  console.log('\nMin tuple size = 5:');
  console.log(JsonToFlattenedTsConverter.convert(minTupleJson, 'MinTuple5', 'root', { arrayMinTupleSize: 5 }));

  // Example 23: Strict mode testing
  console.log('\n--- Example 23: Strict Mode Testing ---');
  const strictJson = {
    stringValue: 'hello',
    numberValue: 42,
    booleanValue: true,
    nullValue: null,
    undefinedValue: undefined,
    arrayValue: [1, 'two', true],
    objectValue: { nested: 'value' },
    mixedArray: [1, 'two', true, null, { obj: true }],
    deepNested: {
      level1: {
        level2: {
          level3: {
            value: 'deep'
          }
        }
      }
    }
  };
  console.log('Non-strict mode (default):');
  console.log(JsonToFlattenedTsConverter.convert(strictJson, 'NonStrict', 'root', { strict: false }));
  console.log('\nStrict mode:');
  console.log(JsonToFlattenedTsConverter.convert(strictJson, 'Strict', 'root', { strict: true }));

  // Example 24: Comprehensive propertyCase testing
  console.log('\n--- Example 24: Property Case Transformations ---');
  const propertyCaseJson = {
    'user_name': 'john',
    'firstName': 'john',
    'last-name': 'doe',
    'EMAIL_ADDRESS': 'john@example.com',
    'phoneNumber': '123-456-7890',
    'address_line_1': '123 Main St',
    'cityName': 'Anytown',
    'zip-code': '12345',
    'country_code': 'US',
    'is_active': true,
    'createdAt': '2023-01-01'
  };
  const cases = ['original', 'camel', 'lower_snake', 'pascal', 'upper_snake', 'kebab'] as const;
  cases.forEach(caseType => {
    console.log(`\nProperty case: ${caseType}`);
    console.log(JsonToFlattenedTsConverter.convert(propertyCaseJson, `Case${caseType.charAt(0).toUpperCase() + caseType.slice(1)}`, 'root', { propertyCase: caseType }));
  });

  // Example 25: Complex typeMap with all value types
  console.log('\n--- Example 25: Advanced Type Mapping ---');
  const advancedTypeMapJson = {
    // Primitive values
    strValue: 'active',
    numValue: 42,
    boolValue: true,
    nullValue: null,

    // Array values
    arrayValue: ['item1', 'item2', 'item3'],
    nestedArray: [[1, 2], [3, 4]],

    // Object values
    objectValue: { key: 'value' },
    nestedObject: {
      level1: {
        level2: {
          value: 'deep'
        }
      }
    },

    // Mixed nested
    complexData: {
      users: [
        { id: '550e8400-e29b-41d4-a716-446655440000', name: 'John', status: 'active' },
        { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Jane', status: 'inactive' }
      ],
      settings: {
        theme: 'dark',
        notifications: { email: true, sms: false },
        metadata: { version: 1.0, enabled: true }
      }
    },

    // Special values
    dateValue: '2023-12-01T10:00:00Z',
    uuidValue: '550e8400-e29b-41d4-a716-446655440000',
    enumValue: 'published',
    unionValue: 'admin'
  };
  const advancedTypeMapOutput = JsonToFlattenedTsConverter.convert(advancedTypeMapJson, 'AdvancedTypeMap', 'root', {
    typeMap: {
      // Primitive type mappings
      'active': 'UserStatus',
      '42': 'Age',
      'true': 'Flag',

      // Array type mappings
      'item1': 'FirstItem',
      'item2': 'SecondItem',
      'item3': 'ThirdItem',

      // Object field mappings
      'key': 'PropertyKey',
      'value': 'PropertyValue',

      // Nested mappings
      'level1': 'FirstLevel',
      'level2': 'SecondLevel',
      'deep': 'DeepValue',

      // Complex nested mappings
      '550e8400-e29b-41d4-a716-446655440000': 'UUID',
      '550e8400-e29b-41d4-a716-446655440001': 'UUID',
      'John': 'UserName',
      'Jane': 'UserName',

      // Special type mappings
      '2023-12-01T10:00:00Z': 'Timestamp',
      'published': 'PublicationStatus',
      'admin': 'RoleType',

      // Property name mappings
      'theme': 'ThemeSetting',
      'notifications': 'NotificationSettings',
      'email': 'EmailNotification',
      'sms': 'SMSNotification',
      'metadata': 'SystemMetadata',
      'version': 'VersionNumber',
      'enabled': 'EnabledFlag'
    }
  });
  console.log(advancedTypeMapOutput);

  // Example 26: Edge cases with all options combined
  console.log('\n--- Example 26: Edge Cases with All Options ---');
  const edgeCaseJson = {
    // Empty and null values
    emptyObject: {},
    emptyArray: [],
    nullValue: null,
    undefinedValue: undefined,

    // Extreme array sizes
    singleElement: [1],
    hugeArray: new Array(100).fill(0).map((_, i) => i),

    // Circular reference
    circular: { name: 'test' },

    // Deeply nested
    deeplyNested: {
      l1: { l2: { l3: { l4: { l5: { l6: 'deep' } } } } }
    },

    // Mixed property names
    'camelCase': 'value1',
    'snake_case': 'value2',
      'PascalCase': 'value3',
    'kebab-case': 'value4',
    'UPPER_SNAKE': 'value5',

    // Special characters in keys
    'with-space': 'space',
    'with.dots': 'dots',
    'with-underscores': 'underscores',
    'with$dollar': 'dollar',
    '123numbers': 'numbers',
    'mixed-Case_With$Everything': 'mixed'
  };

  // Add circular reference
  (edgeCaseJson.circular as any).self = edgeCaseJson.circular;

  const edgeCaseOutput = JsonToFlattenedTsConverter.convert(edgeCaseJson, 'EdgeCase', 'root', {
    arrayMaxTupleSize: 3,
    arrayMinTupleSize: 2,
    strict: true,
    propertyCase: 'camel',
    typeMap: {
      'test': 'TestValue',
      'deep': 'DeepValue',
      'value1': 'FirstValue',
      'value2': 'SecondValue',
      'value3': 'ThirdValue',
      'value4': 'FourthValue',
      'value5': 'FifthValue',
      'space': 'SpaceValue',
      'dots': 'DotsValue',
      'underscores': 'UnderscoresValue',
      'dollar': 'DollarValue',
      'numbers': 'NumbersValue',
      'mixed': 'MixedValue'
    }
  });
  console.log(edgeCaseOutput);

  // Example 27: Performance testing with large data
  console.log('\n--- Example 27: Performance Testing with Large Data ---');
  const largeJson = {
    users: new Array(50).fill(0).map((_, i) => ({
      id: `user-${i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      profile: {
        age: 20 + (i % 50),
        settings: {
          theme: i % 2 === 0 ? 'dark' : 'light',
          notifications: {
            email: i % 3 === 0,
            push: i % 2 === 0,
            sms: i % 4 === 0
          }
        }
      },
      activity: {
        loginCount: Math.floor(Math.random() * 1000),
        lastLogin: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        sessions: new Array(Math.floor(Math.random() * 10) + 1).fill(0).map((_, j) => ({
          id: `session-${i}-${j}`,
          duration: Math.floor(Math.random() * 86400),
          userAgent: `Browser ${j}`
        }))
      }
    })),
    metadata: {
      total: 50,
      page: 1,
      timestamp: new Date().toISOString(),
      filters: ['active', 'verified'],
      sorts: ['name', 'email']
    }
  };

  console.time('Large data conversion');
  const largeOutput = JsonToFlattenedTsConverter.convert(largeJson, 'LargeDataSet', 'root', {
    arrayMaxTupleSize: 5,
    arrayMinTupleSize: 2,
    strict: false,
    propertyCase: 'camel'
  });
  console.timeEnd('Large data conversion');
  console.log('Generated', largeOutput?.split?.('\n')?.length, 'lines of TypeScript');

  // Example 28: All options combined in complex scenario
  console.log('\n--- Example 28: All Options Combined ---');
  const allOptionsJson = {
    api: {
      version: 'v2',
      endpoint: 'https://api.example.com',
      authentication: {
        type: 'bearer',
        token_expires_in: 3600
      },
      resources: {
        users: {
          endpoint: '/users',
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          schemas: {
            create: {
              type: 'object',
              properties: {
                user_name: { type: 'string', required: true },
                email_address: { type: 'string', format: 'email' },
                is_active: { type: 'boolean', default: true },
                profile_settings: {
                  type: 'object',
                  properties: {
                    theme_preference: { enum: ['light', 'dark', 'auto'] },
                    notification_settings: {
                      email_notifications: { type: 'boolean' },
                      push_notifications: { type: 'boolean' },
                      sms_notifications: { type: 'boolean' }
                    }
                  }
                }
              }
            },
            response: {
              type: 'array',
              items: {
                user_id: { type: 'string', format: 'uuid' },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
                last_login_at: { type: 'string', format: 'date-time' }
              }
            }
          }
        },
        posts: {
          endpoint: '/posts',
          pagination: {
            type: 'cursor',
            limit: 20,
            max_limit: 100
          },
          filters: {
            status: { enum: ['draft', 'published', 'archived'] },
            author_id: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            date_range: {
              start_date: { type: 'string', format: 'date' },
              end_date: { type: 'string', format: 'date' }
            }
          }
        }
      },
      webhooks: {
        events: ['user.created', 'user.updated', 'post.published'],
        config: {
          retry_attempts: 3,
          timeout: 30000,
          signature_header: 'X-Signature'
        }
      }
    }
  };

  const allOptionsOutput = JsonToFlattenedTsConverter.convert(allOptionsJson, 'CompleteAPIDocumentation', 'root', {
    arrayMaxTupleSize: 4,
    arrayMinTupleSize: 2,
    strict: true,
    propertyCase: 'lower_snake',
    typeMap: {
      'v2': 'APIVersion',
      'bearer': 'BearerAuth',
      'GET': 'HTTPMethod',
      'POST': 'HTTPMethod',
      'PUT': 'HTTPMethod',
      'DELETE': 'HTTPMethod',
      'light': 'ThemeOption',
      'dark': 'ThemeOption',
      'auto': 'ThemeOption',
      'draft': 'PostStatus',
      'published': 'PostStatus',
      'archived': 'PostStatus',
      'cursor': 'CursorPagination',
      'user.created': 'WebhookEvent',
      'user.updated': 'WebhookEvent',
      'post.published': 'WebhookEvent'
    }
  });
  console.log(allOptionsOutput);
}

run().catch(console.error);
