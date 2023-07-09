import path from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import { TSErrorsCounterWebpackPlugin } from '@sa-frontend/bundling/utilities/tsErrorsCounterWebpackPlugin.utility.js';

import { DIRECTORIES } from '../constants/directories.constant.js';
import { ROOT } from '../constants/root.constant.js';

import { webpackConfigCommon } from './webpack.common.js';

export const webpackConfig = () =>
  merge(webpackConfigCommon(), {
    mode: 'development',
    entry: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(DIRECTORIES.SOURCE, 'index.ts')
    ],
    output: {
      publicPath: '/',
      filename: 'index.js',
      assetModuleFilename: `${ DIRECTORIES.ASSETS }/[name].[ext]`
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'head',
        template: path.resolve(DIRECTORIES.SOURCE, 'presentation', 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: 'index.css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(ROOT, 'tsconfig.json'),
          context: path.resolve(ROOT)
        }
      }),
      new (TSErrorsCounterWebpackPlugin(ForkTsCheckerWebpackPlugin))(),
      new webpack.ProgressPlugin({ percentBy: 'entries' })
    ]
  });
