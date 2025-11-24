/**
 * @fileoverview This module provides the main converter classes for transforming JSON data into TypeScript interfaces.
 * It includes both standard and flattened interface generation capabilities, along with utility functions
 * and type definitions for the conversion process.
 *
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 *
 * @module JsonConverters
 */

// classes
import JsonToTsConverter from '~/classes/JsonToTsConverter';
import JsonToFlattenedTsConverter from '~/classes/JsonToFlattenedTsConverter';

// utils
import ConverterUtils from '~/utils/ConverterUtils';

export type { ExportType, ConvertOptions } from '~/base/ConverterBase';

export { JsonToFlattenedTsConverter, JsonToTsConverter, ConverterUtils };
