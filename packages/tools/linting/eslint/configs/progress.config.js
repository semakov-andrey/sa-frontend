import { eslintPluginSaRules } from '../rules/index.js';

export const config = (ignores) => [ {
  plugins: {
    saRules: eslintPluginSaRules
  },
  rules: {
    'saRules/progress': [ 'warn', ignores ]
  }
} ];
