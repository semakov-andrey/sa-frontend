## Структура проекта на реакте

```
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
         │  ├─ {AssetName}.d.ts
         │  ├─ {AssetName}.svg
         │  ├─ {AssetName}.d.ts
         │  ├─ {AssetName}.woff2
         ├─ {ComponentName}.constants
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
         ├─ {ComponentName}.styles
         ├─ {ComponentName}.types
         ├─ {ComponentName}.tests
         │  ├─ {ComponentName}.test.hooks
         │  │  ├─ use{HookName}.test.ts
         │  │  └─ use{HookName}.test.ts
         │  └─ {ComponentName}.test.tsx
         │─ {ComponentName}.utilities
         │
         ├─ {ComponentName}.const.ts
         ├─ {ComponentName}.css
         ├─ {ComponentName}.css.d.ts
         ├─ {ComponentName}.tsx
         ├─ {ComponentName}.store
         ├─ {ComponentName}.stories.ts
         ├─ {ComponentName}.types.ts
         └─ {ComponentName}.utils.ts
```