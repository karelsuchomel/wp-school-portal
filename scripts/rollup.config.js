import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default [
	// browser-friendly IIFE build
	{
		input: 'js/client/client.tsx',
		output: {
			name: "mainBundle",
			file: "dist/js/client.js",
			format: 'iife'
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
			babel({
				exclude: ['node_modules/**'],
				presets: ['solid']
			}),
			commonjs(), // so Rollup can convert `ms` to an ES module
			// uglify(),
		]
	},
];
