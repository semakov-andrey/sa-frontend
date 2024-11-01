import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import fg from 'fast-glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { imageSize } from 'image-size';

import { isset } from '../utilities/typeGuards.utility.js';

/*
 * Favicon file names:
 * - favicon.ico - safari
 * - favicon.svg - macbook touchbar grayscale icon
 * - favicon.ios.180x180.png - ios app icon (apple touch icon)
 * - favicon.macos.192x192.png - macos app icon
 * - favicon.macos.512x512.png - macos app icon
 */

export class FaviconPlugin {
  constructor(params) {
    const {
      faviconsDirectory,
      assetsDirectory,
      hash,
      themeColors,
      manifest: {
        name = 'application',
        shortName = 'app',
        themeColor = '#000000'
      } = {}
    } = params ?? {};
    this.manifest = {
      name,
      short_name: shortName,
      theme_color: themeColor,
      background_color: '#000000',
      start_url: '/',
      display: 'standalone'
    };
    this.assetsDirectory = assetsDirectory;
    this.icons = fg.sync(path.resolve(faviconsDirectory, `./**/*`));
    this.hash = hash;
    this.themeColors = themeColors;
  };

  html = [];

  manifestIcons = [];

  makeHash = () => {
    const bytesAmount = 4;

    return this.hash ? `.${ crypto.randomBytes(bytesAmount).toString('hex') }` : '';
  };

  pushAsset = (compilation, asset) => {
    compilation.assets[asset.url] = {
      source: () => asset.source,
      size: () => asset.size
    };
  };

  tapIcon = (icon, compilation) => {
    let buffer;

    try {
      buffer = fs.readFileSync(icon);
    } catch (e) {
      throw new Error(e);
    }

    const { width, height, type: extension } = imageSize(buffer);
    const name = path.basename(icon, `.${ extension }`);
    const hash = this.makeHash();
    const asset = {
      url: `${ this.assetsDirectory }/${ name }${ hash }.${ extension }`,
      source: buffer,
      size: buffer.length
    };

    this.pushAsset(compilation, asset);

    if (extension === 'ico') {
      this.html.push(`<link href="/${ asset.url }" rel="icon">`);
    }

    if (extension === 'svg') {
      this.html.push(`<link href="/${ asset.url }" rel="icon" type="image/svg+xml">`);
    }

    if (name.includes('ios')) {
      this.html.push(`<link href="/${ asset.url }" rel="apple-touch-icon">`);
    }

    if (name.includes('macos')) {
      this.manifestIcons.push({
        sizes: `${ width }x${ height }`,
        src: `/${ this.assetsDirectory }/${ name }${ hash }.${ extension }`,
        type: `image/${ extension }`,
        purpose: 'any maskable'
      });
    }
  };

  tapManifest(compilation) {
    const spaces = 2;
    const hash = this.makeHash();
    const path = `${ this.assetsDirectory }/manifest${ hash }.json`;
    const source = JSON.stringify(
      { ...this.manifest, icons: this.manifestIcons },
      undefined,
      spaces
    );
    this.pushAsset(compilation, {
      url: `${ this.assetsDirectory }/manifest${ hash }.json`,
      source,
      size: source.length
    });
    this.html.push(`<link href="/${ path }" rel="manifest">`);
  };

  apply(compiler) {
    compiler.hooks.make.tap('favicon', (compilation) => {
      this.icons.forEach((icon) => {
        this.tapIcon(icon, compilation);
      });
      this.tapManifest(compilation);

      HtmlWebpackPlugin
        .getHooks(compilation)
        .beforeEmit
        .tapAsync('favicon', (htmlPluginData, callback) => {
          if (isset(this.themeColors)) {
            this.html.push(`<meta name="theme-color" media="(prefers-color-scheme: light)" content="${ this.themeColors.light }">`);
            this.html.push(`<meta name="theme-color" media="(prefers-color-scheme: dark)" content="${ this.themeColors.dark }">`);
          }
          this.html.sort((a, b) => {
            if (!isset(a[1]) || !isset(b[1])) {
              return 0;
            }
            return a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0;
          });
          htmlPluginData.html = htmlPluginData.html.replace(/(<\/head>)/iu, `${ this.html.join('') }$1`);
          callback(undefined, htmlPluginData);
        });
    });
  };
};
