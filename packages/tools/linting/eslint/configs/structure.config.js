import { eslintPluginSaRules } from '../rules/index.js';

export const plugins = {
  saRules: eslintPluginSaRules
};

export const rules = {
  'saRules/structure': 'warn'
};

export const config = [ {
  files: [ 'src/**/*.ts', 'src/**/*.tsx' ],
  plugins,
  rules
} ];

// module.exports = {
//   overrides: [
//     {
//       files: [ '*.ts', '*.tsx' ],
//       parserOptions: {
//         project: [ './packages/*/tsconfig.json' ]
//       },
//       rules: {
//         'rulesdir/structure': [ 'error', {
//           rules: processDir(STRUCTURE)
//         } ]
//       }
//     }
//   ]
// };
