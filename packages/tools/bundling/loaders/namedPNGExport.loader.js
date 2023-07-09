import {
  getPNGDeclarationName,
  getPNGDeclarationContent,
  writePNGDeclarationFile
} from '../utilities/generatePNGDeclarations.utility.js';

/* eslint-disable import/no-default-export */
export default function loader(code) {
  const filePath = `${ this.resourcePath }.d.ts`;
  const imageName = getPNGDeclarationName(this.resourcePath);
  const content = getPNGDeclarationContent(imageName);

  writePNGDeclarationFile(filePath, content); // Async function without waiting here

  return code.replace('export default __webpack_public_path__ + "', `export const ${ imageName } = "/`);
};

