# Changelog

## V0.0.4 - 2025-XX-XX

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