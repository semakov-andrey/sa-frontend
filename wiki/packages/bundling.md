## @sa-frontend/bunding

### Подключение сборки

Файл `compiler/compile.js`

- Генерация d.ts для css, svg, png:
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

interface Params {
  rootDirectory: string; // Корневая директория проекта
  directories: {
    assets?: string; // default: 'assets'
    development?: string;
    presentation?: string; // default: directories.source + '/presentation'
    production: string;
    source: string;
  }; // Набор директорий для сборки проекта
  port?: number; // Порт для webpack dev server
  copyPatterns?: Array<{ from: string; to: string }>; // Паттерны для CopyWebpackPlugin
  isHTML?: boolean; // Использовать HTMLWebpackPlugin; default: true
  isCleanDirectory?: boolean; // Очистить директорию перед сборкой; default: true
};
```