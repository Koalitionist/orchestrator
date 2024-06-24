// import terser from '@rollup/plugin-terser';
import { dts } from "rollup-plugin-dts";
import typescript from 'rollup-plugin-typescript2';
// import ts from "rollup-plugin-ts";

export default {
	input: 'src/main.tsx',
	output: [{
		file: 'build/bundle.js',
		format: 'cjs',
		plugins: [typescript({tsconfig: "tsconfig.json"})
		]
	}]
};