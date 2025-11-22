# Changelog

## V0.0.2 - 2025-11-22

- Added export type support for generated interfaces
- New `--export` option to control interface exports ('all', 'root', or 'none')
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