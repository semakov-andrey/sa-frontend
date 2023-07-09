import {
  getSVGDeclarationName,
  getSVGDeclarationContent,
  writeSVGDeclarationFile
} from '../utilities/generateSVGDeclarations.utility.js';

/* eslint-disable import/no-default-export */
export default function loader(code) {
  const filePath = `${ this.resourcePath }.d.ts`;
  const iconName = getSVGDeclarationName(this.resourcePath);
  const content = getSVGDeclarationContent(iconName);

  writeSVGDeclarationFile(filePath, content); // Async function without waiting here

  return code.replace('export default', `export const ${ iconName } =`);
};

