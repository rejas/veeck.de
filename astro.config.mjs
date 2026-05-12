// @ts-check
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import opengraphImages, { presets } from 'astro-opengraph-images';
import { defineConfig, fontProviders } from 'astro/config';
import * as fs from 'fs';

// https://astro.build/config
export default defineConfig({
	site: 'https://veeck.de',
	fonts: [
		{
			provider: fontProviders.npm(),
			name: 'Josefin Sans Variable',
			cssVariable: '--font-body',
			options: {
				package: '@fontsource-variable/josefin-sans',
			},
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Rubik',
			cssVariable: '--font-brand',
			weights: [400, 500, 600, 700],
		},
	],
	integrations: [
		mdx(),
		react(),
		sitemap(),
		opengraphImages({
			options: {
				fonts: [
					{
						name: 'Josefin Sans',
						weight: 400,
						style: 'normal',
						data: fs.readFileSync('node_modules/@fontsource/josefin-sans/files/josefin-sans-latin-400-normal.woff'),
					},
				],
			},
			render: presets.blackAndWhite,
		}),
	],
	adapter: netlify(),
	markdown: {
		syntaxHighlight: 'prism',
	},
	security: {
		csp: {
			// Allow the github-card web component's Shadow DOM style (injected at runtime via innerHTML)
			styleDirective: {
				hashes: ['sha256-uSxEZN9sUBMPnFaPosgHPV5ao5+MNCTOZFzbpd7Fn2Y='],
			},
		},
	},
	vite: {
		plugins: [yaml()],
		resolve: {
			alias: {
				beanheads: '/node_modules/beanheads/dist/beanheads.esm.js',
			},
		},
	},
});
