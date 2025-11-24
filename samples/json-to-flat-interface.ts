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
}

run().catch(console.error);
