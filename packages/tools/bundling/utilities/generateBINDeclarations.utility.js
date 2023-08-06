import fs from 'fs/promises';
import path from 'path';

import { camelCase } from './camelCase.utility.js';
import { capitalize } from './capitalize.utility.js';

export const BIN_EXTENSION = '.bin';

export const getBINDeclarationName = (item) =>
  `Bin${ capitalize(camelCase(path.basename(item, BIN_EXTENSION))) }`;

export const getBINDeclarationContent = (binaryName) =>
  `export const ${ binaryName }: { type: 'buffer', data: Array<number> };\n`;

export const writeBINDeclarationFile = async (filePath, content) => {
  try {
    const previousContent = await fs.readFile(filePath);
    if (String(previousContent) === content) return;
  } catch {}

  await fs.writeFile(filePath, content);
};

export const generateFolderBINDeclarations = async (folder) => {
  const items = await fs.readdir(folder);

  for await (const item of items) {
    const fullItem = `${ folder }/${ item }`;
    const stat = await fs.lstat(fullItem);

    if (stat.isDirectory()) await generateFolderBINDeclarations(fullItem);

    if (stat.isFile() && fullItem.endsWith(BIN_EXTENSION)) {
      const filePath = `${ fullItem }.d.ts`;
      const binaryName = getBINDeclarationName(item);
      const content = getBINDeclarationContent(binaryName);
      await writeBINDeclarationFile(filePath, content);
    }
  }
};

export const generateBINDeclarations = async (folders) => {
  for await (const folder of folders) {
    await generateFolderBINDeclarations(folder);
  }

  console.info('BIN declarations was generated');
};
