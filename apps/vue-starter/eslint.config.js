import vue from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  // Type-aware linting for source files
  {
    files: ['**/*.{js,ts,vue}'],
    ignores: [
      'dist',
      'node_modules',
      '*.config.ts',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs',
      'vitest.config.ts',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...vue.configs['vue3-recommended'].rules,
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['*.config.{js,ts,cjs,mjs}', 'vitest.config.ts'],
    ignores: ['dist', 'node_modules'],
    languageOptions: {
      parserOptions: {},
    },
    rules: {},
  },
];
