import fs from 'fs/promises';
import path from 'path';

import { camelCase } from './camelCase.utility.js';
import { capitalize } from './capitalize.utility.js';

export const SVG_EXTENSION = '.asset.svg';

export const getSVGDeclarationName = (item) =>
  `Svg${ capitalize(camelCase(path.basename(item, SVG_EXTENSION))) }`;

export const getSVGDeclarationContent = (iconName) =>
  `export const ${ iconName }: React.ComponentType<SvgIconProps>;\n`;

export const writeSVGDeclarationFile = async (filePath, content) => {
  try {
    const previousContent = await fs.readFile(filePath);
    if (String(previousContent) === content) return;
  } catch {}

  await fs.writeFile(filePath, content);
};

export const generateSVGDeclarations = async (folder, isInitial = true) => {
  const items = await fs.readdir(folder);

  for await (const item of items) {
    const fullItem = `${ folder }/${ item }`;
    const stat = await fs.lstat(fullItem);

    if (stat.isDirectory()) await generateSVGDeclarations(fullItem, false);

    if (stat.isFile() && fullItem.endsWith(SVG_EXTENSION)) {
      const filePath = `${ fullItem }.d.ts`;
      const iconName = getSVGDeclarationName(item);
      const content = getSVGDeclarationContent(iconName);
      await writeSVGDeclarationFile(filePath, content);
    }
  }

  if (isInitial) console.info('SVG declarations was generated');
};
