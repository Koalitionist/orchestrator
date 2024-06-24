// import terser from '@rollup/plugin-terser';
import { dts } from "rollup-plugin-dts";
// import typescript from 'rollup-plugin-typescript2';
import ts from "rollup-plugin-ts";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
	{
		input: 'src/main.tsx',
		output: [{
			file: 'build/index.js',
			format: 'es',
		}],
		plugins: [
			resolve(),
			commonjs(),
			ts({tsconfig: "tsconfig.json"})
		],
		external: [
      'gsap',
      'gsap/ScrollTrigger',
			'gsap/GSDevTools',
      'gsap/CSSPlugin',
      'lodash',
			'lil-gui',
			'tslib'
    ]
	},
	{
		input: 'src/main.tsx',
		output: [{
			file: 'build/index.d.ts',
			format: 'es'
		}],
		plugins: [dts()],
		external: [
      'gsap',
      'gsap/ScrollTrigger',
			'gsap/GSDevTools',
      'gsap/CSSPlugin',
      'lodash',
			'lil-gui',
			'tslib'
    ]
	}
	
];