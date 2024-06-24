// import terser from '@rollup/plugin-terser';
import { dts } from "rollup-plugin-dts";
// import typescript from 'rollup-plugin-typescript2';
import ts from "rollup-plugin-ts";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
	{
		input: 'src/main.tsx',
		output: [{
			file: 'build/bundle.js',
			format: 'cjs',
		}],
		plugins: [
			nodeResolve(), // Resolves node_modules imports
			ts({tsconfig: "tsconfig.json"})
		],
		external: ['gsap/GSDevTools']  // Mark GSDevTools as an external dependency
	},
	{
		input: 'src/main.tsx',
		output: [{
			file: 'build/bundle.d.ts',
			format: 'es'
		}],
		plugins: [dts()]
	}
	
];