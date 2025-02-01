module.exports = {
	plugins: ['prettier-plugin-astro', '@trivago/prettier-plugin-sort-imports'],
	printWidth: 120,
	proseWrap: 'always',
	singleQuote: true,
	useTabs: true,
	importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
};
