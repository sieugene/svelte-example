import { paraglideVitePlugin } from '@inlang/paraglide-js';
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		devtoolsJson(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
	resolve: {
		alias: {
			'@pages': path.resolve(__dirname, 'src/pages'),
			shared: path.resolve(__dirname, 'src/shared'),
			entities: path.resolve(__dirname, 'src/entities'),
			features: path.resolve(__dirname, 'src/features'),
			widgets: path.resolve(__dirname, 'src/widgets'),
			processes: path.resolve(__dirname, 'src/processes'),
			app: path.resolve(__dirname, 'src/app'),
			$lib: path.resolve(__dirname, 'src/lib')
		}
	}
});
