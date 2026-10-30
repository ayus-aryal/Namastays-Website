module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.next', 'next-env.d.ts', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  overrides: [
    { files: ['src/lib/__tests__/**'], rules: { '@typescript-eslint/no-non-null-assertion': 'off' } },
  ],
}
