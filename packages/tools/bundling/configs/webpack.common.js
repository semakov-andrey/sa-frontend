import path from 'path';

import autoprefixer from 'autoprefixer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssCustomMedia from 'postcss-custom-media';
import postcssNested from 'postcss-nested';
import webpack from 'webpack';

export const webpackCommonConfig = (params) => {
  const {
    rootDirectory,
    directories
  } = params;

  return {
    target: 'web',
    module: {
      rules: [
        {
          test: (path) => (path.endsWith('ts') || path.endsWith('tsx'))
          && (!path.includes('node_modules') || path.includes('@sa-frontend')),
          loader: 'esbuild-loader',
          options: {
            loader: 'tsx',
            target: 'es2020'
          }
        },
        {
          test: /\.styles\.css$/u,
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
                  plugins: [ postcssNested, postcssCustomMedia, autoprefixer() ]
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
                target: 'es2020'
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
                name: `${ directories.assets }/[name].[contenthash:8].[ext]`
              }
            }
          ]
        },
        {
          test: /\.asset\.woff2$/u,
          type: 'asset/resource'
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
      extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 4096000
    }
  };
};
