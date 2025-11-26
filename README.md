# JSON to TypeScript Interface Converter 

A powerful tool that automatically generates TypeScript interfaces
from JSON objects, making type-safe development easier and more efficient.

## Features ✨

- 🔧 Convert JSON to TypeScript interfaces with ease
- 📦 Generate separate interfaces for nested objects
- 🔢 Intelligent type inference for Numbers, Strings, Booleans, and null values
- 📋 Create type definitions for arrays, objects and primitive types
- 🔄 Transform nested/complex JSON into flattened interface via `--flat` flag
- ✏️ Specify custom names for root interfaces
- 🗂️ Preserve original JSON structure in generated interfaces
- 🌐 Export options for generated interfaces (`all`, `root`, `none`)
- 📊 Handle complex nested structures with arrays of objects
- 🚀 Fast and lightweight CLI for quick conversions
- 📝 Support for both file and direct text input
- 🔌 Read JSON output directly from the *stdin* for pipeline operations
- ✏️ Added property name suggestion and correction logic based on strict TypeScript identifier rules
- 🔄 Automatically detects and resolves circular references in JSON structures to prevent infinite recursion
- 🛡️ Generate strict TypeScript types with exact property matching when enabled via `--strict` flag
- 🔒 Read-only Properties: Generate immutable interfaces with `readonly` modifier
- ❓ Optional Properties: Generate interfaces with all properties marked optional (`?`)
- 🐪 **Property Case Transformation**: Convert property names to various case formats:
  - `c` - camelCase (`userName`)
  - `l` - lower_snake_case (`user_name`)
  - `o` - preserve original *(default)*
  - `p` - PascalCase (`UserName`)
  - `u` - UPPER_SNAKE_CASE (`USER_NAME`)
  - `k` - kebab-case (`user-name`)
- 📐 **Smart Array Type Detection**: Automatically infers array types including:
  - Primitive arrays (e.g., `string[]`, `number[]`)
  - Mixed-type tuples (e.g., `[string, number, boolean]`)
  - Object arrays (e.g., `User[]`)
  - Nested arrays with proper type preservation
- 🗺️ **Custom Type Mapping**: Override default type detection with custom mappings:
  - Map specific JSON properties to custom TypeScript types
  - Useful for integrating with existing type definitions
  - Example: Map `"user_id"` to `UserID` type
  - Configure via `typeMap` option in API or CLI

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

| Option                  | Type     | Description                              | Default        |
|-------------------------|----------|------------------------------------------|----------------|
| `-f, --file`            | `string` | Path to JSON file to convert             | Required*      |
| `-t, --text`            | `string` | Raw JSON string to convert               | Required*      |
| `-o, --output`          | `string` | Output file path                         | Prints to console |
| `-n, --name`            | `string` | Root interface name                      | `RootObject`   |
| `-l, --flat`            | `boolean`| Generate flattened interface             | -              |
| `-e, --export`          | `string` | Export type: `a`=all, `r`=root, `n`=none | `r` *(root)* |
| `--pc, --property-case` | `string` | Property case transformation: `c`=camelCase, `l`=lower_snake, `o`=original, `p`=PascalCase, `u`=UPPER_SNAKE, `k`=kebab-case | `o` *(original)* |
| `-s, --strict`          | `boolean`| Generate strict TypeScript types with exact property matching | - |
| `-r, --readonly`        | `boolean`| Make all generated properties readonly | - |
| `--op, --optional`      | `boolean`| Make all generated properties optional | - |

Either `--file` or `--text` must be provided or pipe through to read directly from the stdin.

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

#### Readonly properties

```bash
# Generate with readonly properties
json2ts -f input.json -o readonly-types.ts -n Data --readonly

# Combine with strict mode
json2ts -f input.json -o strict-readonly.ts -n Data --strict --readonly
```

#### Optional properties

```bash
# Generate with optional properties
json2ts -f input.json -o optional-types.ts -n Data --op

# Combine with readonly mode
json2ts -f input.json -o readonly-optional.ts -n Data --readonly --optional
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

#### Property case transformation

```bash
# Convert to camelCase properties
json2ts -f input.json -o camel-types.ts --pc c

# Convert to PascalCase properties
json2ts -f input.json -o pascal-types.ts --property-case p

# Convert to kebab-case properties
json2ts -f input.json -o kebab-types.ts --property-case k
```

#### Strict mode generation

```bash
# Generate with strict type checking
json2ts -f input.json -o strict-types.ts -n Data --strict
```

#### Combined options

```bash
# Multiple options together
json2ts -f input.json -o output.ts -n ApiResponse -e all --property-case c --strict

# Flattened with property transformation
json2ts -f data.json -o flat.ts -n FlatData --flat --property-case l
```

#### Root-only export

```bash
# Export only root interface (default)
json2ts -f input.json -o types.ts -n Response
# or explicitly
json2ts -f input.json -o types.ts -n Response -e r
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

#### Real-world API integration

```bash
# GitHub API: Get repository information
curl -s https://api.github.com/repos/torvalds/linux | \
  json2ts -n GithubRepo -o repo-types.ts --property-case c

# Reddit API: Fetch subreddit posts
curl -s -H "User-Agent: json2ts" \
  "https://www.reddit.com/r/typescript/top.json?limit=10" | \
  json2ts -n RedditPost -o reddit-types.ts --export all

# GraphQL API query with curl
curl -s -X POST https://api.spacex.land/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ launches { id name rocket { name } } }"}' | \
  jq -r '.data.launches[0]' | \
  json2ts -n SpaceXLaunch -o spacex-types.ts --property-case p
```

#### Database schema introspection

