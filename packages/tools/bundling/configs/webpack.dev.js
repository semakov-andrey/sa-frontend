import path from 'path';

import HtmlWebpackInjectPreload from '@principalstudio/html-webpack-inject-preload';
import CircularDependencyPlugin from 'circular-dependency-plugin';
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
    isHTML = true,
    isPreloadFonts = false
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
      ...isHTML && isPreloadFonts
        ? [
          new HtmlWebpackInjectPreload({
            files: [ {
              match: /.*\.woff2$/u,
              attributes: { as: 'font', type: 'font/woff2', crossOrigin: true }
            } ]
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
      new (TSErrorsCounterWebpackPlugin(ForkTsCheckerWebpackPlugin))(),
      new CircularDependencyPlugin({
        exclude: /node_modules/u,
        include: /src/u,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd()
      })
    ]
  }, config);
};
