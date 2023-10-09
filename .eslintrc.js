// const { error } = require("console");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react', '@typescript-eslint'
  ],
  rules: {
    semi: ['error', 'always'],
    indent: 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/no-misused-promises': ['error', {
      checksVoidReturn: false
    }],
    '@typescript-eslint/restrict-template-expressions': 'off',
    'multiline-ternary': 'off',
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/member-delimiter-style': ['off', {
      multiline: {
        delimiter: 'semi',
        requireLast: true
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false
      }
    }]
  }
};
