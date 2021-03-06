# rollup-plugin-generate-html

[![Build Status](https://travis-ci.org/zenoplex/rollup-plugin-generate-html.svg?branch=master)](https://travis-ci.org/zenoplex/rollup-plugin-generate-html)

Simple rollup plugin to generate html file.  Currently html file will be placed in same directory as the output file.
This plugin is inspired from [rollup-plugin-fill-html](https://github.com/alwaysonlinetxm/rollup-plugin-fill-html).

## Installation

```bash
npm install --save-dev @gen/rollup-plugin-generate-html
```

## Usage

```js
import html from '@gen/rollup-plugin-generate-html';

export default [{
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'umd'
  },
  plugins: [
    html({
      // specify template html (optional)
      template: './index.html',  // Default undefined
      // output filename (optional)
      filename: 'some.html', // Default index.html
      // when specified, js src will use absolute path from publicPath (optional)
      publicPath: 'dist' // Default undefined
    })
  ]
}];
```

### Advanced usage

For cases when you want to generate html file per output. This should come in handy when you want to generate book example codes and such.

```js
import glob from 'glob';
import html from '@gen/rollup-plugin-generate-html';

const configs = glob.sync('src/**/index.js').map(input => ({
  input,
  output: [{ file: input.replace(/^src/, 'dist'), format: 'umd' }],
  plugins: [html()],
}));

export default configs;
```
