module.exports = {
  overrides: [
    {
      files: [ '*.ts', '*.tsx' ],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        'rulesdir/progress': 'error'
      }
    }
  ]
};