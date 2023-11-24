## @sa-frontend/linting

### Подключение eslint конфига

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

### Подключение stylelint конфига

Файл `.stylelintrc.cjs`

```js
module.exports = {
  extends: [
    './node_modules/@sa-frontend/linting/stylelint/main.config.cjs',
    './node_modules/@sa-frontend/linting/stylelint/order.config.cjs'
  ]
};
```

### Линтинг структуры проекта

```js
. 
├─ domain
│  ├─ contracts
│  │  ├─ {ContractA}
│  │  └─ {ContractB}
│  │     ├─ {ContractB}.constants
│  │     │  ├─ {constantX}.constant.ts
│  │     │  └─ {constantY}.constant.ts
│  │     ├─ {ContractB}.utilities.ts
│  │     │  ├─ {utilityX}.utility.ts
│  │     │  └─ {utilityY}.utility.ts
│  │     ├─ {ContractB}.constant.ts
│  │     ├─ {ContractB}.contract.ts
│  │     └─ {ContractB}.utility.ts
│  ├─ entities
│  │  ├─ {EntityA}
│  │  └─ {EntityB}
│  │     ├─ {EntityB}.constants
│  │     │  ├─ {constantX}.constant.ts
│  │     │  └─ {constantY}.constant.ts
│  │     ├─ {EntityB}.utilities.ts
│  │     │  ├─ {utilityX}.utility.ts
│  │     │  └─ {utilityY}.utility.ts
│  │     ├─ {EntityB}.constant.ts
│  │     ├─ {EntityB}.entity.ts
│  │     └─ {EntityB}.utility.ts
│  └─ useCases
├─ application
│  ├─ components
│  │  ├─ {ComponentA}
│  │  └─ {ComponentB}
│  │     └─ {ComponentB}.ts
│  ├─ contracts
│  │  ├─ {ContractA}
│  │  └─ {ContractB}
│  │     ├─ {ContractB}.constants
│  │     │  ├─ {constantX}.constant.ts
│  │     │  └─ {constantY}.constant.ts
│  │     ├─ {ContractB}.constant.ts
│  │     └─ {ContractB}.contract.ts
│  ├─ types
│  │  ├─ {TypeX}.type.ts
│  │  └─ {TypeY}.type.ts
│  └─ utilities
│     ├─ {utilityX}.utility.ts
│     └─ {utilityY}.utility.ts
├─ presentation
│  ├─ common
│  │  ├─ assets
│  │  ├─ constants
│  │  ├─ contexts
│  │  ├─ stores
│  │  ├─ stories
│  │  ├─ styles
│  │  ├─ types
│  │  ├─ tests
│  │  └─ utilities
│  ├─ main
│  │  ├─ {ComponentA}
│  │  └─ {ComponentB}
│  ├─ pages
│  │  ├─ {ComponentA}
│  │  └─ {ComponentB}
│  ├─ segments
│  │  ├─ {ComponentA}
│  │  └─ {ComponentB}
│  ├─ uiKit
│  │  ├─ {ComponentA}
│  │  └─ {ComponentB}
│  │     ├─ {ComponentB}.assets
│  │     │  ├─ {assetX}.asset.png
│  │     │  ├─ {assetY}.asset.png
│  │     │  ├─ {assetX}.asset.svg
│  │     │  ├─ {assetY}.asset.svg
│  │     │  ├─ {assetX}.asset.png.d.ts
│  │     │  ├─ {assetY}.asset.svg.d.ts
│  │     ├─ {ComponentB}.constants
│  │     │  ├─ {constantX}.constant.ts
│  │     │  └─ {constantY}.constant.ts
│  │     ├─ {ComponentB}.contexts
│  │     │  ├─ {contextX}.context
│  │     │  ├─ {contextY}.context
│  │     │  │  ├─ {contextY}.constant.ts
│  │     │  │  ├─ {contextY}.context.ts
│  │     │  │  └─ {contextY}.type.ts
│  │     │  └─ {contextZ}.context.ts
│  │     ├─ {ComponentB}.components
│  │     │  ├─ {ComponentX}
│  │     │  ├─ {ComponentY}
│  │     │  ├─ {ComponentA}{Sub}
│  │     │  └─ {ComponentB}{Sub}
│  │     ├─ {ComponentB}.hooks
│  │     │  ├─ use{HookX}
│  │     │  ├─ use{HookY}
│  │     │  │  ├─ use{HookY}.constant.ts
│  │     │  │  ├─ use{HookY}.hook.ts
│  │     │  │  └─ use{HookY}.type.ts
│  │     │  └─ use{HookZ}.ts
│  │     ├─ {ComponentB}.stores
│  │     │  ├─ {storeX}
│  │     │  ├─ {storeY}
│  │     │  │  ├─ {storeY}.constant.ts
│  │     │  │  ├─ {storeY}.store.ts
│  │     │  │  └─ {storeY}.type.ts
│  │     │  └─ {storeZ}.store.ts
│  │     ├─ {ComponentB}.stories
│  │     │  ├─ {storyX}.story.ts
│  │     │  ├─ {storyY}.story.ts
│  │     ├─ {ComponentB}.styles
│  │     │  ├─ {styleX}.style.css
│  │     │  ├─ {styleY}.style.css
│  │     │  ├─ {styleX}.style.css.d.ts
│  │     │  └─ {styleY}.style.css.d.ts
│  │     ├─ {ComponentB}.types
│  │     │  ├─ {TypeX}.type.ts
│  │     │  └─ {TypeY}.type.ts
│  │     ├─ {ComponentB}.tests
│  │     │  ├─ {ComponentX}.test.tsx
│  │     │  └─ {ComponentY}.test.tsx
│  │     ├─ {ComponentB}.utilities
│  │     │  ├─ {utilityX}.utility.ts
│  │     │  └─ {utilityY}.utility.ts
│  │     ├─ {ComponentB}.asset.svg
│  │     ├─ {ComponentB}.asset.svg.d.ts
│  │     ├─ {ComponentB}.constant.ts
│  │     ├─ {ComponentB}.context.ts
│  │     ├─ {ComponentB}.hook.ts
│  │     ├─ {ComponentB}.store.ts
│  │     ├─ {ComponentB}.story.ts
│  │     ├─ {ComponentB}.style.css
│  │     ├─ {ComponentB}.style.css.d.ts
│  │     ├─ {ComponentB}.tsx
│  │     ├─ {ComponentB}.test.ts
│  │     ├─ {ComponentB}.type.ts
│  │     └─ {ComponentB}.utility.ts
│  ├─ index.html
│  └─ index.ts
├─ infrastucture
│  └─ services
│     ├─ {ServiceA}
│     ├─ {ServiceB}
│     │  ├─ {ServiceB}.constants
│     │  │  ├─ {constantX}.constant.ts
│     │  │  └─ {constantY}.constant.ts
│     │  ├─ {ServiceB}.utilities.ts
│     │  │  ├─ {utilityX}.utility.ts
│     │  │  └─ {utilityY}.utility.ts
│     │  ├─ {ServiceB}.constant.ts
│     │  ├─ {ServiceB}.service.ts
│     │  └─ {ServiceB}.utility.ts
│     └─ index.ts
└─ index.ts
```
