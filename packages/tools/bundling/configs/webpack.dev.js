import path from 'path';

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import { TSErrorsCounterWebpackPlugin } from '@sa-frontend/bundling/plugins/tsErrorsCounterWebpack.plugin.js';

import { webpackConfigCommon } from './webpack.common.js';

export const webpackConfig = (params) => {
  const { directories } = params;

  return merge(webpackConfigCommon(params), {
    mode: 'development',
    entry: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(directories.source, 'index.ts')
    ],
    output: {
      publicPath: '/',
      filename: 'index.js',
      assetModuleFilename: `${ directories.assets }/[name].[ext]`
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'head',
        template: path.resolve(directories.source, 'presentation', 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: 'index.css'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new (TSErrorsCounterWebpackPlugin(ForkTsCheckerWebpackPlugin))()
    ]
  });
};
