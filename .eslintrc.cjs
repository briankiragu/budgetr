module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'xo',
  plugins: ['jsx-a11y'],
  overrides: [
    {
      extends: ['xo-typescript', 'plugin:jsx-a11y/recommended', 'prettier'],
      files: ['*.ts', '*.tsx'],
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  rules: {},
};
