module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 120,
  proseWrap: 'always',
  singleQuote: true,
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
