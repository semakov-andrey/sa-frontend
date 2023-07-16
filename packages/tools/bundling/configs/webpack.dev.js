import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import { TSErrorsCounterWebpackPlugin } from '@sa-frontend/bundling/plugins/tsErrorsCounterWebpack.plugin.js';

import { DIRECTORIES as directories } from '../constants/directories.constant.js';

import { webpackCommonConfig } from './webpack.common.js';

export const webpackDevConfig = (config, params) => {
  const initialDirectories = directories(params.rootDirectory);
  const {
    directories: {
      assets = initialDirectories.assets,
      development,
      presentation = initialDirectories.presentation,
      source
    },
    copyPatterns,
    isHTML = true
  } = params;

  return merge(webpackCommonConfig(params), {
    mode: 'development',
    devtool: 'source-map',
    entry: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(source, 'index.ts')
    ],
    output: {
      filename: 'index.js',
      path: development,
      assetModuleFilename: `${ assets }/[name].[ext]`
    },
    plugins: [
      ...isHTML
        ? [
          new HtmlWebpackPlugin({
            inject: 'head',
            template: path.resolve(presentation, 'index.html')
          })
        ]
        : [],
      ...Array.isArray(copyPatterns)
        ? [
          new CopyWebpackPlugin({
            patterns: copyPatterns
          })
        ]
        : [],
      new MiniCssExtractPlugin({
        filename: 'index.css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new (TSErrorsCounterWebpackPlugin(ForkTsCheckerWebpackPlugin))()
    ]
  }, config);
};
