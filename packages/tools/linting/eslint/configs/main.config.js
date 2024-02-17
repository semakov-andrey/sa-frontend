import eslintPluginStylistic from '@stylistic/eslint-plugin';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import eslintParserTypescript from '@typescript-eslint/parser';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJam3 from 'eslint-plugin-jam3';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

import { eslintPluginSaRules } from '../rules/index.js';

const INDENT = 2;
const MAX_CLASSES_PER_FILE = 5;

export const languageOptions = {
  globals: {
    ...globals.builtin,
    ...globals.browser,
    ...globals.node
  }
};

export const typescriptOptions = {
  parser: eslintParserTypescript,
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
    project: './tsconfig.json'
  }
};

export const plugins = {
  'import': eslintPluginImport,
  'jam3': eslintPluginJam3,
  'react': eslintPluginReact,
  'react-hooks': eslintPluginReactHooks,
  'unused-imports': eslintPluginUnusedImports,
  '@typescript-eslint': eslintPluginTypescript,
  '@stylistic': eslintPluginStylistic,
  'saRules': eslintPluginSaRules
};

export const reactSettings = {
  react: { version: 'detect' }
};

export const importJsSettings = {
  'import/parsers': {
    espree: [ '.cjs', '.js', '.jsx' ]
  }
};

export const importTsSettings = {
  'import/parsers': {
    '@typescript-eslint/parser': [ '.ts', '.tsx' ]
  }
};

export const lintRules = {
  'accessor-pairs': [ 'error', { enforceForClassMembers: true } ],
  'array-callback-return': 'error',
  'arrow-body-style': [ 'error', 'as-needed' ],
  'block-scoped-var': 'error',
  'camelcase': [
    'error',
    { allow: [ 'short_name', 'theme_color', 'background_color', 'start_url' ] }
  ],
  'consistent-this': [ 'error', 'self' ],
  'curly': [ 'error', 'multi-line' ],
  'default-case': 'error',
  'dot-notation': 'error',
  'eqeqeq': 'error',
  'for-direction': 'error',
  'func-name-matching': [ 'error', { considerPropertyDescriptor: true } ],
  'grouped-accessor-pairs': [ 'error', 'getBeforeSet' ],
  'guard-for-in': 'error',
  'max-classes-per-file': [ 'warn', MAX_CLASSES_PER_FILE ],
  'max-depth': [ 'error', { max: 4 } ],
  'max-nested-callbacks': [ 'error', { max: 4 } ],
  'max-params': [ 'error', { max: 10 } ],
  'new-cap': [ 'error', { capIsNew: false } ],
  'no-alert': 'error',
  'no-async-promise-executor': 'error',
  'no-await-in-loop': 'error',
  'no-caller': 'error',
  'no-case-declarations': 'error',
  'no-class-assign': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': [ 'error', 'always' ],
  'no-console': [ 'error', { allow: [ 'info', 'warn', 'error' ] } ],
  'no-constant-condition': 'error',
  'no-control-regex': 'error',
  'no-constructor-return': 'error',
  'no-debugger': 'error',
  'no-delete-var': 'error',
  'no-dupe-else-if': 'error',
  'no-duplicate-case': 'error',
  'no-else-return': [ 'error', { allowElseIf: false } ],
  'no-empty': [ 'error', { allowEmptyCatch: true } ],
  'no-empty-character-class': 'error',
  'no-empty-pattern': 'error',
  'no-eq-null': 'error',
  'no-eval': 'error',
  'no-ex-assign': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-extra-label': 'error',
  'no-fallthrough': 'error',
  'no-global-assign': 'error',
  'no-implicit-coercion': 'error',
  'no-implicit-globals': 'error',
  'no-inner-declarations': [ 'error', 'both' ],
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': [
    'error',
    { skipStrings: true, skipTemplates: true }
  ],
  'no-iterator': 'error',
  'no-label-var': 'error',
  'no-lone-blocks': 'error',
  'no-lonely-if': 'error',
  'no-misleading-character-class': 'error',
  'no-multi-assign': 'error',
  'no-new-func': 'error',
  'no-new-object': 'error',
  'no-new-wrappers': 'error',
  'no-nonoctal-decimal-escape': 'error',
  'no-octal': 'error',
  'no-octal-escape': 'error',
  'no-param-reassign': 'error',
  'no-promise-executor-return': 'error',
  'no-proto': 'error',
  'no-prototype-builtins': 'error',
  'no-regex-spaces': 'error',
  'no-return-assign': [ 'error', 'always' ],
  'no-script-url': 'error',
  'no-self-assign': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-shadow-restricted-names': 'error',
  'no-sparse-arrays': 'error',
  'no-template-curly-in-string': 'error',
  'no-undef-init': 'error',
  'no-underscore-dangle': [ 'error', { allow: [ '_handle' ] } ],
  'no-unexpected-multiline': 'error',
  'no-unneeded-ternary': 'error',
  'no-unreachable-loop': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-optional-chaining': [ 'error', { disallowArithmeticOperators: true } ],
  'no-unused-labels': 'error',
  'no-useless-backreference': 'error',
  'no-useless-call': 'error',
  'no-useless-catch': 'error',
  'no-useless-computed-key': [ 'error', { enforceForClassMembers: true } ],
  'no-useless-concat': 'error',
  'no-useless-escape': 'error',
  'no-useless-rename': 'error',
  'no-useless-return': 'error',
  'no-var': 'error',
  'no-void': 'error',
  'no-warning-comments': [ 'error', { terms: [ 'FIXME' ], location: 'anywhere' } ],
  'no-with': 'error',
  'object-shorthand': 'error',
  'one-var': [ 'error', 'never' ],
  'prefer-arrow-callback': 'error',
  'prefer-const': [ 'error', { destructuring: 'all', ignoreReadBeforeAssign: true } ],
  'prefer-numeric-literals': 'error',
  'prefer-object-spread': 'error',
  'prefer-promise-reject-errors': 'error',
  'prefer-regex-literals': [ 'error', { disallowRedundantWrapping: true } ],
  'prefer-rest-params': 'error',
  'prefer-spread': 'error',
  'prefer-template': 'error',
  'radix': [ 'error', 'always' ],
  'require-atomic-updates': 'error',
  'require-unicode-regexp': 'error',
  'require-yield': 'error',
  'symbol-description': 'error',
  'use-isnan': [ 'error', { enforceForIndexOf: true } ],
  'vars-on-top': 'error'
};

