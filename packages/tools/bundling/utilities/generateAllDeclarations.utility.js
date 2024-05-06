import { generateBINDeclarations } from './generateBINDeclarations.utility.js';
import { generateCSSDeclarations } from './generateCSSDeclarations.utility.js';
import { generatePNGDeclarations } from './generatePNGDeclarations.utility.js';
import { generateSVGDeclarations } from './generateSVGDeclarations.utility.js';

export const generateAllDeclarations = async (folders) => {
  await generateSVGDeclarations(folders);
  await generateCSSDeclarations(folders);
  await generatePNGDeclarations(folders);
  await generateBINDeclarations(folders);
};
