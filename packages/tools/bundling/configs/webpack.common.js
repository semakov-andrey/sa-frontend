import path from 'path';

import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssCustomMedia from 'postcss-custom-media';
import postcssNested from 'postcss-nested';

import { DIRECTORIES } from '../constants/directories.constant.js';
import { ROOT } from '../constants/root.constant.js';

export const webpackConfigCommon = () => ({
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
          path.resolve(ROOT, 'compiler', 'loaders', 'namedCSSExport.loader.js'),
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
          path.resolve(ROOT, 'compiler', 'loaders', 'namedSVGExport.loader.js'),
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
        { from: path.resolve(ROOT, 'data', 'data.assets'), to: 'pokedex' }
      ]
    })
  ],
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
    alias: {
      '@/data': path.resolve(ROOT, 'data'),
      '@': DIRECTORIES.SOURCE
    }
  }
});
