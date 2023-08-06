import fsPromises from 'fs/promises';

import {
  getBINDeclarationName,
  getBINDeclarationContent,
  writeBINDeclarationFile
} from '../utilities/generateBINDeclarations.utility.js';

/* eslint-disable import/no-default-export */
export default async function loader() {
  const filePath = `${ this.resourcePath }.d.ts`;
  const binaryName = getBINDeclarationName(this.resourcePath);
  const content = await getBINDeclarationContent(binaryName);

  writeBINDeclarationFile(filePath, content); // Async function without waiting here

  const binary = await fsPromises.readFile(this.resourcePath);

  return `export const ${ binaryName } = ${ JSON.stringify(binary) }`;
};
