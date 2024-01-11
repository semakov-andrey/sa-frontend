const REACT_APP_COMMON_STRUCTURE = {
  assets: {
    file1: '(.*).asset.svg.d.ts',
    file2: '(.*).asset.png.d.ts'
  },
  constants: {
    file: '(.*).constants?.tsx?'
  },
  contexts: {
    '(.*).context': {
      file1: '\\1.constants?.tsx?',
      file2: '\\1.context.ts',
      file3: '\\1.types?.ts'
    },
    'file': '(.*).context.ts'
  },
  hooks: {
    'use(.*).hook': {
      file1: 'use\\1.constants?.tsx?',
      file2: 'use\\1.hook.ts',
      file3: 'use\\1.store.ts',
      file4: 'use\\1.types?.ts'
    },
    'file': 'use(.*).hook.ts'
  },
  stores: {
    '(.*).store': {
      file1: '\\1.constants?.tsx?',
      file2: '\\1.store.ts',
      file3: '\\1.types?.ts'
    },
    'file': '(.*).store.ts'
  },
  stories: {
    file: '(.*).stor(y|ies).ts'
  },
  styles: {
    file: '(.*).styles?.css.d.ts'
  },
  tests: {
    file: '(.*).tests?.tsx?'
  },
  types: {
    file: '(.*).types?(.d)?.ts'
  },
  utilities: {
    file: '(.*).utilit(y|ies).ts'
  }
};

const REACT_APP_INNER_STRUCTURE = JSON.parse(
  JSON.stringify(
    Object.fromEntries(
      Object.entries(REACT_APP_COMMON_STRUCTURE).map(([ key, value ]) => [ `\\4.${ key }`, value ])
    )
  ).replaceAll('\\1', '\\5')
);

const STRUCTURE = {
  src: {
    domain: {
      contracts: {
        '(.*)': {
          '\\1.constants': {
            file: '(.*).constants?.ts'
          },
          '\\1.utilities': {
            file: '(.*).utilit(y|ies).ts'
          },
          'file1': '\\1.constants?.ts',
          'file2': '\\1.utilit(y|ies).ts',
          'file3': '\\1.contracts?.ts'
        }
      },
      entities: {
        '(.*)': {
          '\\1.constants': {
            file: '(.*).constants?.ts'
          },
          '\\1.utilities': {
            file: '(.*).utilit(y|ies).ts'
          },
          '\\1.types': {
            file: '(.*).types?.ts'
          },
          'file1': '\\1.constants?.ts',
          'file2': '\\1.utilit(y|ies).ts',
          'file3': '\\1.types?.ts',
          'file4': '\\1.entit(y|ies).ts'
        }
      }
    },
    application: {
      components: {
        '(.*)': {
          file: '\\1.ts'
        }
      },
      utilities: {
        file: '(.*).utilit(y|ies).ts'
      },
      contracts: {
        '(.*)': {
          '\\1.constants': {
            file: '(.*).constants?.ts'
          },
          'file1': '\\1.constants?.ts',
          'file2': '\\1.contracts?.ts',
          'file3': '\\1.utilit(y|ies).ts'
        }
      },
      types: {
        file: '(.*).types?(.d)?.ts'
      }
    },
    presentation: {
      'common': REACT_APP_COMMON_STRUCTURE,
      '(main|pages|segments|uiKit)(/(.*).components)?': {
        '(.*)': {
          ...REACT_APP_INNER_STRUCTURE,
          file1: '\\4.asset.svg.d.ts',
          file2: '\\4.asset.png.d.ts',
          file3: '\\4.constants?.tsx?',
          file4: '\\4.contexts?.ts',
          file5: '\\4.hooks?.ts',
          file6: '\\4.stores?.ts',
          file7: '\\4.stor(y|ies).tsx?',
          file8: '\\4.styles?.css.d.ts',
          file9: '\\4.tests?.tsx?',
          file10: '\\4.types?.tsx?',
          file11: '\\4.utilit(y|ies).ts',
          file12: '\\4.tsx?'
        }
      },
      'file1': 'index.html',
      'file2': 'index.tsx'
    },
    infrastructure: {
      services: {
        '(.*)': {
          '\\1.(.*?)s': {
            '(.*).\\2': {
              '\\3.constants': {
                file: '(.*).constants?.ts'
              },
              '\\3.types': {
                file: '(.*).types?.ts'
              },
              '\\3.utilities': {
                file: '(.*).utilit(y|ies).ts'
              },
              'file1': '\\3.constants?.ts',
              'file2': '\\3.types?.ts',
              'file3': '\\3.utilit(y|ies).ts',
              'file4': '\\3.\\2.ts',
              'file5': '\\3.(.*).ts'
            },
            'file': '(.*).\\2s?.ts'
          },
          '\\1.constants': {
            file: '(.*).constants?.ts'
          },
          '\\1.types': {
            file: '(.*).types?.ts'
          },
          '\\1.utilities': {
            file: '(.*).utilit(y|ies).ts'
          },
          'file1': '\\1.constants?.ts',
          'file2': '\\1.service.ts',
          'file3': '\\1.types?.ts',
          'file4': '\\1.utilit(y|ies).ts'
        },
        'file': 'index.ts'
      }
    },
    file: 'index.ts'
  }
};

const processDir = (obj, prefix) =>
  Object.entries(obj).map(([ key, value ]) => {
    const nextPrefix = [ ...prefix ? [ prefix ] : [], key ].join('/');

    if (typeof value === 'string') {
      return [ [ ...prefix ? [ prefix ] : [], value ].join('/') ];
    }

    if (typeof value === 'object') {
      return processDir(value, nextPrefix);
    }

    return [];
  }).flat();

module.exports = {
  overrides: [
    {
      files: [ '*.ts', '*.tsx' ],
      parserOptions: {
        project: [ './packages/*/tsconfig.json' ]
      },
      rules: {
        'rulesdir/structure': [ 'error', {
          rules: processDir(STRUCTURE)
        } ]
      }
    }
  ]
};
