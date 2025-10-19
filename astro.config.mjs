// @ts-check
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import opengraphImages, { presets } from 'astro-opengraph-images';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://veeck.de',
	integrations: [
		mdx(),
		react(),
		sitemap(),
		opengraphImages({
			options: {
				verbose: true,
			},
			render: presets.blackAndWhite,
		}),
	],
	adapter: netlify(),
	vite: {
		plugins: [yaml()],
	},
});