```bash
# PostgreSQL schema extraction
psql -d myapp -c "
  SELECT json_agg(t) FROM (
    SELECT 
      table_name,
      array_agg(column_name::text) as columns,
      array_agg(data_type::text) as types
    FROM information_schema.columns 
    WHERE table_schema = 'public'
    GROUP BY table_name
  ) t
" | json2ts -n DBSchema -o db-schema.ts --readonly

# MongoDB collection structure analysis
mongo myapp --eval "
  db.users.findOne().forEach(printjson)
" | json2ts -n MongoUser -o mongo-types.ts --strict

# Prisma schema introspection
npx prisma introspect --print | \
  grep -o '"model"[^}]*}' | \
  json2ts -n PrismaModel -o prisma-types.ts --export all
```

#### Configuration management

```bash
# Kubernetes deployment analysis
kubectl get deployment myapp -o json | \
  json2ts -n K8sDeployment -o k8s-types.ts --readonly

# Docker compose configuration
docker compose config --format json | \
  json2ts -n DockerCompose -o compose-types.ts --property-case l

# Terraform state parsing
terraform show -json | \
  jq '.values.root_module.resources[] | select(.type == "aws_instance")' | \
  json2ts -n TFInstance -o terraform-types.ts --strict
```

#### Testing and validation

```bash
# Generate test types from JSON schema
jsonschema2jsonpointer schema.json | \
  jq -r '.[] | .pointer' | \
  xargs -I {} json2ts -f schema.json -n TestSchema --strict

# Validate API responses against types
for endpoint in users posts comments; do
  curl -s "https://api.example.com/$endpoint" | \
    json2ts -n "${endpoint^}Response" -o "test/types/${endpoint}.ts"
done

# Generate mock data types
jq -n '{
  users: [range(10) | {
    id: .,
    name: "User\(.)",
    email: "user\(.)@example.com",
    roles: ["user", (\. % 3 == 0 and "admin" or empty)]
  }]
}' | json2ts -n MockUsers -o mock-types.ts --export all
```

#### Advanced pipeline operations

```bash
# Multi-stage transformation
curl -s https://api.exchangerate-api.com/v4/latest/USD | \
  jq '{rates: .rates | to_entries | map({key: .key, value: .value})}' | \
  json2ts -n ExchangeRate -o rates.ts --property-case c | \
  npx prettier --parser typescript > src/types/rates.ts

# Parallel processing
echo 'users posts comments products' | \
  tr ' ' '\n' | \
  xargs -P 4 -I {} bash -c "
    curl -s \"https://api.example.com/{}\" | \
      json2ts -n \"\$(echo {} | sed 's/.*/\u&/')\" -o \"types/{}.ts\"
  "

# Conditional type generation
json2ts -f data.json -o temp.ts -n Data && \
if grep -q 'interface.*{' temp.ts; then
  echo "Generated interface:"
  cat temp.ts
else
  echo "No interfaces generated"
fi
rm temp.ts
```

#### Enterprise workflows

```bash
# Service mesh configuration
istioctl proxy-config routes deployment/reviews.default -o json | \
  jq '.httpRoutes[0].route[0].match' | \
  json2ts -n IstioRoute -o istio-types.ts --readonly

# OpenAPI schema conversion
curl -s https://petstore.swagger.io/v2/swagger.json | \
  jq '.definitions' | \
  json2ts -n PetStore -o api-types.ts --export all

# Microservice contract generation
for service in auth payment notification; do
  curl -s "https://contract-registry.internal/api/v1/contracts/$service" | \
    jq '.schema' | \
    json2ts -n "${service^}Contract" -o "src/contracts/${service}.ts" --strict
done

# CloudFormation template parsing
aws cloudformation get-template --stack-name my-stack | \
  jq -r '.TemplateBody' | \
  json2ts -n CFTemplate -o cf-types.ts --property-case k
```

#### CI/CD integration

```bash
# GitHub Actions workflow validation
find .github/workflows -name '*.yml' -exec \
  yq eval -o json {} \; | \
  json2ts -n GitHubAction -o action-types.ts

# Azure DevOps pipeline analysis
az pipelines show --id $(az pipelines list --query [0].id -o tsv) | \
  jq '.process' | \
  json2ts -n AzPipeline -o pipeline-types.ts

# Dockerfile instruction parsing
docker inspect $(docker build -q .) | \
  jq -r '.[0].Config.Labels' | \
  json2ts -n DockerLabels -o labels.ts --readonly
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
  JsonToFlattenedTsConverter, 
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
- `name`: Root interface name *(default: `'RootObject'`)*
- `export`: Export mode (`'all'`, `'root'`, `'none'`) *(default: `'root'`)*
- `options`: Configuration options for conversion *(optional)*
  - `arrayMaxTupleSize`: Maximum number of items to convert to tuple type 
    (default: `10`)
  - `arrayMinTupleSize`: Minimum number of items required to create a tuple type 
    (default: `2`)
  - `strict`: Enable strict type checking for better type inference 
    (default: `false`)
  - `typeMap`: Custom type mapping for specific JSON structures 
    (default: `{}`)
  - `propertyCase`: Naming convention for generated property names 
    (default: `'original'`)
  - `readonlyProperties`: Make all generated properties readonly 
    (default: `false`)
  - `optionalProperties`: Make all generated properties optional 
    (default: `false`)

**Returns:** Generated TypeScript interfaces string

## Contributing 🤝

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Setup 🔧

```bash
git clone https://github.com/blacksmoke26/json2ts.git
cd json2ts
npm install
npm run dev
npm run dev:flat
```

### Testing CLI with `/samples/*.json` JSON files
```bash
npm run build
node .\bin\json2ts -f .\samples\jsons\sample.json -n Sample1
node .\bin\json2ts -f .\samples\jsons\sample2.json -n Sample2 -o sample2.ts --flat
```

### Running test cases
```bash
npm run test
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
