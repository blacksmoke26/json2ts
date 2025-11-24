# Changelog

## V0.0.4 - 2025-XX-XX

- Added property name suggestion and correction logic based on strict TypeScript identifier rules
- Added comprehensive type inference with strict mode support
- Implemented circular reference detection to prevent infinite recursion
- Added custom type mapping capabilities via `typeMap` option
- Improved error handling with detailed parsing error messages
- Resolved interface name validation issues
- Fixed empty object and array type generation
- Corrected export keyword placement in generated interfaces
- Enhanced null value handling in strict mode
- Exported `ConverterUtils.detectTypeFromArray()` method for smart array type detection/conversion
- Added support for tuple type generation based on array content analysis
- Enhanced type detection for mixed primitive values and special cases (null, undefined)
- Added configuration options for array tuple size constraints (min/max)
- Improved handling of complex nested structures and edge cases
- Fix typos in documentation, version correction.

## V0.0.3 - 2025-11-22

- Added `stdbin` cli support:
```bash
# Convert API response directly to TypeScript types
curl -s https://jsonplaceholder.typicode.com/posts/1 | json2ts -n UserResponse -o user-types.ts
```

## V0.0.2 - 2025-11-22

- Added export type support for generated interfaces
- New `--export` option to control interface exports (`a`=all, `r`=root, or `n`=none)
- Updated CLI and programmatic API to support flexible export configurations

## v0.0.1 - 2025-11-19

### Initial Release
* Released first version of JSON to TypeScript CLI converter
* Added support for converting JSON files to TypeScript interfaces
* Added options for:
  - Input via file (-f) or text (-t)
  - Custom output file path (-o)
  - Interface naming (-n)
  - Flattened/mega interface generation (-l)