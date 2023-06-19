## Структура проекта

```js
. 
├─ domain
│  ├─ contracts
│  │  ├─ {Contract}
│  │  └─ {Contract}
│  │     ├─ {Contract}.constants
│  │     │  ├─ {constant}.constant.ts
│  │     │  └─ {constant}.constant.ts
│  │     ├─ {Contract}.constants.ts
│  │     └─ {Contract}.ts
│  ├─ entities
│  │  ├─ {Entity}
│  │  └─ {Entity}
│  │     ├─ {Entity}.utilities
│  │     │  ├─ {utility}.utility.ts
│  │     │  └─ {utility}.utility.ts
│  │     ├─ {Entity}.ts
│  │     └─ {Entity}.utilities.ts
│  └─ useCases
├─ application
│  ├─ iocContainer
│  │  └─ iocContainer.ts
│  ├─ contracts
│  │  ├─ {Contract}
│  │  └─ {Contract}
│  │     ├─ {Contract}.constants
│  │     │  ├─ {constant}.constant.ts
│  │     │  └─ {constant}.constant.ts
│  │     ├─ {Contract}.constants.ts
│  │     └─ {Contract}.ts
│  └─ utilities
│     ├─ {utility}.utility.ts
│     └─ {utility}.utility.ts
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
│  │  ├─ {Component}
│  │  └─ {Component}
│  ├─ pages
│  │  ├─ {Component}
│  │  └─ {Component}
│  ├─ segments
│  │  ├─ {Component}
│  │  └─ {Component}
│  ├─ uiKit
│  │  ├─ {Component}
│  │  └─ {Component}
│  │     ├─ {Component}.assets
│  │     │  ├─ {asset}.asset.png
│  │     │  ├─ {asset}.asset.png
│  │     │  ├─ {asset}.asset.svg
│  │     │  ├─ {asset}.asset.svg
│  │     │  ├─ {asset}.asset.d.ts
│  │     │  ├─ {asset}.asset.d.ts
│  │     │  ├─ {asset}.asset.woff2
│  │     │  └─ {asset}.asset.woff2
│  │     ├─ {Component}.constants
│  │     │  ├─ {constant}.constant.ts
│  │     │  └─ {constant}.constant.ts
│  │     ├─ {Component}.contexts
│  │     │  ├─ {context}.context
│  │     │  ├─ {context}.context
│  │     │  │  ├─ {context}.constant.ts
│  │     │  │  ├─ {context}.context.ts
│  │     │  │  └─ {context}.type.ts
│  │     │  ├─ {context}.context.ts
│  │     │  └─ {context}.context.ts
│  │     ├─ {Component}.components
│  │     │  ├─ {Component}
│  │     │  ├─ {Component}
│  │     │  ├─ {Component}{Sub}
│  │     │  └─ {Component}{Sub}
│  │     ├─ {Component}.hooks
│  │     │  ├─ use{Hook}
│  │     │  ├─ use{Hook}
│  │     │  │  ├─ use{Hook}.constant.ts
│  │     │  │  ├─ use{Hook}.hook.ts
│  │     │  │  └─ use{Hook}.type.ts
│  │     │  ├─ use{Hook}.ts
│  │     │  └─ use{Hook}.ts
│  │     ├─ {Component}.stores
│  │     │  ├─ {store}
│  │     │  ├─ {store}
│  │     │  │  ├─ {store}.constant.ts
│  │     │  │  ├─ {store}.store.ts
│  │     │  │  └─ {store}.type.ts
│  │     │  ├─ {store}.store.ts
│  │     │  └─ {store}.store.ts
│  │     ├─ {Component}.stories
│  │     │  ├─ {story}.story.ts
│  │     │  ├─ {story}.story.ts
│  │     ├─ {Component}.styles
│  │     │  ├─ {style}.style.css
│  │     │  ├─ {style}.style.css
│  │     │  ├─ {style}.style.d.ts
│  │     │  └─ {style}.style.d.ts
│  │     ├─ {Component}.types
│  │     │  ├─ {Type}.type.ts
│  │     │  └─ {Type}.type.ts
│  │     ├─ {Component}.tests
│  │     │  ├─ {Component}.test.tsx
│  │     │  └─ {Component}.test.tsx
│  │     ├─ {Component}.utilities
│  │     │  ├─ {utility}.utility.ts
│  │     │  └─ {utility}.utility.ts
│  │     ├─ {Component}.assets.svg
│  │     ├─ {Component}.assets.svg.d.ts
│  │     ├─ {Component}.constants.ts
│  │     ├─ {Component}.contexts.ts
│  │     ├─ {Component}.hooks.ts
│  │     ├─ {Component}.stores.ts
│  │     ├─ {Component}.stories.ts
│  │     ├─ {Component}.styles.css
│  │     ├─ {Component}.styles.css.d.ts
│  │     ├─ {Component}.tsx
│  │     ├─ {Component}.tests.ts
│  │     ├─ {Component}.types.ts
│  │     └─ {Component}.utilities.ts
│  ├─ index.html
│  └─ index.ts
├─ infrastucture
│  ├─ {service}
│  ├─ {service}
│  │  ├─ {service}.schemas
│  │  ├─ {service}.ts
│  │  └─ {service}.utilities.ts
│  └─ index.ts
└─ index.ts
```
