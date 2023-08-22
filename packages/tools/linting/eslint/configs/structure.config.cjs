const { STRUCTURE, processDir } = require('./packages.structure.config.cjs');

module.exports = {
  overrides: [
    {
      files: [ 'src/**/*.ts', 'src/**/*.tsx' ],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        'rulesdir/structure': [ 'error', {
          rules: processDir(STRUCTURE)
        } ]
      }
    }
  ]
};
