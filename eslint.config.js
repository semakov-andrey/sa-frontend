import { config as main } from './packages/tools/linting/eslint/configs/main.config.js';
import { eslintPluginSaRules } from './packages/tools/linting/eslint/rules/index.js';

export const ignores = [
  'tmp/**/*'
];

export const config = [
  ...main,
  {
    plugins: {
      saRules: eslintPluginSaRules
    },
    rules: {
      'saRules/progress': 'error'
    }
  }
].map((config) => ({ ...config, ignores }));

export default config;