export const formatRules = {
  '@stylistic/array-bracket-newline': [ 'error', 'consistent' ],
  '@stylistic/array-bracket-spacing': [ 'error', 'always', { singleValue: true, objectsInArrays: true, arraysInArrays: true } ],
  '@stylistic/array-element-newline': [ 'error', 'consistent' ],
  '@stylistic/arrow-parens': [ 'error', 'always' ],
  '@stylistic/arrow-spacing': [ 'error', { before: true, after: true } ],
  '@stylistic/comma-dangle': [ 'error', 'never' ],
  '@stylistic/comma-spacing': [ 'error', { before: false, after: true } ],
  '@stylistic/comma-style': [ 'error', 'last' ],
  '@stylistic/computed-property-spacing': [ 'error', 'never' ],
  '@stylistic/dot-location': [ 'error', 'property' ],
  '@stylistic/eol-last': [ 'error', 'always' ],
  '@stylistic/func-call-spacing': [ 'error', 'never' ],
  '@stylistic/function-call-argument-newline': [ 'error', 'consistent' ],
  '@stylistic/function-paren-newline': [ 'error', 'consistent' ],
  '@stylistic/generator-star-spacing': [ 'error', { before: false, after: true } ],
  '@stylistic/indent': [ 'error', INDENT ],
  '@stylistic/jsx-quotes': [ 'error', 'prefer-double' ],
  '@stylistic/key-spacing': 'error',
  '@stylistic/keyword-spacing': 'error',
  '@stylistic/lines-around-comment': [
    'error',
    {
      beforeBlockComment: true,
      afterBlockComment: false,
      beforeLineComment: false,
      afterLineComment: false,
      allowBlockStart: true,
      allowBlockEnd: false,
      allowClassStart: true,
      allowClassEnd: false,
      allowObjectStart: true,
      allowObjectEnd: false,
      allowArrayStart: true,
      allowArrayEnd: false,
      ignorePattern: 'webpack'
    }
  ],
  '@stylistic/lines-between-class-members': [ 'error', 'always' ],
  '@stylistic/max-len': [ 'error', { code: 150, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreRegExpLiterals: true } ],
  '@stylistic/max-statements-per-line': 'error',
  '@stylistic/multiline-ternary': [ 'error', 'always-multiline' ],
  '@stylistic/new-parens': [ 'error', 'always' ],
  '@stylistic/no-floating-decimal': 'error',
  '@stylistic/no-extra-parens': [
    'error',
    'all',
    { ignoreJSX: 'multi-line', enforceForNewInMemberExpressions: false, enforceForFunctionPrototypeMethods: false }
  ],
  '@stylistic/no-mixed-spaces-and-tabs': 'error',
  '@stylistic/no-multi-spaces': 'error',
  '@stylistic/no-multiple-empty-lines': [ 'error', { max: 1, maxEOF: 1, maxBOF: 0 } ],
  '@stylistic/no-tabs': 'error',
  '@stylistic/no-trailing-spaces': 'error',
  '@stylistic/no-whitespace-before-property': 'error',
  '@stylistic/nonblock-statement-body-position': [ 'error', 'beside' ],
  '@stylistic/object-curly-newline': [ 'error', { consistent: true } ],
  '@stylistic/object-curly-spacing': [ 'error', 'always', { arraysInObjects: true, objectsInObjects: true } ],
  '@stylistic/operator-linebreak': [
    'error',
    'none',
    { overrides: {
      '?': 'before',
      ':': 'before',
      '&&': 'before',
      '||': 'before',
      '+': 'before',
      '-': 'before',
      '=': 'after'
    } }
  ],
  '@stylistic/padded-blocks': [ 'error', 'never' ],
  '@stylistic/padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: '*', next: [ 'do', 'class', 'for', 'switch', 'try', 'while' ] },
    { blankLine: 'always', prev: [ 'do', 'class', 'for', 'switch', 'try', 'while' ], next: '*' }
  ],
  '@stylistic/quote-props': [ 'error', 'consistent-as-needed' ],
  '@stylistic/quotes': [ 'error', 'single', { avoidEscape: true, allowTemplateLiterals: true } ],
  '@stylistic/rest-spread-spacing': [ 'error', 'never' ],
  '@stylistic/semi': [ 'error', 'always', { omitLastInOneLineBlock: false } ],
  '@stylistic/semi-spacing': 'error',
  '@stylistic/semi-style': [ 'error', 'last' ],
  '@stylistic/space-before-blocks': [ 'error', 'always' ],
  '@stylistic/space-before-function-paren': [ 'error', { anonymous: 'always', named: 'never', asyncArrow: 'always' } ],
  '@stylistic/space-in-parens': [ 'error', 'never' ],
  '@stylistic/space-infix-ops': 'error',
  '@stylistic/space-unary-ops': [ 'error', { words: true, nonwords: false } ],
  '@stylistic/spaced-comment': [ 'error', 'always' ],
  '@stylistic/switch-colon-spacing': 'error',
  '@stylistic/template-curly-spacing': [ 'error', 'always' ],
  '@stylistic/template-tag-spacing': [ 'error', 'never' ],
  '@stylistic/wrap-iife': [ 'error', 'outside' ],
  '@stylistic/yield-star-spacing': [ 'error', { before: false, after: true } ]
};

