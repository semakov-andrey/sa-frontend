import {
  getCSSDeclarationName,
  getCSSDeclarationContent,
  writeCSSDeclarationFile
} from '../utilities/generateCSSDeclarations.utility.js';

/* eslint-disable import/no-default-export */
export default async function loader(code) {
  const filePath = `${ this.resourcePath }.d.ts`;
  const styleName = getCSSDeclarationName(this.resourcePath);
  const content = await getCSSDeclarationContent(this.resourcePath, styleName);

  writeCSSDeclarationFile(filePath, content); // Async function without waiting here

  return code
    .replace(
      /export default (\{[\S\s]*\});/u,
      `var code=$1;export const css = code;export const ${ styleName } = code;`
    );
};
