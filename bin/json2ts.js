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
 * @type {import('yargs').Argv}
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
  .option('export', {
    description: 'Export type for generated interfaces: "all" (default), "root", or "none"',
    type: 'string',
    choices: ['a', 'r', 'n'],
    alias: 'e',
  })
   .option('flat', {
     description: 'Generate a single flattened interface instead of nested interfaces',
     type: 'boolean',
     alias: 'l',
   })
   .default({
     flat: false,
     file: null,
     text: null,
     name: 'RootObject',
     export: 'r',
     output: null,
   })
   .showHelpOnFail(true, 'Use --help for usage')
   .help()
   .parse();

/**
 * Prints the ASCII art header to the console
 * @param {...any} l - Additional lines to print after the header
 */
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
 * Converts export type character to full string representation
 * @param {string} type - The export type character ('a', 'r', or 'n')
 * @returns {'all' | 'root' | 'none'} The full export type string
 */
function toExportType (type) {
  switch (type) {
    case 'a':
      return 'all';
    case 'r':
      return 'root';
    default:
      return 'none';
  }
}

/**
 * Reads input from stdin if available
 * @returns {Promise<string|null>} - Promise that resolves with the stdin data or null
 */
async function readStdin() {
  if (process.stdin.isTTY) {
    return null;
  }

  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      resolve(data);
    });
    process.stdin.on('error', reject);
  });
}

/**
 * Main execution function
 * Handles command-line arguments, processes JSON input, and generates TypeScript interfaces
 */
(async function() {
  printHeader();

  const dir = path.resolve(process.cwd());
  const flat = argv.flat;

  let jsonData;
  try {
    if (argv.file) {
      jsonData = fs.readFileSync(argv.file, { encoding: 'utf-8' });
    } else if (argv.text) {
      jsonData = argv.text;
    } else {
      // Try to read from stdin if no file or text is provided
      jsonData = await readStdin();
    }

    if (!jsonData) {
      console.error('Missing required arguments. Use --help for usage information.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error parsing JSON:', error.message);
    process.exitCode = 1;
    return;
  }

  const converter = flat ? JsonToFlattenedTsConverter : JsonToTsConverter;
  const typescriptCode = converter.convert(jsonData, argv.name || 'RootObject', toExportType(argv['export'])) + `\n`;

  if (argv['output']) {
    const outputFile = argv.output || path.join(dir, 'output.ts');

    try {
      fs.writeFileSync(outputFile, typescriptCode);
      console.log(`Successfully wrote TypeScript definitions to: ${outputFile}`);
    } catch (error) {
      console.error('Error writing output file:', error.message);
      process.exitCode = 1;
    }
  } else {
    console.log(typescriptCode);
  }
})().catch((err) => {
  console.error(err.stack || err.message || err);
  process.exitCode = 1;
});