export const importRules = {
  'import/export': 'error',
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-absolute-path': 'error',
  'import/no-amd': 'error',
  'import/no-anonymous-default-export': 'error',
  'import/no-cycle': 'error',
  'import/no-default-export': 'warn',
  'import/no-duplicates': [ 'error', { 'prefer-inline': true } ],
  'import/no-named-as-default-member': 'error',
  'import/no-named-as-default': 'error',
  'import/no-named-default': 'error',
  'import/no-namespace': 'error',
  'import/no-self-import': 'error',
  'import/no-unused-modules': 'error',
  'import/no-useless-path-segments': 'error',
  'import/no-webpack-loader-syntax': 'error',
  'import/order': [
    'error',
    {
      'groups': [ 'builtin', 'external', 'object', 'unknown', 'internal', 'parent', 'sibling', 'index', 'type' ],
      'newlines-between': 'always',
      'alphabetize': { order: 'asc', caseInsensitive: true },
      'pathGroups': [
        { pattern: '@sa-frontend/**/*', group: 'object' },
        { pattern: '@sa-**/**', group: 'unknown' },
        { pattern: '@/**', group: 'internal' }
      ],
      'pathGroupsExcludedImportTypes': [ 'type' ]
    }
  ],
  'unused-imports/no-unused-imports': 'error'
};

