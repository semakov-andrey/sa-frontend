module.exports = {
  overrides: [
    {
      files: [ 'src/**/*.ts', 'src/**/*.tsx' ],
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        'rulesdir/structure': [ 'error', {
          rules: [
            'src/domain/entities/(.*)/\\1.ts',
            'src/domain/entities/(.*)/\\1.constants/(.*).constant.ts',
            'src/domain/entities/(.*)/\\1.utilities/(.*).utility.ts',
            'src/domain/entities/(.*)/\\1.(constants|utilities).ts',
            'src/domain/contracts/(.*)/\\1.constants/(.*).constant.ts',
            'src/domain/contracts/(.*)/\\1.constants.ts',
            'src/domain/contracts/(.*)/\\1.ts',
            'src/application/(.*)/\\1.ts',
            'src/application/utilities/(.*).utility.ts',
            'src/application/contracts/(.*)/\\1.constants/(.*).constant.ts',
            'src/application/contracts/(.*)/\\1.constants.ts',
            'src/application/contracts/(.*)/\\1.ts',
            'src/application/types/(.*).type(.d)?.ts',
            'src/presentation/common/assets/(.*).asset.svg.d.ts',
            'src/presentation/common/constants/(.*).constant.ts',
            'src/presentation/common/contexts/(.*)(.context/\\1)?.(constant|context|type).ts',
            'src/presentation/common/hooks/use(.*)(.hook/use\\1)?.(constant|hook|type).ts',
            'src/presentation/common/stores/(.*)(.store/\\1)?.(constant|store|type).ts',
            'src/presentation/common/stories/(.*).story.ts',
            'src/presentation/common/styles/(.*).style.css.d.ts',
            'src/presentation/common/tests/(.*).test.tsx?',
            'src/presentation/common/types/(.*).type(.d)?.ts',
            'src/presentation/common/utilities/(.*).utility.ts',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4.assets/(.*).asset.svg.d.ts',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4.constants/(.*).constant.ts',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4.contexts/(.*)(.context/\\5)?.(constant|context|type).ts',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4.hooks/use(.*)(.hook/use\\5)?.(constant|hook|type).ts',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4.stores/(.*)(.store/\\5)?.(constant|store|type).ts',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4.stories/(.*).story.ts',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4.styles/(.*).style.css.d.ts',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4.tests/(.*).test.tsx?',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4.types/(.*).type.ts',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4.utilities/(.*).utility.ts',
            'src/presentation/(main|pages|segments|uiKit)(/(.*).components)?/(.*)/\\4(.(assets.svg.d|constants|contexts|hooks|stores|stories|styles.css.d|tests|types|utilities))?.tsx?',
            'src/presentation/index.html',
            'src/presentation/index.tsx',
            'src/infrastructure/(.*)/\\1.(schemas)/(.*).(schema).ts',
            'src/infrastructure/(.*)/\\1.(utilities).ts',
            'src/infrastructure/(.*)/\\1.ts',
            'src/infrastructure/index.ts',
            'src/index.ts'
          ]
        } ]
      }
    }
  ]
};
