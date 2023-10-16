module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 0,
    eqeqeq: 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-multiple-empty-lines':'warn',
    'keyword-spacing':'warn'
  },
}
