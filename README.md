# JSON to TypeScript Interface Converter 

A powerful tool that automatically generates TypeScript interfaces
from JSON objects, making type-safe development easier and more efficient.

## Features ✨

- 🔧 Convert JSON to TypeScript interfaces with ease
- 📦 Generate separate interfaces for nested objects
- 📋 Create type definitions for arrays and primitive types
- ✏️ Specify custom names for root interfaces
- 🔄 Transform nested/complex JSON into flattened interface
- ❓ Support for optional properties and nullable types
- 🗂️ Preserve original JSON structure in generated interfaces
- 🌐 Export options for generated interfaces (`all`, `root`, `none`)
- 📊 Handle complex nested structures with arrays of objects
- 🚀 Fast and lightweight CLI for quick conversions
- 📝 Support for both file and direct text input
- 🔢 Intelligent type inference for numbers, strings, booleans, and null values
- 🔌 Read JSON directly from stdin for pipeline operations
- 🔢 **Smart Array Type Detection**: Automatically infers array types including:
  - Primitive arrays (e.g., `string[]`, `number[]`)
  - Mixed-type tuples (e.g., `[string, number, boolean]`)
  - Object arrays (e.g., `User[]`)
  - Nested arrays with proper type preservation
- 📐 **Tuple Generation**: Converts fixed-size arrays with mixed types to TypeScript tuples when:
  - Array length is between `arrayMinTupleSize` (default: 2) and `arrayMaxTupleSize` (default: 10)
  - Elements have different types (e.g., `[1, "text", true]` → `[number, string, boolean]`)
- 🎯 **Advanced Type Translation** *(for `JavaScript` conversion only)*:
  - Null values → `null` type (not `any`)
  - Undefined values → `undefined` type
  - Symbols → `symbol` type
  - BigInt → `bigint` type
  - Functions → `function` type
  - Dates/Regex → `object` type (with proper handling)
- ⚙️ **Configurable Array Handling**:
  - `arrayMaxTupleSize`: Maximum array length for tuple conversion (default: `10`)
  - `arrayMinTupleSize`: Minimum array length for tuple conversion (default: `2`)
  - Large arrays automatically fall back to generic array types
- 🔄 **Nested Structure Support**:
  - Deeply nested objects with proper interface separation
  - Arrays of objects with referenced interfaces
  - Mixed nested structures (objects containing arrays, arrays containing objects)
- 🛡️ **Type Safety**:
  - Preserves optional properties (`?:`) from JSON undefined values
  - Handles nullable types with union syntax (`| null`)
  - Maintains readonly constraints where applicable

## Command Line Interface 💻

The package includes a command-line interface (CLI) for quick conversions
without writing code.

### Installation 📦

```bash
npm install -g @junaidatari/json2ts   # NPM
pnpm install -g @junaidatari/json2ts  # PNPM
yarn global add @junaidatari/json2ts  # Yarn
```

### Command Options ⚙️

| Option         | Type     | Description                              | Default        |
|----------------|----------|------------------------------------------|----------------|
| `-f, --file`   | `string` | Path to JSON file to convert             | Required*      |
| `-t, --text`   | `string` | Raw JSON string to convert               | Required*      |
| `-o, --output` | `string` | Output file path                         | Prints to console |
| `-n, --name`   | `string` | Root interface name                      | `RootObject`   |
| `-l, --flat`   | `boolean`| Generate flattened interface             | -              |
| `-e, --export` | `string` | Export type: `a`=all, `r`=root, `n`=none | `r` (root)     |

*Either `--file` or `--text` must be provided or pipe through to read std input.

### Examples 📝

#### Basic file conversion

```bash
json2ts -f input.json -o types.ts -n ApiResponse
```

#### Direct text conversion

```bash
# Linux/Mac
json2ts -t '{"user": {"name": "John"}}' -n User

# Windows
json2ts -t "{\"user\": {\"name\": \"John\"}}" -n User
```

#### Generate flattened interface

```bash
json2ts -f complex.json -o flat-types.ts -n Data --flat
```

