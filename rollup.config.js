import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import buble from 'rollup-plugin-buble';
//
//
//const tsconfig = require('./tsconfig.json')
// import resolve from 'rollup-plugin-node-resolve';
// const buble = require('rollup-plugin-buble')
// /rollup-plugin-typescript
export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/log-core.js',
        name:'LogCore',
        format: 'umd'
    },
    plugins: [
         typescript(),
        commonjs(),
        buble(),
        resolve(),

    ]
};