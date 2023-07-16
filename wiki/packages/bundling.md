## @sa-frontend/bunding

## Подключение сборки

Файл `compiler/compile.js`

- генерация d.ts для css, svg, png:
```ts
function generateCSSDeclarations(folders: Array<string>): Promise<void>;
function generateSVGDeclarations(folders: Array<string>): Promise<void>; 
function generatePNGDeclarations(folders: Array<string>): Promise<void>;  
```

- start, build:
```ts
function start(
  config: webpack.Configuration,
  params: Params,
  middlewares: Array<fastifyMiddie.Handler>
): Promise<webpack.Compiler>;

function build(
  config: webpack.Configuration,
  params: Params
): Promise<void>;
```

- Params
```ts
interface Params {
  rootDirectory: string;
  directories: {
    assets?: string; // assets
    development?: string;
    presentation?: string; // presentation
    production: string;
    source: string;
  };
  port?: number;
  copyPatterns?: Array<{ from: string; to: string }>;
  isHTML?: boolean; // true
  isCleanDirectory?: boolean; // true
};
```