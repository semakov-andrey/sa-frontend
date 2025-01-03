import path from 'path';

import HtmlWebpackInjectPreload from '@principalstudio/html-webpack-inject-preload';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';

import { FaviconPlugin } from '../plugins/favicon.plugin.js';
import { ServiceWorkerPlugin } from '../plugins/serviceWorker.plugin.js';
import { getDirectories } from '../utilities/getDirectories.utility.js';
import { isset } from '../utilities/typeGuards.utility.js';

import { webpackCommonConfig } from './webpack.common.js';

export const webpackProdConfig = (config, params) => {
  const {
    rootDirectory,
    directories,
    copyPatterns,
    isHTML = true,
    isPreloadFonts = false,
    isAnalyzeBundle = true,
    analyzeStatsFilename = 'stats.json',
    isServiceWorker = false,
    serviceWorkerPath,
    serviceWorkerName = 'sw.js',
    serviceWorkerFilter,
    isPWA = false,
    pwaManifest
  } = params;
  const publicPath = config.output?.publicPath ?? '/';

  const {
    sourceDirectory,
    htmlFileDirectory,
    faviconsDirectory,
    assetsDirectory,
    productionDirectory
  } = getDirectories(rootDirectory, directories);

  return merge(webpackCommonConfig(params), {
    mode: 'production',
    entry: [
      path.resolve(sourceDirectory, 'index.ts')
    ],
    output: {
      filename: `index.[name].[contenthash:8].js`,
      path: productionDirectory,
      assetModuleFilename: `${ assetsDirectory }/[name].[contenthash:8].[ext]`
    },
    plugins: [
      ...isHTML
        ? [
          new HtmlWebpackPlugin({
            inject: 'head',
            template: path.resolve(htmlFileDirectory, 'index.html'),
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
      ...isHTML && isPreloadFonts
        ? [
          new HtmlWebpackInjectPreload({
            files: [ {
              match: /.*\.woff2$/u,
              attributes: { as: 'font', type: 'font/woff2' }
            } ]
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
                  from: serviceWorkerPath ?? path.resolve(rootDirectory, 'node_modules/@sa-frontend/infrastructure/sw.js'),
                  to: serviceWorkerName
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
        ? [ new ServiceWorkerPlugin({ filename: serviceWorkerName, publicPath, filter: serviceWorkerFilter }) ]
        : [],
      ...isHTML && isPWA && isset(pwaManifest)
        ? [ new FaviconPlugin({ faviconsDirectory, assetsDirectory, hash: true, manifest: pwaManifest }) ]
        : [],
      new webpack.DefinePlugin({
        IS_PWA: JSON.stringify(isPWA ? 'true' : 'false')
      })
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
