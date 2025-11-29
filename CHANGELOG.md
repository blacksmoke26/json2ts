# Changelog

### Version 0.0.4 (2025-XX-XX)

- Added readonly properties support with `readonlyProperties` option and `--readonly` flag
- Added optional properties support with `optionalProperties` option and `--optional` flag
- Enhanced property configuration options for generated interfaces
- Added property naming convention support with `propertyCase` option and `--property-case` flag
  - Supported: camelCase, snake_case, kebab-case, PascalCase, UPPER_SNAKE_CASE, original
- Added comprehensive type inference with strict mode support, adding `--strict` flag
  - Enhanced null value handling in strict mode
- Added property name suggestion and correction logic
- Added tuple types support:
  - Support for tuple type generation based on array content analysis
  - Configuration options for array tuple size constraints (min/max)
- Added types mapping support:
  - Custom type mapping capabilities via `typeMap` option
- Added gigantic JavaScript types support:
  - Enhanced type detection for mixed primitive values and special cases
  - Improved circular reference detection to prevent infinite recursion
  - Improved handling of complex nested structures and edge cases
  - Fixed empty object and array type generation
- Added export of `ConverterUtils.*()` methods
- Improved error handling with detailed parsing error messages
- Resolved interface name validation issues
- Corrected export keyword placement in generated interfaces
- Fixed typos in documentation and version correction

## Version 0.0.3 (2025-11-22)

- Added `stdbin` cli support:
```bash
# Convert API response directly to TypeScript types
curl -s https://jsonplaceholder.typicode.com/posts/1 | json2ts -n UserResponse -o user-types.ts
```

## Version 0.0.2 (2025-11-22)

- Added export type support for generated interfaces
- New `--export` option to control interface exports (`a`=all, `r`=root, or `n`=none)
- Updated CLI and programmatic API to support flexible export configurations

## Version 0.0.1 (2025-11-19)

### Initial Release
* Released first version of JSON to TypeScript CLI converter
* Added support for converting JSON files to TypeScript interfaces
* Added options for:
  - Input via file (-f) or text (-t)
  - Custom output file path (-o)
  - Interface naming (-n)
  - Flattened/mega interface generation (-l)