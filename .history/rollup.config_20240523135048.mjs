// import terser from '@rollup/plugin-terser';
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
		plugins: [typescript({
			"compilerOptions": {
			  "lib": ["dom", "dom.iterable", "esnext"],
			  "allowJs": true,
			  "skipLibCheck": true,
			  "strict": true,
			  "noEmit": true,
			  "esModuleInterop": true,
			  "strictNullChecks": false,
			  "module": "esnext",
			  "moduleResolution": "bundler",
			  "resolveJsonModule": true,
			  "isolatedModules": true,
			  "jsx": "preserve",
			  "incremental": true,
			  "plugins": [
				{
				  "name": "next"
				}
			  ],
			  "paths": {
				"@/*": ["./*"]
			  }
			},
			"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
			"exclude": ["node_modules"]
		  })]
	}]
};