#### Export all interfaces

```bash
json2ts -f input.json -o types.ts -n Response -e a
```

#### No exports (internal interfaces)

```bash
json2ts -f input.json -o types.ts -n Response --export n
```

#### Pipeline with curl

```bash
curl -s https://jsonplaceholder.typicode.com/posts/1 | \
  json2ts -n UserResponse -o user-types.ts
```

#### Pipeline with other commands

```bash
# Convert from clipboard (Linux)
xclip -selection clipboard -o | json2ts -n ClipboardData

# Convert from file and copy to clipboard
json2ts -f data.json | tee types.ts | pbcopy

# Format with prettier
curl -s https://api.example.com/data | json2ts -n Data | \
  npx prettier --parser typescript
```

#### Configuration files

```bash
# Convert package.json
cat package.json | json2ts -n PackageConfig -o package-types.ts

# Convert tsconfig.json
json2ts -f tsconfig.json -n TsConfig -o tsconfig-types.ts
```

#### Database exports

```bash
# MongoDB export
mongoexport --collection users --out users.json
json2ts -f users.json -n UserDoc -o user-types.ts --export all

# PostgreSQL query
psql -c "SELECT row_to_json(t) FROM (SELECT * FROM users) t" | \
  json2ts -n DBUser -o db-types.ts
```

#### Interactive usage

```bash
echo '{"name": "test", "data": {"items": [1, 2, 3]}}' | \
  json2ts -n TestData

json2ts -n Config -o config-types.ts << EOF
{
  "server": {"port": 3000},
  "database": {"url": "mongodb://localhost"}
}
EOF
```

#### Development workflows

```bash
# Generate types from API schema
curl -s "$API_SCHEMA_URL" | json2ts -n Schema -o src/types/api.ts

# Watch for changes
while inotifywait -e modify data/; do
  for file in data/*.json; do
    base=$(basename "$file" .json)
    json2ts -f "$file" -o "types/${base}.ts" -n "${base^}Type"
  done
done

# Process all JSON files
find src/data -name "*.json" -exec sh -c \
  'json2ts -f "$0" -o "src/types/$(basename "$0" .json).ts"' {} \;
```

#### Multiple files script

```bash
for file in data/*.json; do
  base=$(basename "$file" .json)
  json2ts -f "$file" -o "types/${base}.ts" -n "${base^}Data"
done
```

### Tips 💡

- Check version: `json2ts --version`
- View help: `json2ts --help`

## Programmatic API 📚

### Installation

```bash
npm install @junaidatari/json2ts   # NPM
pnpm install @junaidatari/json2ts  # PNPM
yarn add @junaidatari/json2ts      # Yarn
```

### Usage 🚀

