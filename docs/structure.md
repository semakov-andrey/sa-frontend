## Структура проекта

```js
.  
└─ interface
   ├─ main
   │  ├─ {ComponentName}
   │  └─ {ComponentName}
   ├─ pages
   │  ├─ {ComponentName}
   │  └─ {ComponentName}
   ├─ segments
   │  ├─ {ComponentName}
   │  └─ {ComponentName}
   └─ ui-kit
      ├─ {ComponentName}
      └─ {ComponentName}
         ├─ {ComponentName}.assets
         │  ├─ {AssetName}.png
         │  ├─ {AssetName}.png
         │  ├─ {AssetName}.svg
         │  ├─ {AssetName}.svg
         │  ├─ {AssetName}.d.ts
         │  ├─ {AssetName}.d.ts
         │  ├─ {AssetName}.woff2
         │  └─ {AssetName}.woff2
         ├─ {ComponentName}.constants
         │  ├─ {ConstantsName}.ts
         │  └─ {ConstantsName}.ts
         ├─ {ComponentName}.components
         │  ├─ {ComponentName}
         │  ├─ {ComponentName}
         │  ├─ {ComponentName}{SubName}
         │  └─ {ComponentName}{SubName}
         ├─ {ComponentName}.hooks
         │  ├─ use{HookName}
         │  ├─ use{HookName}
         │  │  ├─ use{HookName}.const.ts
         │  │  ├─ use{HookName}.ts
         │  │  └─ use{HookName}.types.ts
         │  ├─ use{HookName}.ts
         │  └─ use{HookName}.ts
         ├─ {ComponentName}.stores
         │  ├─ {StoreName}.ts
         │  └─ {StoreName}.ts
         ├─ {ComponentName}.styles
         │  ├─ {StyleName}.css
         │  ├─ {StyleName}.css
         │  ├─ {StyleName}.d.ts
         │  └─ {StyleName}.d.ts
         ├─ {ComponentName}.types
         │  ├─ {TypeName}.ts
         │  └─ {TypeName}.ts
         ├─ {ComponentName}.tests
         │  ├─ {ComponentName}.test.hooks
         │  │  ├─ use{HookName}.test.ts
         │  │  └─ use{HookName}.test.ts
         │  ├─ {ComponentName}.test.utilities
         │  │  ├─ {UtilityName}.test.ts
         │  │  └─ {UtilityName}.test.ts
         │  └─ {ComponentName}.test.tsx
         │─ {ComponentName}.utilities
         │  ├─ {UtilityName}.ts
         │  └─ {UtilityName}.ts
         ├─ {ComponentName}.constants.ts
         ├─ {ComponentName}.css
         ├─ {ComponentName}.css.d.ts
         ├─ {ComponentName}.tsx
         ├─ {ComponentName}.stories.ts
         ├─ {ComponentName}.types.ts
         └─ {ComponentName}.utilities.ts
```