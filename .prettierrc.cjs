module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  importOrder: [
    '^@core/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@interfaces/(.*)$',
    '^@composables/(.*)$',
    '^@layouts/(.*)$',
    '^@pages/(.*)$',
    '^@components/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
