module.exports = {
  extends: ['airbnb-typescript/base'],
  globals: {
    describe: false,
    expect: false,
    it: false,
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    '@typescript-eslint/semi': ['error', 'never'],
    'consistent-return': 'off',
    'import/no-dynamic-require': 'off',
    'import/extensions': 'off',
    'global-require': 'off',
    'max-len': ['warn', 120],
    'object-curly-newline': 'off',
    'import/prefer-default-export': 'off',
  },
}
