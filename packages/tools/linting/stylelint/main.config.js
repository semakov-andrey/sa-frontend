export const config = {
  defaultSeverity: 'error',
  rules: {
    'at-rule-name-case': 'lower',
    'at-rule-name-space-after': 'always',
    'at-rule-semicolon-newline-after': 'always',
    'at-rule-semicolon-space-before': 'never',
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: [
          'if',
          'else'
        ]
      }
    ],
    'block-closing-brace-newline-before': 'always',
    'block-no-empty': true,
    'block-opening-brace-newline-after': 'always',
    'block-opening-brace-newline-before': 'never-single-line',
    'block-opening-brace-space-before': 'always',
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'color-named': 'never',
    'color-no-invalid-hex': true,
    'comment-empty-line-before': 'always',
    'comment-no-empty': true,
    'comment-whitespace-inside': 'always',
    'custom-property-empty-line-before': 'never',
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: [
          'consecutive-duplicates-with-different-values'
        ]
      }
    ],
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 0,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-newline-after': 'always-multi-line',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': 'never',
    'font-family-name-quotes': 'always-where-required',
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,
    'font-weight-notation': 'numeric',
    'function-calc-no-unspaced-operator': true,
    'function-comma-newline-after': 'never-multi-line',
    'function-comma-newline-before': 'never-multi-line',
    'function-comma-space-after': 'always',
    'function-comma-space-before': 'never',
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'never-multi-line',
    'function-parentheses-space-inside': 'never',
    'function-url-quotes': [
      'always',
      {
        except: [
          'empty'
        ]
      }
    ],
    'function-whitespace-after': 'always',
    'indentation': 2,
    'keyframe-declaration-no-important': true,
    'length-zero-no-unit': true,
    'max-empty-lines': 1,
    'max-nesting-depth': 3,
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-case': 'lower',
    'media-feature-name-no-unknown': true,
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'media-query-list-comma-newline-after': 'never-multi-line',
    'media-query-list-comma-newline-before': 'never-multi-line',
    'media-query-list-comma-space-after': 'always',
    'media-query-list-comma-space-before': 'never',
    'no-duplicate-at-import-rules': true,
    'no-duplicate-selectors': true,
    'no-empty-first-line': true,
    'no-empty-source': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'no-unknown-animations': true,
    'number-leading-zero': 'always',
    'number-max-precision': 3,
    'property-case': 'lower',
    'property-no-unknown': true,
    'rule-empty-line-before': [
      'always',
      {
        except: [
          'first-nested'
        ]
      }
    ],
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-quotes': 'always',
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-newline-before': 'never-multi-line',
    'selector-list-comma-space-before': 'never',
    'selector-max-attribute': 3,
    'selector-max-class': [
      3,
      {
        severity: 'warning'
      }
    ],
    'selector-max-empty-lines': 0,
    'selector-max-id': 0,
    'selector-max-pseudo-class': 3,
    'selector-max-type': 3,
    'selector-max-universal': 3,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
          'local'
        ]
      }
    ],
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-element-no-unknown': true,
    'selector-type-case': 'lower',
    'selector-type-no-unknown': true,
    'shorthand-property-no-redundant-values': true,
    'string-no-newline': true,
    'string-quotes': [
      'single',
      {
        avoidEscape: true
      }
    ],
    'unit-disallowed-list': [
      'em',
      'pt',
      'rem'
    ],
    'unit-case': 'lower',
    'unit-no-unknown': true,
    'value-keyword-case': 'lower',
    'value-list-comma-newline-after': 'never-multi-line',
    'value-list-comma-newline-before': 'never-multi-line',
    'value-list-comma-space-after': 'always',
    'value-list-comma-space-before': 'never',
    'value-list-max-empty-lines': 0
  }
};
