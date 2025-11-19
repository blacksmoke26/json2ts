/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 *
 * @fileoverview This script generates TypeScript models, repositories, and associated files
 * based on database schema information. It connects to a database using Knex, fetches
 * schema details, and generates corresponding TypeScript files with proper types,
 * relationships, and configurations.
 */

import fs from 'node:fs';

// classes
import { JsonToTsConverter } from '../src/index';

/**
 * Main function to orchestrate the scaffold generation process.
 * Connects to the database, fetches schema information, and generates
 * models, repositories, and configuration files.
 */
async function run(): Promise<void> {
  const json = fs.readFileSync(__dirname + '/jsons/sample2.json', { encoding: 'utf-8' });

  const output = JsonToTsConverter.convert(json, 'Person');

  console.log(output);
}

run();
