## Пакеты в репозитории

- @sa-frontend/application
- @sa-frontend/presentation
- @sa-frontend/eslint

## Настройка tsconfig:
```
"include": [
  "node_modules/@sa-frontend/application/types",
  "node_modules/@sa-frontend/presentation/common/types"
]
```

## Настройка eslint:
```
"extends": [
  "node_modules/@sa-frontend/eslint/configs/main.config.cjs",
  "node_modules/@sa-frontend/eslint/configs/progress.config.cjs",
  "node_modules/@sa-frontend/eslint/configs/structure.config.cjs"
]
```