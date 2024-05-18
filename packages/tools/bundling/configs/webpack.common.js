import path from 'path';

import postcssGlobalData from '@csstools/postcss-global-data';
import autoprefixer from 'autoprefixer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssCustomMedia from 'postcss-custom-media';
import postcssNested from 'postcss-nested';
import webpack from 'webpack';

import { getDirectories } from '../utilities/getDirectories.utility.js';

export const webpackCommonConfig = (params) => {
  const {
    rootDirectory,
    directories,
    postcssGlobalDataFiles
  } = params;

  const {
    sourceDirectory,
    assetsDirectory
  } = getDirectories(rootDirectory, directories);

  return {
    target: 'web',
    output: {
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: (path) => (path.endsWith('ts') || path.endsWith('tsx'))
          && (!path.includes('node_modules') || path.includes('@sa-frontend')),
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'esnext'
          }
        },
        {
          test: (path) => path.endsWith('.style.css') || path.endsWith('.styles.css'),
          use: [
            '@sa-frontend/bundling/loaders/namedCSSExport.loader.js',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  mode: 'local',
                  localIdentName: '[local]--[hash:base64:5]',
                  exportLocalsConvention: 'camelCase'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [
                    postcssNested,
                    ...Array.isArray(postcssGlobalDataFiles) && postcssGlobalDataFiles.every((file) => typeof file === 'string')
                      ? [ postcssGlobalData({ files: postcssGlobalDataFiles }), postcssCustomMedia ]
                      : [],
                    autoprefixer()
                  ]
                }
              }
            }
          ]
        },
        {
          test: (path) => !path.endsWith('.style.css') && !path.endsWith('.styles.css') && path.endsWith('.css'),
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [ autoprefixer() ]
                }
              }
            }
          ]
        },
        {
          test: (path) => !path.endsWith('.asset.svg') && path.endsWith('.svg'),
          type: 'asset/inline'
        },
        {
          test: (path) => path.endsWith('.asset.svg'),
          use: [
            {
              loader: 'esbuild-loader',
              options: {
                loader: 'jsx',
                target: 'esnext'
              }
            },
            '@sa-frontend/bundling/loaders/namedSVGExport.loader.js',
            {
              loader: 'react-svg-loader',
              options: {
                jsx: true,
                svgo: {
                  plugins: [
                    { removeViewBox: false },
                    { convertColors: { shorthex: true } },
                    { removeEmptyAttrs: false },
                    { cleanupIDs: false },
                    { removeUselessStrokeAndFill: false }
                  ]
                }
              }
            }
          ]
        },
        {
          test: /\.asset\.png$/u,
          use: [
            '@sa-frontend/bundling/loaders/namedPNGExport.loader.js',
            {
              loader: 'file-loader',
              options: {
                name: `${ assetsDirectory }/[name].[contenthash:8].[ext]`
              }
            }
          ]
        },
        {
          test: /\.bin$/u,
          loader: '@sa-frontend/bundling/loaders/namedBINExport.loader.js'
        },
        {
          test: /\.asset\.woff2$/u,
          type: 'asset/resource'
        },
        {
          test: /\.asset\.wav$/u,
          type: 'asset/resource'
        },
        {
          test: /\.node$/u,
          loader: 'node-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: path.resolve(rootDirectory, 'tsconfig.json'),
          context: path.resolve(rootDirectory)
        }
      }),
      new webpack.ProgressPlugin({ percentBy: 'entries' })
    ],
    resolve: {
      extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
      alias: {
        '@': sourceDirectory
      }
    }
  };
};
