module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-undef': 0,
    'no-unused-expressions': 0,
    'no-use-before-define': 0,
    'func-names': 0,
    'no-underscore-dangle': 0,
    'o-await-in-loop': 0,
    'no-restricted-syntax': 0,
    'no-await-in-loop': 0,
    'max-len': ['error', { 'code': 120 }]
  },
};
