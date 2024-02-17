import { config as main } from './packages/tools/linting/eslint/configs/main.config.js';

export const ignores = [
  'tmp/**/*'
];

export const config = [
  ...main
].map((config) => ({ ...config, ignores }));

export default config;
