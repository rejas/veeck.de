import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: ['dist/', '.astro/', '.netlify/', 'node_modules/', 'public/', 'src_old/', 'todo/'],
	},
	...eslintPluginAstro.configs.recommended,
	{
		// Parse the TypeScript used in Astro component frontmatter.
		files: ['**/*.astro'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
		rules: {
			// override/add rules settings here, such as:
			// "astro/no-set-html-directive": "error"
		},
	},
];
