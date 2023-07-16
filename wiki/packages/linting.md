## @sa-frontend/linting

## Подключение eslint конфига

Файл `.eslintrc.cjs`

```js
module.exports = {
  extends: [
    './node_modules/@sa-frontend/linting/eslint/configs/main.config.cjs',
    './node_modules/@sa-frontend/linting/eslint/configs/progress.config.cjs',
    './node_modules/@sa-frontend/linting/eslint/configs/structure.config.cjs'
  ]
};
```

## Подключение stylelint конфига

Файл `.stylelintrc.cjs`

```js
module.exports = {
  extends: [
    './node_modules/@sa-frontend/linting/stylelint/main.config.cjs',
    './node_modules/@sa-frontend/linting/stylelint/order.config.cjs'
  ]
};
```