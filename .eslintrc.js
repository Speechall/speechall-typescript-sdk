module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Generated code often has these issues, so we'll be lenient
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    // Allow console for SDK logging
    'no-console': 'off',
  },
  ignorePatterns: [
    'dist/**/*',
    'node_modules/**/*',
    '.openapi-generator/**/*',
    'example.js'
  ]
}; 