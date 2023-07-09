import fs from 'fs/promises';
import path from 'path';

import postcss from 'postcss';
import modules from 'postcss-modules';
import nested from 'postcss-nested';

import { camelCase } from './camelCase.utility.js';
import { capitalize } from './capitalize.utility.js';

export const CSS_EXTENSION = '.styles.css';

export const getCSSDeclarationName = (item) =>
  `css${ capitalize(camelCase(path.basename(item, CSS_EXTENSION))) }`;

export const getCSSDeclarationContent = async (from, styleName) => {
  let tokens = [];

  try {
    const data = await fs.readFile(from, 'utf-8');
    const result = await postcss([
      nested(),
      modules({ localsConvention: 'camelCaseOnly', getJSON: () => undefined })
    ]).process(String(data), { from });
    tokens = Object.keys(result.messages[0].exportTokens);
  } catch (e) {
    console.error(e);

    return console.error('\x1b[31m%s\x1b[0m', `CSS syntax error: ${ from }`);
  }

  if (tokens.length === 0) return '';

  const interfaces = tokens.sort().map((key) => `  ${ key }: string;`).join('\n');

  return `interface CSS {\n${ interfaces }\n}\n\nexport const css: CSS;\n\nexport const ${ styleName }: CSS;\n`;
};

export const writeCSSDeclarationFile = async (filePath, content) => {
  try {
    const previousContent = await fs.readFile(filePath);
    if (String(previousContent) === content) return;
  } catch {}

  await fs.writeFile(filePath, content);
};

export const generateFolderCSSDeclarations = async (folder) => {
  const items = await fs.readdir(folder);

  for await (const item of items) {
    const fullItem = `${ folder }/${ item }`;
    const stat = await fs.lstat(fullItem);

    if (stat.isDirectory()) await generateFolderCSSDeclarations(fullItem);

    if (stat.isFile() && fullItem.endsWith(CSS_EXTENSION)) {
      const filePath = `${ fullItem }.d.ts`;
      const styleName = getCSSDeclarationName(item);
      const content = await getCSSDeclarationContent(fullItem, styleName);
      await writeCSSDeclarationFile(filePath, content);
    }
  }
};

export const generateCSSDeclarations = async (folders) => {
  for await (const folder of folders) {
    await generateFolderCSSDeclarations(folder);
  }

  console.info('CSS declarations was generated');
};
