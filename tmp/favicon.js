import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import fg from 'fast-glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { imageSize } from 'image-size';

import packageJSON from '../../package.json' assert { type: 'json' };

import { isset, packageRoot } from './common.js';

const {
  name,
  shortName,
  themeColorDark,
  themeColorP3Light,
  themeColorP3Dark,
  config: { directories: dirs }
} = packageJSON;

export class Favicon {
  constructor(assets, hash) {
    this.manifest = {
      name,
      short_name: shortName,
      theme_color: themeColorDark,
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone'
    };
    this.icons = fg.sync(path.resolve(packageRoot, `./${ assets }/**/*`));
    this.hash = hash;
  };

  makeHash = () => {
    const bytesAmount = 4;

    return this.hash ? `.${ crypto.randomBytes(bytesAmount).toString('hex') }` : '';
  };

  pushAsset(compilation, asset) {
    compilation.assets[asset.url] = {
      source: () => asset.source,
      size: () => asset.size
    };
  };

  tapIcon(
    icon,
    compilation,
    { html, manifestIconsMacOS, manifestIconsPWA }
  ) {
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
      url: `assets/${ name }${ hash }.${ extension }`,
      source: buffer,
      size: buffer.length
    };

    this.pushAsset(compilation, asset);

    if (extension === 'ico') {
      html.push(`<link href="/${ asset.url }" rel="icon">`);
    }

    if (extension === 'svg') {
      html.push(`<link href="/${ asset.url }" rel="icon" type="image/svg+xml">`);
    }

    if (name.includes('ios')) {
      html.push(`<link href="/${ asset.url }" rel="apple-touch-icon">`);
    }

    if (name.includes('macos')) {
      manifestIconsMacOS.push({
        sizes: `${ width }x${ height }`,
        src: `/${ dirs.assets }${ name }${ hash }.${ extension }`,
        type: `image/${ extension }`,
        purpose: 'any maskable'
      });
    }

    if (name.includes('pwa')) {
      manifestIconsPWA.push({
        sizes: `${ width }x${ height }`,
        src: `/${ dirs.assets }${ name }${ hash }.${ extension }`,
        type: `image/${ extension }`,
        purpose: 'any maskable'
      });
    }
  };

  tapManifest(compilation, icons1, icons2) {
    const spaces = 2;
    const hash = this.makeHash();
    const path = `assets/manifest${ hash }.json`;
    const source1 = JSON.stringify({ ...this.manifest, icons: icons1 }, undefined, spaces);
    this.pushAsset(compilation, {
      url: `assets/manifest${ hash }.json`,
      source: source1,
      size: source1.length
    });
    if (hash === '') {
      return path;
    }
    const source2 = JSON.stringify({ ...this.manifest, icons: icons2 }, undefined, spaces);
    this.pushAsset(compilation, {
      url: `assets/manifest-pwa${ hash }.json`,
      source: source2,
      size: source2.length
    });

    return path;
  };

  apply(compiler) {
    compiler.hooks.make.tap('favicon', (compilation) => {
      const html = [];
      const manifestIconsPWA = [];
      const manifestIconsMacOS = [];
      this.icons.forEach((icon) => {
        this.tapIcon(icon, compilation, { html, manifestIconsMacOS, manifestIconsPWA });
      });
      const manifestURL = this.tapManifest(compilation, manifestIconsMacOS, manifestIconsPWA);

      HtmlWebpackPlugin
        .getHooks(compilation)
        .beforeEmit
        .tapAsync('favicon', (htmlPluginData, callback) => {
          html.push(`<link href="/${ manifestURL }" rel="manifest">`);
          html.push(`<meta name="theme-color" media="(prefers-color-scheme: light)" content="${ themeColorP3Light }">`);
          html.push(`<meta name="theme-color" media="(prefers-color-scheme: dark)" content="${ themeColorP3Dark }">`);
          html.sort((a, b) => {
            if (!isset(a[1]) || !isset(b[1])) {
              return 0;
            }

            return a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0;
          });
          if (!this.hash) html.push('<script src="https://cdn.jsdelivr.net/npm/react-render-tracker"></script>');
          htmlPluginData.html = htmlPluginData.html.replace(/(<\/head>)/iu, `${ html.join('') }$1`);
          callback(undefined, htmlPluginData);
        });
    });
  };
};
