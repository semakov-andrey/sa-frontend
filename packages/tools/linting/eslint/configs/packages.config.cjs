module.exports = {
  overrides: [
    {
      files: [ '*.ts', '*.tsx' ],
      parserOptions: {
        project: [ './packages/*/tsconfig.json' ]
      }
    }
  ]
};
