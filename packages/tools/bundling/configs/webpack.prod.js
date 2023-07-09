import path from 'path';

import { ESBuildMinifyPlugin } from 'esbuild-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';

import { webpackCommonConfig } from './webpack.common.js';

export const webpackProdConfig = (config, params) => {
  const { directories } = params;

  return merge(webpackCommonConfig(params), {
    mode: 'production',
    entry: [
      path.resolve(directories.source, 'index.ts')
    ],
    output: {
      publicPath: '/',
      filename: 'index.[contenthash:8].js',
      path: directories.production,
      assetModuleFilename: `${ directories.assets }/[name].[contenthash:8].[ext]`
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: 'head',
        template: path.resolve(directories.source, 'presentation', 'index.html'),
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
  }, config);
};
