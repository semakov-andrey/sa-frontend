## @sa-frontend/typing

### Подключение typescript конфига

Файл `tsconfig.json`

```json
"extends": "./node_modules/@sa-frontend/typing/tsconfig.json",
"include": [
  "./node_modules/@sa-frontend/application/types",
  "./node_modules/@sa-frontend/presentation/common/types"
]
```