export const jsLintRules = {
  'constructor-super': 'error',
  'default-param-last': 'error',
  'getter-return': 'error',
  'no-array-constructor': 'error',
  'no-const-assign': 'error',
  'no-dupe-args': 'error',
  'no-dupe-class-members': 'error',
  'no-dupe-keys': 'error',
  'no-func-assign': 'error',
  'no-empty-function': 'error',
  'no-implied-eval': 'error',
  'no-import-assign': 'error',
  'no-loop-func': 'error',
  'no-loss-of-precision': 'error',
  'no-new-symbol': 'error',
  'no-obj-calls': 'error',
  'no-redeclare': 'error',
  'no-setter-return': 'error',
  'no-this-before-super': 'error',
  'no-throw-literal': 'error',
  'no-undef': 'error',
  'no-unreachable': 'error',
  'no-unsafe-negation': [ 'error', { enforceForOrderingRelations: true } ],
  'no-unused-vars': [
    'error',
    {
      args: 'after-used',
      varsIgnorePattern: 'React',
      argsIgnorePattern: '_',
      ignoreRestSiblings: true,
      caughtErrors: 'none'
    }
  ],
  'require-await': 'error',
  'valid-typeof': [ 'error', { requireStringLiterals: true } ]
};

export const jsFormatRules = {};

export const saRules = {
  'saRules/fc-sorting': 'error'
};

