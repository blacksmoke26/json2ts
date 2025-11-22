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
- 🌐 Export options for generated interfaces (all, root, none)
- 📊 Handle complex nested structures with arrays of objects
- 🚀 Fast and lightweight CLI for quick conversions
- 📝 Support for both file and direct text input
- 🔢 Intelligent type inference for numbers, strings, booleans, and null values

## CLI Usage 💻

The package includes a command-line interface (CLI) for quick conversions without writing code.

### Installation 📦

```bash
npm install -g @junaidatari/json2ts   # for NPM
pnpm install -g @junaidatari/json2ts  # for PNPM
yarn global add @junaidatari/json2ts  # for Yarn
```

### Command Options ⚙️

| Option         | Type     | Description                                                               | Default        |
|----------------|----------|---------------------------------------------------------------------------|----------------|
| `-f, --file`   | `string` | Path to the JSON file to be converted to TypeScript interfaces            | Required (unless `--text` is used) |
| `-t, --text`   | `string` | Raw JSON string to be converted to TypeScript interfaces                 | Required (unless `--file` is used) |
| `-o, --output` | `string` | Path where the generated TypeScript interface file will be saved          | Prints to console if not specified |
| `-n, --name`   | `string` | Name for the root TypeScript interface                                    | `RootObject`   |
| `-l, --flat`   | `boolean`| Generate a single flattened interface instead of nested interfaces        | `false`        |
| `-e, --export` | `string` | Export type: `a`=all, `r`=root, or `n`=none                        | `r` (root only) |

### Examples 📝

#### Basic file conversion

```bash
json2ts -f input.json -o types.ts -n ApiResponse
```

#### Direct text conversion

```bash
# Linux/Mac
json2ts -t '{"user": {"name": "John Doe"}}' -n User

# Windows
json2ts -t "{\"user\": {\"name\": \"John Doe\"}}" -n User
```

#### Generate flattened interface

```bash
json2ts -f complex.json -o flat-types.ts -n ComplexData --flat
```

#### Export all interfaces

```bash
json2ts -f input.json -o types.ts -n ApiResponse --export all
```

#### No exports (all interfaces internal)

```bash
json2ts -f input.json -o types.ts -n ApiResponse --export none
```

#### Pipeline with curl (fetch JSON from API)

```bash
# Convert API response directly to TypeScript types
curl -s https://api.example.com/users | json2ts -t - -n UserResponse -o user-types.ts
```

#### Processing multiple files with a script

```bash
# Create a script to process multiple JSON files
for file in data/*.json; do
  basename=$(basename "$file" .json)
  json2ts -f "$file" -o "types/${basename}.ts" -n "${basename^}Data"
done
```

### Advanced Usage Tips 💡

- **Input from stdin**: Use `-` as the file path to read from standard input
- **Version information**: Use `--version` to check the current version
- **Detailed help**: Use `--help` to see all available options with descriptions

### Help ❓

For more information about available options, use:

```bash
json2ts --help
```

## Programmatic API 📚

```bash
npm install @junaidatari/json2ts   # for NPM
pnpm install @junaidatari/json2ts  # for PNPM
yarn add @junaidatari/json2ts      # for Yarn
```

## Usage 🚀

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
export interface Address {
  street: string;
  city: string;
}

export interface User {
  name: string;
  age: number;
  address: Address;
}

export interface Person {
  user: User;
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

// Working with arrays and unions
const unionExample = {
  items: [
    { type: 'text', value: 'Hello' },
    { type: 'number', value: 42 },
    { type: 'boolean', value: true }
  ]
};

const unionTypes = JsonToTsConverter.convert(unionExample, 'UnionContainer', 'all');
console.log(unionTypes);
/*
export interface TextItem {
  type: string;
  value: string;
}

export interface NumberItem {
  type: string;
  value: number;
}

export interface BooleanItem {
  type: string;
  value: boolean;
}

export interface UnionContainer {
  items: (TextItem | NumberItem | BooleanItem)[];
}
*/
```

## API Reference 📖

### `JsonToTsConverter.convert(json, rootInterfaceName, exportType)`

### `JsonToFlattenedTsConverter.convert(json, rootInterfaceName, exportType)`

Converts a JSON object into TypeScript interfaces.

**Parameters:**

  - `json`: The JSON object or JSON string to convert
  - `rootInterfaceName`: Name for the root interface (optional, default: `'RootObject'`)
  - `exportType`: Export mode (`'all'`, `'root'`, or `'none'`) (optional, default: `'all'`)

**Returns:** A string containing the generated TypeScript interfaces

**Notes:**
- The `json` parameter can be either a parsed JSON object or a JSON string
- Export modes:
  - `'all'`: All interfaces are exported
  - `'root'`: Only the root interface is exported, others are internal
  - `'none'`: No interfaces are exported (all are internal)

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
```

## License 📄

This project is licensed under the ISC License.

## Support 💬

If you encounter any issues or have questions, please:

  - Search existing [GitHub Issues](https://github.com/blacksmoke26/json2ts/issues)
  - Create a [new issue](https://github.com/blacksmoke26/json2ts/issues/new) with detailed information

## Acknowledgments 🙏

  - This project was originally developed as part of [Posquelize](https://github.com/blacksmoke26/posquelize).
  - Special thanks to all contributors who helped improve this tool.
  - Inspired by the need for better type safety in JSON-heavy applications.

## Copyright ©️

Developed with ❤️ by Junaid Atari
