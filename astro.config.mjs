// @ts-check
import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://veeck.de',
	build: {
		// Example: Generate `page.html` instead of `page/index.html` during build.
		format: 'preserve',
	},
	integrations: [mdx(), react(), sitemap()],
	adapter: netlify(),
	vite: {
		plugins: [yaml()],
	},
});
