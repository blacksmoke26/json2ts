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

## CLI Usage 💻

The package includes a command-line interface (CLI) for quick conversions without writing code.

### Installation 📦

```bash
npm install -g @junaidatari/json2ts   # for NPM
pnpm install -g @junaidatari/json2ts  # for PNPM
yarn global add @junaidatari/json2ts  # for Yarn
```

### Command Options ⚙️

| Option   | Alias | Type     | Description                                                               | Default        |
|----------|-------|----------|---------------------------------------------------------------------------|----------------|
| `--file` | `-f`  | `string` | Path to the JSON file to be converted to TypeScript interfaces            | Required (unless `--text` is used) |
| `--text` | `-t`  | `string` | Raw JSON string to be converted to TypeScript interfaces                 | Required (unless `--file` is used) |
| `--output`| `-o`  | `string` | Path where the generated TypeScript interface file will be saved          | `./output.ts`  |
| `--name` | `-n`  | `string` | Name for the root TypeScript interface                                    | `RootObject`   |
| `--flat` | `-l`  | `boolean` | Generate a single flattened interface instead of nested interfaces        | `false`        |

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

// Convert to multiple interfaces
const interfaces = JsonToTsConverter.convert(json, 'Person');
console.log('Generated interfaces:');
console.log(interfaces);
/* Output:
export interface Address {
  street: string;
  city: string;
}

interface User {
  name: string;
  age: number;
  address: Address;
}

interface Person {
  user: User;
}
*/

// Convert to flattened interface
const interfaceFlat = JsonToFlattenedTsConverter.convert(jsonText, 'PersonFlat');
console.log('\nGenerated flattened interface:');
console.log(interfaceFlat);
/* Output:
export interface Person {
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
```

## API Reference 📖

### `JsonToTsConverter.convert(json, rootInterfaceName)`

### `JsonToFlattenedTsConverter.convert(json, rootInterfaceName)`

Converts a JSON object into TypeScript interfaces.

**Parameters:**

  - `json`: The JSON object to convert
  - `rootInterfaceName`: Name for the root interface

**Returns:** A string containing the generated TypeScript interfaces

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