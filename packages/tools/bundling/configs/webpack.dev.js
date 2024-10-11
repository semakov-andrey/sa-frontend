import path from 'path';

import HtmlWebpackInjectPreload from '@principalstudio/html-webpack-inject-preload';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import { TSErrorsCounterWebpackPlugin } from '../plugins/tsErrorsCounterWebpack.plugin.js';
import { getDirectories } from '../utilities/getDirectories.utility.js';

import { webpackCommonConfig } from './webpack.common.js';

export const webpackDevConfig = (config, params) => {
  const {
    rootDirectory,
    directories,
    copyPatterns,
    isHTML = true,
    isSourceMap = true,
    isHMR = true,
    isPreloadFonts = false
  } = params;

  const {
    sourceDirectory,
    htmlFileDirectory,
    assetsDirectory,
    developmentDirectory
  } = getDirectories(rootDirectory, directories);

  return merge(webpackCommonConfig(params), {
    mode: 'development',
    ...isSourceMap ? { devtool: 'source-map' } : {},
    entry: [
      ...isHMR ? [ 'webpack-hot-middleware/client?reload=true' ] : [],
      path.resolve(sourceDirectory, 'index.ts')
    ],
    output: {
      filename: 'index.js',
      path: developmentDirectory,
      assetModuleFilename: `${ assetsDirectory }/[name].[ext]`
    },
    plugins: [
      ...isHTML
        ? [
          new HtmlWebpackPlugin({
            inject: 'head',
            template: path.resolve(htmlFileDirectory, 'index.html')
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
      ...isHMR ? [ new webpack.HotModuleReplacementPlugin() ] : [],
      new (TSErrorsCounterWebpackPlugin(ForkTsCheckerWebpackPlugin))(),
      new CircularDependencyPlugin({
        exclude: /node_modules/u,
        include: /src/u,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd()
      }),
      new webpack.DefinePlugin({
        IS_PWA: JSON.stringify('false')
      })
    ]
  }, config);
};
