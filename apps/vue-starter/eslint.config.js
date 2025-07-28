import vue from 'eslint-plugin-vue';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  // Type-aware linting for Vue SFCs
  {
    files: ['**/*.vue'],
    ignores: [
      'dist',
      'node_modules',
      '*.config.ts',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs',
      'vitest.config.ts',
      '**/*.d.ts',
    ],
    languageOptions: {
      parser: require.resolve('vue-eslint-parser'),
      parserOptions: {
        parser: {
          ts: tsParser,
        },
        project: './tsconfig.app.json',
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
  // Type-aware linting for other source files
  {
    files: ['**/*.{js,ts}'],
    ignores: [
      'dist',
      'node_modules',
      '*.config.ts',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs',
      'vitest.config.ts',
      '**/*.d.ts',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.app.json',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
    },
    rules: {
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
