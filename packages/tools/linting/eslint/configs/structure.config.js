import { eslintPluginSaRules } from '../rules/index.js';

export const config = [ {
  files: [ 'src/**/*.ts', 'src/**/*.tsx' ],
  plugins: {
    saRules: eslintPluginSaRules
  },
  rules: {
    'saRules/structure': 'warn'
  }
} ];