```typescript
import { 
  JsonToTsConverter, 
  JsonToFlattenedTsConverter 
} from '@junaidatari/json2ts';

// Sample JSON object
const json = {
  user: {
    name: 'John',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'New York'
    }
  }
};

// Sample JSON string
const jsonText = `{
  "_id": "691da8feb00505c1c11b08b9",
  "index": 0,
  "guid": "9150daa4-b7c4-4230-a3b8-ddd2eb05731f",
  "isActive": true,
  "balance": "$3,816.81",
  "picture": "http://placehold.it/32x32",
  "age": 39,
  "eyeColor": "blue",
  "name": "Vickie Snow",
  "gender": "female",
  "company": "DATACATOR",
  "email": "vickiesnow@datacator.com",
  "phone": "+1 (925) 537-2747",
  "address": "843 Interborough Parkway, Floris, Washington, 5608",
  "registered": "2018-11-01T06:02:48 -05:00",
  "latitude": -42.568798,
  "longitude": -77.971543,
  "tags": [
    "fugiat",
    "reprehenderit",
    "culpa",
    "veniam",
    "enim",
    "occaecat",
    "et"
  ],
  "friends": [
    {
      "id": 0,
      "name": "Silvia Ferrell"
    },
    {
      "id": 1,
      "name": "Kirkland Benson"
    },
    {
      "id": 2,
      "name": "Howe Hester"
    }
  ],
  "greeting": "Hello, Vickie Snow! You have 10 unread messages.",
  "favoriteFruit": "strawberry"
}
`;

// Convert to multiple interfaces with all exports
const interfaces = JsonToTsConverter.convert(json, 'Person', 'all');
console.log('Generated interfaces:');
console.log(interfaces);
/* Output:
export interface Person {
  user: User;
}

export interface User {
  name: string;
  age: number;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
}
*/

// Convert to flattened interface
const interfaceFlat = JsonToFlattenedTsConverter.convert(jsonText, 'PersonFlat', 'all');
console.log('\nGenerated flattened interface:');
console.log(interfaceFlat);
/* Output:
export interface PersonFlat {
  _id: string;
  index: number;
  guid: string;
  isActive: boolean;
  balance: string;
  picture: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  registered: string;
  latitude: number;
  longitude: number;
  tags: string[];
  friends: {
    id: number;
    name: string;
  }[];
  greeting: string;
  favoriteFruit: string;
}
*/

// Example with complex nested structure
const complexJson = {
  data: {
    users: [
      {
        id: 1,
        profile: {
          name: 'Alice',
          preferences: {
            theme: 'dark',
            notifications: {
              email: true,
              push: false
            }
          }
        }
      }
    ],
    metadata: {
      total: 1,
      page: 1
    }
  }
};

const complexTypes = JsonToTsConverter.convert(complexJson, 'ApiResponse', 'root');
console.log(complexTypes);
/* Output:
export interface ApiResponse {
  data: Data;
}

interface Data {
  users: User[];
  metadata: Metadata;
}

interface User {
  id: number;
  profile: Profile;
}

interface Profile {
  name: string;
  preferences: Preferences;
}

interface Preferences {
  theme: string;
  notifications: Notifications;
}

interface Notifications {
  email: boolean;
  push: boolean;
}

interface Metadata {
  total: number;
  page: number;
}
*/

// Real-world example: API response handler
async function handleApiResponse() {
  // Simulate API response
  const apiResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await apiResponse.json();

  // Generate types dynamically
  const types = JsonToTsConverter.convert(data, 'PostResponse', 'root');
  console.log(types);
  /*
  export interface PostResponse {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  */
}
```

## API Reference 📖

### Methods

#### `JsonToTsConverter.convert(json, name?, export?, options?)`

#### `JsonToFlattenedTsConverter.convert(json, name?, export?, options?)`

Converts JSON to TypeScript interfaces.

**Parameters:**

- `json`: JSON object or string to convert
- `name`: Root interface name (default: `'RootObject'`)
- `export`: Export mode (`'all'`, `'root'`, `'none'`) (default: `'all'`)
- `options`: Configuration options for array handling (optional)

**Returns:** Generated TypeScript interfaces string

**Notes:**

- Export modes:
  - `'all'`: All interfaces exported
  - `'root'`: Only root interface exported
  - `'none'`: No interfaces exported
- Options include:
  - `arrayMaxTupleSize`: Maximum array length for tuple conversion (default: `10`)
  - `arrayMinTupleSize`: Minimum array length for tuple conversion (default: `2`)

## Contributing 🤝

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup 🔧

```bash
git clone https://github.com/blacksmoke26/json2ts.git
cd json2ts
npm install
npm run dev
npm run dev:flat
npm run dev:ary
```

## License 📄

This project is licensed under the ISC License.

## Support 💬

If you encounter issues or have questions:

- Search existing [GitHub Issues](https://github.com/blacksmoke26/json2ts/issues)
- Create a [new issue](https://github.com/blacksmoke26/json2ts/issues/new)

## Acknowledgments 🙏

- Originally developed for [Posquelize](https://github.com/blacksmoke26/posquelize)
- Thanks to all contributors
- Inspired by the need for type safety in JSON-heavy applications

## Copyright ©️

Developed with ❤️ by Junaid Atari
