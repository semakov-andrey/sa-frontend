import path from 'path';

import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssCustomMedia from 'postcss-custom-media';
import postcssNested from 'postcss-nested';

export const webpackConfigCommon = (rootDirectory, directories) => ({
  target: 'web',
  module: {
    rules: [
      {
        test: (path) => (path.endsWith('ts') || path.endsWith('tsx'))
          && (!path.includes('node_modules') || path.includes('@sa-frontend')),
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2020'
        }
      },
      {
        test: /\.css$/u,
        use: [
          '@sa-frontend/bundling/loaders/namedCSSExport.loader.js',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCase'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [ postcssNested, postcssCustomMedia, autoprefixer() ]
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/u,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx',
              target: 'es2020'
            }
          },
          '@sa-frontend/bundling/loaders/namedSVGExport.loader.js',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
              svgo: {
                plugins: [
                  { removeViewBox: false },
                  { convertColors: { shorthex: true } },
                  { removeEmptyAttrs: false },
                  { cleanupIDs: false },
                  { removeUselessStrokeAndFill: false }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.woff2$/u,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(rootDirectory, 'data', 'data.assets'), to: 'pokedex' }
      ]
    })
  ],
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    alias: {
      '@/data': path.resolve(rootDirectory, 'data'),
      '@': directories.source
    }
  }
});
