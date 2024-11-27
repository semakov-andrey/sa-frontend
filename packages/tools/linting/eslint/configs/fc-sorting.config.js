import { eslintPluginSaRules } from '../rules/index.js';

export const config = (options) => [ {
  files: [ 'src/**/*.ts', 'src/**/*.tsx' ],
  plugins: {
    saRules: eslintPluginSaRules
  },
  rules: {
    'saRules/fc-sorting': [ 'error', options ]
  }
} ];
