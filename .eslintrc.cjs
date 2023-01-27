module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['solid', 'jsx-a11y'],
  extends: [
    'standard-with-typescript',
    'plugin:solid/typescript',
    'plugin:jsx-a11y/strict',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/dom', 'plugin:jest-dom/recommended'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.cjs', '.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'jsx-a11y': {
      components: {
        // CityInput: 'input',
        // CustomButton: 'button'
      },
    },
  },
  rules: {},
};
