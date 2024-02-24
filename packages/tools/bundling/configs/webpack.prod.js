import path from 'path';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';

import { ServiceWorkerPlugin } from '../plugins/serviceWorker.plugin.js';
import { getInitialDirectories } from '../utilities/getInitialDirectories.utility.js';

import { webpackCommonConfig } from './webpack.common.js';

export const webpackProdConfig = (config, params) => {
  const initialDirectories = getInitialDirectories(params);
  const {
    directories: {
      assets = initialDirectories.assets,
      presentation = initialDirectories.presentation,
      production,
      source
    },
    copyPatterns,
    isHTML = true,
    isAnalyzeBundle = true,
    analyzeStatsFilename = 'stats.json',
    isServiceWorker = false
  } = params;

  return merge(webpackCommonConfig(params), {
    mode: 'production',
    entry: [
      path.resolve(source, 'index.ts')
    ],
    output: {
      filename: `index.[name].[contenthash:8].js`,
      path: production,
      assetModuleFilename: `${ assets }/[name].[contenthash:8].[ext]`
    },
    plugins: [
      ...isHTML
        ? [
          new HtmlWebpackPlugin({
            inject: 'head',
            template: path.resolve(presentation, 'index.html'),
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
          })
        ]
        : [],
      ...Array.isArray(copyPatterns)
        ? [
          new CopyWebpackPlugin({
            patterns: [
              ...copyPatterns,
              ...isServiceWorker
                ? [ {
                  from: path.resolve(source, '../node_modules/@sa-frontend/infrastructure/sw.js'),
                  to: 'sw.js'
                } ]
                : []
            ]
          })
        ]
        : [],
      new MiniCssExtractPlugin({
        filename: `index.[name].[contenthash:8].css`
      }),
      ...isAnalyzeBundle
        ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            defaultSizes: 'parsed',
            statsFilename: analyzeStatsFilename
          })
        ]
        : [],
      ...isServiceWorker
        ? [ new ServiceWorkerPlugin() ]
        : []
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'esnext',
          legalComments: 'none',
          css: true,
          minifyWhitespace: true,
          minifyIdentifiers: false,
          minifySyntax: true
        })
      ]
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 4096000
    }
  }, config);
};
