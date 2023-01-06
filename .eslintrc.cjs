module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['solid', 'jsx-a11y'],
  extends: [
    'standard-with-typescript',
    'plugin:solid/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
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
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
