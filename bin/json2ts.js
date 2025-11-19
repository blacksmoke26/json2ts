#!/usr/bin/env node

/**
 * CLI interface for the JSON to TypeScript Converter.
 *
 * This script provides a command-line interface for generating TypeScript interfaces
 * from JSON data. It supports various configuration options for customizing the generation process.
 */

const path = require('node:path');
const fs = require('node:fs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

// classes
const { JsonToTsConverter, JsonToFlattenedTsConverter } = require('../index.js');

/**
 * Command line arguments configuration using yargs
 */
 const argv = yargs(hideBin(process.argv))
   .parserConfiguration({
     'parse-numbers': false,
   })
   .version('0.0.1')
   .usage('Usage: json2ts -f input.json -o output.ts')
   .option('file', {
     description: 'Path to the JSON file to be converted to TypeScript interfaces',
     type: 'string',
     alias: 'f',
   })
   .option('text', {
     description: 'Raw JSON string to be converted to TypeScript interfaces',
     type: 'string',
     alias: 't',
   })
   .option('output', {
     description: 'Path where the generated TypeScript interface file will be saved',
     type: 'string',
     alias: 'o',
   })
   .option('name', {
     description: 'Name for the root TypeScript interface (default: RootObject)',
     type: 'string',
     alias: 'n',
   })
   .option('flat', {
     description: 'Generate a single flattened interface instead of nested interfaces',
     type: 'boolean',
     alias: 'l',
   })
   .default({
     flat: false,
     name: 'RootObject',
   })
   .showHelpOnFail(true, 'Use --help for usage')
   .showHelp(printHeader)
   .help()
   .parse();

function printHeader (...l) {
  console.log(`       █████                              ████████  ███████████
      ░░███                              ███░░░░███░█░░░███░░░█
       ░███   █████   ██████  ████████  ░░░    ░███░   ░███  ░   █████
       ░███  ███░░   ███░░███░░███░░███    ███████     ░███     ███░░
       ░███ ░░█████ ░███ ░███ ░███ ░███   ███░░░░      ░███    ░░█████
 ███   ░███  ░░░░███░███ ░███ ░███ ░███  ███      █    ░███     ░░░░███
░░████████   ██████ ░░██████  ████ █████░██████████    █████    ██████
 ░░░░░░░░   ░░░░░░   ░░░░░░  ░░░░ ░░░░░ ░░░░░░░░░░    ░░░░░    ░░░░░░  \n`);

  console.log(...l);
}

/**
 * Main execution function
 */
(async function() {
  if (!argv._.length) return;

  printHeader();

  const dir = path.resolve(process.cwd());
  const outputFile = argv.output || path.join(dir, 'output.ts');
  const flat = argv.flat;

  let jsonData;
  try {
    if (argv.file) {
      const content = fs.readFileSync(argv.file, { encoding: 'utf-8' });
      jsonData = JSON.parse(content);
    } else {
      jsonData = JSON.parse(argv.text);
    }
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    process.exitCode = 1;
    return;
  }

  const converter = flat ? JsonToFlattenedTsConverter : JsonToTsConverter;
  const typescriptCode = 'export ' + converter.convert(jsonData, argv.name || 'RootObject') + `\n`;

  try {
    fs.writeFileSync(outputFile, typescriptCode);
    console.log(`Successfully wrote TypeScript definitions to: ${outputFile}`);
  } catch (error) {
    console.error('Error writing output file:', error.message);
    process.exitCode = 1;
  }
})().catch((err) => {
  console.error(err.stack || err.message || err);
  process.exitCode = 1;
});
