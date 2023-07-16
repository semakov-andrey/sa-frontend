import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import { TSErrorsCounterWebpackPlugin } from '@sa-frontend/bundling/plugins/tsErrorsCounterWebpack.plugin.js';

import { getInitialDirectories } from '../utilities/getInitialDirectories.utility.js';

import { webpackCommonConfig } from './webpack.common.js';

export const webpackDevConfig = (config, params) => {
  const initialDirectories = getInitialDirectories(params);
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
