## Пакеты в репозитории

- @sa-frontend/application
- @sa-frontend/presentation
- @sa-frontend/bundling
- @sa-frontend/linting
- @sa-frontend/testing

## Настройка tsconfig:
```
"include": [
  "./node_modules/@sa-frontend/application/types",
  "./node_modules/@sa-frontend/presentation/common/types"
]
```

## Настройка eslint:
```
module.exports = {
  extends: [
    './node_modules/@sa-frontend/linting/eslint/configs/main.config.cjs',
    './node_modules/@sa-frontend/linting/eslint/configs/progress.config.cjs',
    './node_modules/@sa-frontend/linting/eslint/configs/structure.config.cjs'
  ]
};
```

## Настройка stylelint:
```
module.exports = {
  extends: [
    './node_modules/@sa-frontend/linting/stylelint/main.config.cjs',
    './node_modules/@sa-frontend/linting/stylelint/order.config.cjs'
  ]
};
```

## Настройка jest:
```
import { jestConfig } from '@sa-frontend/testing/configs/jest.config.js';

export default { ...jestConfig };
```
