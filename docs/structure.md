## Структура проекта

```js
. 
├─ domain
│  ├─ entities
│  │  ├─ {EntityName}
│  │  └─ {EntityName}
│  │     └─ {EntityName}.ts
│  ├─ entities.types
│  │  ├─ {EntityTypeName}
│  │  └─ {EntityTypeName}
│  │     └─ {EntityTypeName}.types.ts
│  └─ useCases
├─ application
│  ├─ iocContainer
│  │  └─ iocContainer.ts
│  └─ services.types
│     ├─ {serviceTypeName}
│     └─ {serviceTypeName}
│        ├─ {serviceTypeName}.symbols.ts
│        └─ {serviceTypeName}.types.ts
├─ interface
│  ├─ main
│  │  ├─ {ComponentName}
│  │  └─ {ComponentName}
│  ├─ pages
│  │  ├─ {ComponentName}
│  │  └─ {ComponentName}
│  ├─ segments
│  │  ├─ {ComponentName}
│  │  └─ {ComponentName}
│  ├─ uiKit
│  │  ├─ {ComponentName}
│  │  └─ {ComponentName}
│  │     ├─ {ComponentName}.assets
│  │     │  ├─ {assetName}.png
│  │     │  ├─ {assetName}.png
│  │     │  ├─ {assetName}.svg
│  │     │  ├─ {assetName}.svg
│  │     │  ├─ {assetName}.d.ts
│  │     │  ├─ {assetName}.d.ts
│  │     │  ├─ {assetName}.woff2
│  │     │  └─ {assetName}.woff2
│  │     ├─ {ComponentName}.constants
│  │     │  ├─ {ConstantsName}.ts
│  │     │  └─ {ConstantsName}.ts
│  │     ├─ {ComponentName}.components
│  │     │  ├─ {ComponentName}
│  │     │  ├─ {ComponentName}
│  │     │  ├─ {ComponentName}{SubName}
│  │     │  └─ {ComponentName}{SubName}
│  │     ├─ {ComponentName}.hooks
│  │     │  ├─ use{HookName}
│  │     │  ├─ use{HookName}
│  │     │  │  ├─ use{HookName}.const.ts
│  │     │  │  ├─ use{HookName}.ts
│  │     │  │  └─ use{HookName}.types.ts
│  │     │  ├─ use{HookName}.ts
│  │     │  └─ use{HookName}.ts
│  │     ├─ {ComponentName}.stores
│  │     │  ├─ {storeName}.ts
│  │     │  └─ {storeName}.ts
│  │     ├─ {ComponentName}.styles
│  │     │  ├─ {styleName}.css
│  │     │  ├─ {styleName}.css
│  │     │  ├─ {styleName}.d.ts
│  │     │  └─ {styleName}.d.ts
│  │     ├─ {ComponentName}.types
│  │     │  ├─ {TypeName}.ts
│  │     │  └─ {TypeName}.ts
│  │     ├─ {ComponentName}.tests
│  │     │  ├─ {ComponentName}.test.hooks
│  │     │  │  ├─ use{HookName}.test.ts
│  │     │  │  └─ use{HookName}.test.ts
│  │     │  ├─ {ComponentName}.test.utilities
│  │     │  │  ├─ {utilityName}.test.ts
│  │     │  │  └─ {utilityName}.test.ts
│  │     │  └─ {ComponentName}.test.tsx
│  │     │─ {ComponentName}.utilities
│  │     │  ├─ {utilityName}.ts
│  │     │  └─ {utilityName}.ts
│  │     ├─ {ComponentName}.constants.ts
│  │     ├─ {ComponentName}.css
│  │     ├─ {ComponentName}.css.d.ts
│  │     ├─ {ComponentName}.tsx
│  │     ├─ {ComponentName}.stories.ts
│  │     ├─ {ComponentName}.types.ts
│  │     └─ {ComponentName}.utilities.ts
│  ├─ utilities
│  │  ├─ {utilityName}.ts
│  │  └─ {utilityName}.ts
│  ├─ index.html
│  └─ index.ts
├─ services
│  ├─ {serviceName}
│  ├─ {serviceName}
│  │  ├─ {serviceName}.schemas
│  │  ├─ {serviceName}.ts
│  │  └─ {serviceName}.utilities.ts
│  └─ index.ts
└─ index.ts
```