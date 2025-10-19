// @ts-check
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import opengraphImages, { presets } from 'astro-opengraph-images';
import { defineConfig } from 'astro/config';
import * as fs from 'fs';

// https://astro.build/config
export default defineConfig({
	site: 'https://veeck.de',
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
	vite: {
		plugins: [yaml()],
	},
});
