const config = require('./packages.structure.config.cjs');

module.exports = {
  overrides: [
    {
      files: [ 'src/**/*.ts', 'src/**/*.tsx' ],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: config.overrides[0].rules
    }
  ]
};
