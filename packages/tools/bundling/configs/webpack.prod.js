import path from 'path';

import { ESBuildMinifyPlugin } from 'esbuild-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import { DIRECTORIES } from '../constants/directories.constant.js';
import { ROOT } from '../constants/root.constant.js';

import { webpackConfigCommon } from './webpack.common.js';

export const webpackConfig = () =>
  merge(webpackConfigCommon(), {
    mode: 'production',
    entry: [
      path.resolve(DIRECTORIES.SOURCE, 'index.ts')
    ],
    output: {
      publicPath: './',
      filename: 'index.[contenthash:8].js',
      path: DIRECTORIES.PRODUCTION,
      assetModuleFilename: `${ DIRECTORIES.ASSETS }/[name].[contenthash:8].[ext]`
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'head',
        template: path.resolve(DIRECTORIES.SOURCE, 'presentation', 'index.html'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          quoteCharacter: '"',
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeOptionalTags: false
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'index.[contenthash:8].css'
      }),
      new webpack.ProgressPlugin({ percentBy: 'entries' }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(ROOT, 'tsconfig.json'),
          context: ROOT
        }
      })
    ],
    optimization: {
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2020',
          legalComments: 'none',
          css: true
        })
      ]
    }
  });
