module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    es6: true
  },
  extends: ['eslint:recommended'],
  rules: {
    'semi': ['warn', 'always'],
    'quotes': ['warn', 'single'],
    'no-unused-vars': 'warn',
    'no-case-declarations': 'off'
  }
};
