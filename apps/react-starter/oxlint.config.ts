import { defineConfig } from 'oxlint';

export default defineConfig({
  options: {
    typeAware: true,
    typeCheck: false,
  },
  env: {
    browser: true,
    es2024: true,
  },
  ignorePatterns: ['dist/**', 'coverage/**', 'playwright-report/**', 'test-results/**'],
  plugins: [
    'eslint',
    'typescript',
    'unicorn',
    'oxc',
    'import',
    'promise',
    'react',
    'react-perf',
    'jsx-a11y',
    'vitest',
  ],
  categories: {
    correctness: 'error',
    suspicious: 'error',
    perf: 'warn',
    pedantic: 'warn',
    style: 'warn',
  },
  settings: {
    react: {
      version: '19',
    },
    'jsx-a11y': {
      components: {
        IxButton: 'button',
      },
    },
    vitest: {
      typecheck: true,
    },
  },
  rules: {
    'no-alert': 'error',
    'no-console': ['warn', { allow: ['error', 'warn'] }],
    'no-debugger': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],

    'import/no-cycle': ['error', { ignoreTypes: true, maxDepth: 5 }],
    'import/no-duplicates': 'error',
    'import/no-unassigned-import': ['error', { allow: ['**/*.css'] }],

    'promise/no-multiple-resolved': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/param-names': 'error',
    'promise/valid-params': 'error',

    'react/exhaustive-deps': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/no-danger': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-unstable-nested-components': 'warn',
    'react/only-export-components': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/rules-of-hooks': 'error',
    'react/self-closing-comp': 'warn',

    'react-perf/jsx-no-new-array-as-prop': 'warn',
    'react-perf/jsx-no-new-function-as-prop': 'warn',
    'react-perf/jsx-no-new-object-as-prop': 'warn',

    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-is-valid': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/no-static-element-interactions': 'error',

    'typescript/consistent-type-imports': 'error',
    'typescript/no-explicit-any': 'error',
    'typescript/no-floating-promises': 'error',
    'typescript/no-misused-promises': 'error',
    'typescript/no-unnecessary-condition': 'warn',
    'typescript/no-unsafe-assignment': 'warn',
    'typescript/no-unsafe-call': 'warn',
    'typescript/no-unsafe-member-access': 'warn',
    'typescript/no-unsafe-return': 'warn',
    'typescript/prefer-nullish-coalescing': 'warn',
    'typescript/prefer-optional-chain': 'warn',
    'typescript/switch-exhaustiveness-check': 'error',

    'vitest/no-disabled-tests': 'error',
    'vitest/no-focused-tests': 'error',
    'vitest/prefer-to-be': 'warn',
    'vitest/valid-expect': 'error',
  },
  overrides: [
    {
      files: ['vite.config.ts', 'vitest.config.ts', 'oxlint.config.ts', 'oxfmt.config.ts'],
      env: {
        node: true,
      },
    },
    {
      files: ['tests/**/*.{ts,tsx}', 'src/**/*.spec.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
      env: {
        browser: true,
      },
      rules: {
        'react-perf/jsx-no-new-function-as-prop': 'off',
        'typescript/no-explicit-any': 'warn',
      },
    },
  ],
});
