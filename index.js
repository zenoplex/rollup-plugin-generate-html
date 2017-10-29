// @flow
import * as fs from 'fs';
import * as path from 'path';
// import cheerio from 'cheerio';
// @see https://github.com/cheeriojs/cheerio/issues/1058
const cheerio = require('cheerio');

type OutputOptions = {
  file: string,
  format: 'amd' | 'cjs' | 'es' | 'iife' | 'umd',
  name?: string,
  globals?: { [string]: string },
}

type PluginOptions = {
  template?: string,
  filename?: string,
}

type Plugin = PluginOptions => ({
  name: string,
  onwrite: OutputOptions => void,
})

const plugin: Plugin = ({ template, filename = 'index.html' } = {}) => ({
  name: 'generate-html',
  onwrite(config) {
    const { file } = config;
    const parsedPath = path.parse(file);
    const htmlPath = path.resolve(parsedPath.dir, filename);
    const src = `./${parsedPath.name}${parsedPath.ext}`;

    const $ = cheerio.load(template
      ? fs.readFileSync(template).toString()
      : '');
    const body = $('body');
    const script = `<script type="text/javascript" src="${src}"></script>\n`;
    body.append(script);

    fs.writeFileSync(htmlPath, $.html());
  },
});

export default plugin;
