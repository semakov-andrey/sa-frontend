## @sa-frontend/linting

### Подключение eslint конфига

Файл `eslint.config.js`

```js
import { config as main } from '@sa-frontend/linting/eslint/configs/main.config.js';
import { config as progress } from '@sa-frontend/linting/eslint/configs/progress.config.js';
import { config as structure } from '@sa-frontend/linting/eslint/configs/structure.config.js';

export const ignores = [];

export const config = [
  { ignores },
  ...main,
  ...structure,
  ...progress(ignores)
];

export default config;
```

### Подключение stylelint конфига

Файл `stylelint.config.js`

```js
import { config as main } from '@sa-frontend/linting/stylelint/main.config.js';
import { config as order } from '@sa-frontend/linting/stylelint/order.config.js';

export const ignoreFiles = [];

export const config = {
  ignoreFiles,
  ...main,
  ...order
};

export default config;

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
│  └─ entities
│     ├─ {EntityA}
│     └─ {EntityB}
│        ├─ {EntityB}.constants
│        │  ├─ {constantX}.constant.ts
│        │  └─ {constantY}.constant.ts
│        ├─ {EntityB}.types
│        │  ├─ {TypeX}.type.ts
│        │  └─ {TypeY}.type.ts
│        ├─ {EntityB}.utilities.ts
│        │  ├─ {utilityX}.utility.ts
│        │  └─ {utilityY}.utility.ts
│        ├─ {EntityB}.constant.ts
│        ├─ {EntityB}.entity.ts
│        ├─ {EntityB}.type.ts
│        └─ {EntityB}.utility.ts
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
│  │     ├─ {ContractB}.utilities.ts
│  │     │  ├─ {utilityX}.utility.ts
│  │     │  └─ {utilityY}.utility.ts
│  │     ├─ {ContractB}.constant.ts
│  │     ├─ {ContractB}.contract.ts
│  │     └─ {ContractB}.utility.ts
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
│  │     │  │  ├─ use{HookY}.store.ts
│  │     │  │  ├─ use{HookY}.type.ts
│  │     │  │  └─ use{HookY}.utility.ts
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
