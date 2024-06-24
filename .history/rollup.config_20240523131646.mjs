import terser from '@rollup/plugin-terser';
import { dts } from "rollup-plugin-dts";
import typescript from 'rollup-plugin-typescript2';

export default {
	input: 'src/main.tsx',
	output: [{
		file: 'build/bundle.js',
		format: 'cjs'
	},
	{
		file: 'build/bundle.min.js',
		format: 'iife',
		name: 'version',
		plugins: [terser()]
	}]
};