export const tsLintRules = {
  '@typescript-eslint/adjacent-overload-signatures': 'error',
  '@typescript-eslint/array-type': [ 'error', { default: 'array', readonly: 'array' } ],
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/ban-ts-comment': [
    'error',
    { 'ts-expect-error': 'allow-with-description', 'minimumDescriptionLength': 10 }
  ],
  '@typescript-eslint/ban-tslint-comment': 'error',
  '@typescript-eslint/ban-types': [
    'error',
    {
      types: {
        String: { message: 'Use string instead', fixWith: 'string' },
        Boolean: { message: 'Use boolean instead', fixWith: 'boolean' },
        Number: { message: 'Use number instead', fixWith: 'number' },
        Object: { message: 'Use object instead', fixWith: 'object' },
        Symbol: { message: 'Use symbol instead', fixWith: 'symbol' },
        Function: false
      }
    }
  ],
  '@typescript-eslint/consistent-type-assertions': [
    'error',
    { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' }
  ],
  '@typescript-eslint/explicit-function-return-type': 'error',
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    { overrides: { constructors: 'off' } }
  ],
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/naming-convention': [
    'error',
    { selector: 'variable', format: [ 'camelCase', 'PascalCase', 'UPPER_CASE' ] }
  ],
  '@typescript-eslint/no-array-constructor': 'error',
  '@typescript-eslint/no-base-to-string': 'error',
  '@typescript-eslint/no-confusing-non-null-assertion': 'error',
  '@typescript-eslint/no-confusing-void-expression': 'error',
  '@typescript-eslint/no-dupe-class-members': 'error',
  '@typescript-eslint/no-dynamic-delete': 'error',
  '@typescript-eslint/no-empty-function': 'error',
  '@typescript-eslint/no-empty-interface': 'error',
  '@typescript-eslint/no-explicit-any': [ 'error', { fixToUnknown: false } ],
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  '@typescript-eslint/no-extraneous-class': 'error',
  '@typescript-eslint/no-for-in-array': 'error',
  '@typescript-eslint/no-implied-eval': 'error',
  '@typescript-eslint/no-inferrable-types': [
    'error',
    { ignoreParameters: true, ignoreProperties: true }
  ],
  '@typescript-eslint/no-invalid-this': [ 'error', { capIsConstructor: false } ],
  '@typescript-eslint/no-loop-func': 'error',
  '@typescript-eslint/no-loss-of-precision': 'error',
  '@typescript-eslint/no-misused-new': 'error',
  '@typescript-eslint/no-misused-promises': [ 'error', { checksVoidReturn: false } ],
  '@typescript-eslint/no-namespace': 'error',
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-redeclare': 'error',
  '@typescript-eslint/no-require-imports': 'error',
  '@typescript-eslint/no-this-alias': [
    'error',
    { allowDestructuring: true, allowedNames: [ 'self' ] }
  ],
  '@typescript-eslint/no-throw-literal': 'error',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
  '@typescript-eslint/no-unnecessary-condition': 'error',
  '@typescript-eslint/no-unnecessary-type-arguments': 'error',
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-unsafe-call': 'error',
  '@typescript-eslint/no-unsafe-member-access': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      args: 'after-used',
      varsIgnorePattern: 'React',
      argsIgnorePattern: '_',
      ignoreRestSiblings: true,
      caughtErrors: 'none'
    }
  ],
  '@typescript-eslint/prefer-as-const': 'error',
  '@typescript-eslint/prefer-enum-initializers': 'error',
  '@typescript-eslint/prefer-includes': 'error',
  '@typescript-eslint/prefer-literal-enum-member': 'error',
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
  '@typescript-eslint/prefer-reduce-type-parameter': 'error',
  '@typescript-eslint/prefer-regexp-exec': 'error',
  '@typescript-eslint/prefer-string-starts-ends-with': 'error',
  '@typescript-eslint/prefer-ts-expect-error': 'error',
  '@typescript-eslint/promise-function-async': 'warn',
  '@typescript-eslint/require-array-sort-compare': 'error',
  '@typescript-eslint/require-await': 'error',
  '@typescript-eslint/restrict-plus-operands': 'error',
  '@typescript-eslint/restrict-template-expressions': 'error',
  '@typescript-eslint/strict-boolean-expressions': 'error',
  '@typescript-eslint/switch-exhaustiveness-check': 'error',
  '@typescript-eslint/triple-slash-reference': 'error',
  '@typescript-eslint/typedef': [
    'error',
    {
      arrowParameter: true,
      parameter: true,
      propertyDeclaration: true
    }
  ],
  '@typescript-eslint/unbound-method': [ 'error', { ignoreStatic: true } ],
  '@typescript-eslint/unified-signatures': 'error'
};

export const tsFormatRules = {
  '@stylistic/member-delimiter-style': [
    'error',
    {
      multiline: { delimiter: 'comma', requireLast: false },
      singleline: { delimiter: 'comma', requireLast: false },
      overrides: { interface: { multiline: { delimiter: 'semi', requireLast: true } } }
    }
  ],
  '@stylistic/type-annotation-spacing': 'error'
};

export const reactHookRules = {
  'react-hooks/rules-of-hooks': 'warn',
  'react-hooks/exhaustive-deps': [
    'warn',
    {
      additionalHooks: '(useInfluence|useUpdateInfluence|useAsyncInfluence|useAsyncUpdateInfluence)'
    }
  ]
};

export const reactLintRules = {
  'jam3/no-sanitizer-with-danger': 'error',
  'react/button-has-type': 'error',
  'react/no-access-state-in-setstate': 'error',
  'react/no-array-index-key': 'warn',
  'react/no-children-prop': 'error',
  'react/no-danger-with-children': 'error',
  'react/no-deprecated': 'error',
  'react/no-did-mount-set-state': 'error',
  'react/no-did-update-set-state': 'error',
  'react/no-direct-mutation-state': 'error',
  'react/no-redundant-should-component-update': 'error',
  'react/no-render-return-value': 'error',
  'react/no-string-refs': 'error',
  'react/no-this-in-sfc': 'error',
  'react/no-typos': 'error',
  'react/no-unescaped-entities': 'error',
  'react/no-unknown-property': 'error',
  'react/no-unsafe': 'error',
  'react/no-unused-state': 'error',
  'react/no-will-update-set-state': 'error',
  'react/react-in-jsx-scope': 'error',
  'react/self-closing-comp': 'error',
  'react/sort-comp': [
    'error',
    {
      order: [
        'static-variables',
        'static-methods',
        'lifecycle',
        'instance-variables',
        'instance-methods',
        'everything-else',
        '/^render.+$/'
      ],
      groups: {
        rendering: [
          'render',
          '/^render.+$/'
        ]
      }
    }
  ],
  'react/state-in-constructor': [ 'error', 'never' ],
  'react/style-prop-object': 'error',
  'react/void-dom-elements-no-children': 'error'
};

