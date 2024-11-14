module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    'react-native/react-native': true,
  },
  rules: {
    'prettier/prettier': 0,
    '@typescript-eslint/no-unused-vars': 'off',
    semi: ['error', 'never'],
    'no-extra-semi': 2,
    quotes: [2, 'single', {avoidEscape: true}],
    indent: ['error', 2],
  },
}
