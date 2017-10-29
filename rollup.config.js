import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const plugins = [
  resolve(),
  babel({ runtimeHelpers: true, exclude: 'node_modules/**' }), // need to strip flow first
  commonjs(),
];

export default [{
  input: './index.js',
  external: ['fs', 'path'],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  plugins,
}];
