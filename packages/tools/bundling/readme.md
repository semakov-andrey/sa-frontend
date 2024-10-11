## @sa-frontend/bunding

### Подключение сборки

Файл `compiler/compile.js`

- Генерация d.ts для css, svg, png, binary:
```ts
function generateAllDeclarations(folders: Array<string>): Promise<void>;  

function generateCSSDeclarations(folders: Array<string>): Promise<void>;
function generateSVGDeclarations(folders: Array<string>): Promise<void>; 
function generatePNGDeclarations(folders: Array<string>): Promise<void>;  
function generateBINDeclarations(folders: Array<string>): Promise<void>;  
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
  directories?: {
    source?: string; // default: './src'
    htmlFile?: string // default: directories.source + '/presentation'
    assets?: string; // default: 'assets'
    development?: string; // default: './tmp'
    production?: string; // default: './build'
  }; // Набор директорий для сборки проекта
  port?: number; // Порт для webpack dev server, без порта - watch + сборка в папку
  copyPatterns?: Array<{ from: string; to: string }>; // Паттерны для CopyWebpackPlugin
  isHTML?: boolean; // Использовать HTMLWebpackPlugin; default: true
  isSourceMap?: boolean; // Использовать souce-map в development; default: true
  isCleanDirectory?: boolean; // Очистить директорию перед сборкой; default: true
  isAnalyzeBundle?: boolean // Проанализировать bundle; default: true
  analyzeStatsFilename?: string; // Название файла с результатами анализа; default: 'stats.json'
  postcssGlobalDataFiles?: Array<string>; // Пути к файлам с глобальными переменными для postcss
  isServiceWorker?: boolean // Использовать service worker; default: false
  isPWA?: boolean // Установить глобальную переменную IS_PWA
  tsConfigOverwrite?: ForkTsCheckerWebpackPlugin.TypeScriptConfigOverwrite // Переписать tsconfig, default: {}
  aliases?: Record<string, string> // Алиасы, default: { '@': directories.source }
};
```

- electron:
```ts
function electron(compileParams: CompileParams): Promise<void>;

type CompileParams {
  appName: string;
  rootDirectory: string;
  serverDirectories?: {
    source?: string; // default: './main'
    production?: string; // default: './app'
  };
  serverConfig?: () => webpack.config; // default () => ({})
  clientDirectories?: {
    source?: string; // default: './src'
    production?: string; // default: './app/frontend'
  };
  clientConfig?: () => webpack.config; // default () => ({})
  clientParams?: Partial<Params>; // default {}
  devMiddlewares?: ((server: Fastify.Server) => void)[] // default [ devMiddleware ]
};
```