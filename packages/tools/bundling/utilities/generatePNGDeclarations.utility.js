import fs from 'fs/promises';
import path from 'path';

import { camelCase } from './camelCase.utility.js';
import { capitalize } from './capitalize.utility.js';

export const PNG_EXTENSION = '.asset.png';

export const getPNGDeclarationName = (item) =>
  `Png${ capitalize(camelCase(path.basename(item, PNG_EXTENSION))) }`;

export const getPNGDeclarationContent = (imageName) =>
  `export const ${ imageName }: string;\n`;

export const writePNGDeclarationFile = async (filePath, content) => {
  try {
    const previousContent = await fs.readFile(filePath);
    if (String(previousContent) === content) return;
  } catch {}

  await fs.writeFile(filePath, content);
};

export const generateFolderPNGDeclarations = async (folder) => {
  const items = await fs.readdir(folder);

  for await (const item of items) {
    const fullItem = `${ folder }/${ item }`;
    const stat = await fs.lstat(fullItem);

    if (stat.isDirectory()) await generateFolderPNGDeclarations(fullItem);

    if (stat.isFile() && fullItem.endsWith(PNG_EXTENSION)) {
      const filePath = `${ fullItem }.d.ts`;
      const imageName = getPNGDeclarationName(item);
      const content = getPNGDeclarationContent(imageName);
      await writePNGDeclarationFile(filePath, content);
    }
  }
};

export const generatePNGDeclarations = async (folders) => {
  for await (const folder of folders) {
    await generateFolderPNGDeclarations(folder);
  }

  console.info('PNG declarations was generated');
};
