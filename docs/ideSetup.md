## Настройка IDE

### Visual Studio Code

#### Настройка  
**Производится при помощи изменения файла settings.json:**  
- Настройки -> Параметры -> Справа вверху кнопка режима редактирования файла  
- Preferences -> File -> Settings -> Справа вверху кнопка режима редактирования файла  
- Ctrl + Shift + 6 / Cmd + Shift + 6  

**Физический путь к файлу:**
- (windows) %APPDATA%\Code\User\settings.json  
- (linux) $HOME/.config/Code/User/settings.json  
- (macos) $HOME/Library/Application Support/Code/User/settings.json  

#### Основные настройки
```
{
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.matchBrackets": true,
  "eslint.options": {
    "extensions": [ ".js", ".jsx", ".ts", ".tsx" ]
  },
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "javascript.preferences.quoteStyle": "single",
  "javascript.validate.enable": false
}
```
#### Индивидуальные настройки
**Отключение автоматической вставки закрывающих скобок, кавычек, тегов:**
```
{
  "editor.autoClosingBrackets": "never",
  "editor.autoClosingQuotes": "never",
  "javascript.autoClosingTags": false,
  "typescript.autoClosingTags": false,
  "editor.autoSurround": "never"
}
```

#### Шрифт JetBrains Mono в VSCode
```
{
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontSize": 13,
  "editor.fontWeight": "bold",
  "workbench.fontAliasing": "antialiased"
}
```

#### Расширения редактора
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Russian Language Pack](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ru)
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)


### JetBrains WebStorm  

#### Основные настройки:  

**Включить подсказку типа при наведении**  
File -> Settings -> Editor -> Code editing  
Включить Show quick documentation on mouse move  

**2 пробела**  
File -> Settings -> Editor -> Code style -> Javascript/Typescript/HTML/CSS  
Установить везде по 2 пробела  

**Настройка пробелов**  
File -> Settings -> Editor -> Code style -> Javascript/Typescript -> Spaces -> Within  
Включить ES6 import/export braces  
File -> Settings -> Editor -> Code style -> Javascript/Typescript -> Spaces -> Within  
Включить Array brackets  

**Настройка пустых строк**  
File -> Settings -> Editor -> Code style -> Javascript/Typescript -> Blank lines  
Установить In code в 1  
Остальные значения: 1 1 0 0 0 1 1  

**Настройка кавычек**
File -> Settings -> Editor -> Code style -> Javascript/Typescript -> Punctuation  
Установить Single  

**Настройка запятых**  
File -> Settings -> Editor -> Code style -> Javascript/Typescript -> Punctuation  
Установить Trailing comma в remove  

**Отключить сортировку импортов**  
File -> Settings -> Editor -> Code style -> Javascript/Typescript -> Import  
Отключить sort  

**Отключить проверку ;**  
File -> Settings -> Editor -> Inspections -> Javascript/Typescript -> General  
Отключить unnecessary semicolon  

**Еще пара настроек**  
File -> Settings -> Editor -> Code style -> Javascript/Typescript -> Wrapping and Braces -> Keep when reformatting  
Отключить Comment at first column  
File -> Settings -> Editor -> Code style -> Javascript/Typescript -> Wrapping and Braces -> for() statement  
Отключить Align when multiline  

**PostCSS**  
File -> Settings -> Plugins  
Установить плагин PostCSS  
File -> Settings -> Languages & Frameworks -> Style Sheets -> Dialects  
Выбрать папку с проектом и выбрать PostCSS  

#### Индивидуальные настройки
**Отключение автоматической вставки закрывающих скобок, кавычек, тегов:**  
File -> Settings -> Editor -> General -> Smart keys  
Отключить всё в блоке Enter  
Отключить pair brackets, pair quote, surround selection  
Установить Unindent to backspace в Disabled  

**Отключить автоматическое скрытие блоков**  
File -> Settings -> Editor -> General -> Сode Folding  
Отключить всё  

**Отключить проверку орфографии**  
File -> Settings -> Editor -> Inspections -> Proofreading  
Отключить все  

**Отключить текстовые подсказки в коде**  
File -> Settings -> Editor -> Inlay Hints -> Javasript/Typescript  
Отключить Show hints во всех пунктах списка  

**Отключить автосохранение**  
File -> Settings -> Appearance & Behavior -> System settings -> Synchronization  
Отключить первые 2 галочки  
File -> Settings -> Editor -> General -> Editor tabs  
Включить Mark modified  

#### Настройки шрифтов  
**Шрифт в редакторе**  
File -> Settings -> Editor -> Font  

**Шрифт в интерфейсе**  
File -> Settings -> Appearance & Behavior -> Appearance  
Use custom font  

#### Расширения редактора  
[PostCSS](https://plugins.jetbrains.com/plugin/8578-postcss/)  