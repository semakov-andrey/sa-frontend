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
      'saRules/fc-sorting': 'error',
      'saRules/progress': 'error'
    }
  },
  {
    files: [ 'src/**/*.ts', 'src/**/*.tsx' ],
    plugins: {
      saRules: eslintPluginSaRules
    },
    rules: {
      'saRules/structure': 'warn'
    }
  }
].map((config) => ({ ...config, ignores }));

export default config;
