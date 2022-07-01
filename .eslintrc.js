module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    'max-len': ['warn', { code: 160 }],
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'max-classes-per-file': 'off',
    camelcase: 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
