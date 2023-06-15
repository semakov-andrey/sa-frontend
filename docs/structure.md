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
│  ├─ common
│  │  ├─ common.assets
│  │  │  └─ {ComponentStructure}
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
│  │     │  ├─ {assetName}.asset.png
│  │     │  ├─ {assetName}.asset.png
│  │     │  ├─ {assetName}.asset.svg
│  │     │  ├─ {assetName}.asset.svg
│  │     │  ├─ {assetName}.asset.d.ts
│  │     │  ├─ {assetName}.asset.d.ts
│  │     │  ├─ {assetName}.asset.woff2
│  │     │  └─ {assetName}.asset.woff2
│  │     ├─ {ComponentName}.constants
│  │     │  ├─ {constantName}.constant.ts
│  │     │  └─ {constantName}.constant.ts
│  │     ├─ {ComponentName}.contexts
│  │     │  ├─ {contextName}.context
│  │     │  ├─ {contextName}.context
│  │     │  │  ├─ {contextName}.constant.ts
│  │     │  │  ├─ {contextName}.context.ts
│  │     │  │  └─ {contextName}.type.ts
│  │     │  ├─ {contextName}.context.ts
│  │     │  └─ {contextName}.context.ts
│  │     ├─ {ComponentName}.components
│  │     │  ├─ {ComponentName}
│  │     │  ├─ {ComponentName}
│  │     │  ├─ {ComponentName}{SubName}
│  │     │  └─ {ComponentName}{SubName}
│  │     ├─ {ComponentName}.hooks
│  │     │  ├─ use{HookName}
│  │     │  ├─ use{HookName}
│  │     │  │  ├─ use{HookName}.constant.ts
│  │     │  │  ├─ use{HookName}.hook.ts
│  │     │  │  └─ use{HookName}.type.ts
│  │     │  ├─ use{HookName}.ts
│  │     │  └─ use{HookName}.ts
│  │     ├─ {ComponentName}.stores
│  │     │  ├─ {storeName}
│  │     │  ├─ {storeName}
│  │     │  │  ├─ {storeName}.constant.ts
│  │     │  │  ├─ {storeName}.store.ts
│  │     │  │  └─ {storeName}.type.ts
│  │     │  ├─ {storeName}.store.ts
│  │     │  └─ {storeName}.store.ts
│  │     ├─ {ComponentName}.styles
│  │     │  ├─ {styleName}.style.css
│  │     │  ├─ {styleName}.style.css
│  │     │  ├─ {styleName}.style.d.ts
│  │     │  └─ {styleName}.style.d.ts
│  │     ├─ {ComponentName}.stories.ts
│  │     │  ├─ {storyName}.story.ts
│  │     │  ├─ {storyName}.story.ts
│  │     ├─ {ComponentName}.types
│  │     │  ├─ {TypeName}.type.ts
│  │     │  └─ {TypeName}.type.ts
│  │     ├─ {ComponentName}.tests
│  │     │  ├─ {ComponentName}.test.tsx
│  │     │  └─ {ComponentName}.test.tsx
│  │     │─ {ComponentName}.utilities
│  │     │  ├─ {utilityName}.utility.ts
│  │     │  └─ {utilityName}.utility.ts
│  │     ├─ {ComponentName}.assets.svg
│  │     ├─ {ComponentName}.assets.svg.d.ts
│  │     ├─ {ComponentName}.constants.ts
│  │     ├─ {ComponentName}.contexts.ts
│  │     ├─ {ComponentName}.hooks.ts
│  │     ├─ {ComponentName}.stores.ts
│  │     ├─ {ComponentName}.stories.ts
│  │     ├─ {ComponentName}.styles.css
│  │     ├─ {ComponentName}.styles.css.d.ts
│  │     ├─ {ComponentName}.tsx
│  │     ├─ {ComponentName}.tests.ts
│  │     ├─ {ComponentName}.types.ts
│  │     └─ {ComponentName}.utilities.ts
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