export const reactTsxLintRules = {
  'react/jsx-boolean-value': [ 'error', 'never' ],
  'react/jsx-filename-extension': [ 'error', { extensions: [ '.tsx' ] } ],
  'react/jsx-fragments': [ 'error', 'element' ],
  'react/jsx-key': [ 'error', { checkFragmentShorthand: true } ],
  'react/jsx-max-depth': [ 'error', { max: 10 } ],
  'react/jsx-no-bind': [ 'error', { ignoreDOMComponents: true } ],
  'react/jsx-no-comment-textnodes': 'error',
  'react/jsx-no-constructed-context-values': 'error',
  'react/jsx-no-duplicate-props': 'error',
  'react/jsx-no-script-url': 'error',
  'react/jsx-no-target-blank': [ 'error', { warnOnSpreadAttributes: true } ],
  'react/jsx-no-undef': [ 'error', { allowGlobals: true } ],
  'react/jsx-no-useless-fragment': 'error',
  'react/jsx-uses-react': 'error',
  'react/jsx-uses-vars': 'error'
};

export const reactTsxFormatRules = {
  '@stylistic/jsx-closing-bracket-location': 'error',
  '@stylistic/jsx-closing-tag-location': 'error',
  '@stylistic/jsx-curly-brace-presence': [ 'error', { props: 'never', children: 'ignore' } ],
  '@stylistic/jsx-curly-newline': [ 'error', 'consistent' ],
  '@stylistic/jsx-curly-spacing': [ 'error', { when: 'always', children: true } ],
  '@stylistic/jsx-equals-spacing': [ 'error', 'never' ],
  '@stylistic/jsx-first-prop-new-line': [ 'error', 'multiline-multiprop' ],
  '@stylistic/jsx-indent': [ 'error', INDENT, { checkAttributes: true } ],
  '@stylistic/jsx-indent-props': [ 'error', INDENT ],
  '@stylistic/jsx-max-props-per-line': [ 'error', { maximum: 4 } ],
  '@stylistic/jsx-pascal-case': 'error',
  '@stylistic/jsx-props-no-multi-spaces': 'error',
  '@stylistic/jsx-tag-spacing': [
    'error',
    { closingSlash: 'never', beforeSelfClosing: 'always', afterOpening: 'never', beforeClosing: 'never' }
  ],
  '@stylistic/jsx-wrap-multilines': [
    'error',
    {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line'
    }
  ]
};

export const commonConfig = {
  languageOptions: {
    ...languageOptions,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  files: [ '**/*.js', '**/*.jsx', '**/*.cjs' ],
  plugins,
  settings: {
    ...importJsSettings
  },
  rules: {
    ...lintRules,
    ...formatRules,
    ...importRules,
    ...jsLintRules,
    ...jsFormatRules
  }
};

export const typescriptConfig = {
  languageOptions: {
    ...languageOptions,
    ...typescriptOptions
  },
  files: [ '**/*.ts', '**/*.tsx' ],
  plugins,
  settings: {
    ...importTsSettings
  },
  rules: {
    ...lintRules,
    ...formatRules,
    ...importRules,
    ...saRules,
    ...tsLintRules,
    ...tsFormatRules,
    ...reactHookRules
  }
};

export const reactConfig = {
  languageOptions: {
    ...languageOptions,
    ...typescriptOptions
  },
  files: [ '**/*.tsx' ],
  plugins,
  settings: {
    ...reactSettings
  },
  rules: {
    ...reactLintRules,
    ...reactTsxLintRules,
    ...reactTsxFormatRules
  }
};

export const config = [
  commonConfig,
  reactConfig,
  typescriptConfig
];
