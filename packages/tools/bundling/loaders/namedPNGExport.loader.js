import {
  getPNGDeclarationName,
  getPNGDeclarationContent,
  writePNGDeclarationFile
} from '../utilities/generatePNGDeclarations.utility.js';

export default function loader(code) {
  const filePath = `${ this.resourcePath }.d.ts`;
  const imageName = getPNGDeclarationName(this.resourcePath);
  const content = getPNGDeclarationContent(imageName);

  writePNGDeclarationFile(filePath, content); // Async function without waiting here

  return code.replace('export default __webpack_public_path__ + "', `export const ${ imageName } = __webpack_public_path__ + "`);
};

