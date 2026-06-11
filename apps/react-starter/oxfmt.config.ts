import { defineConfig } from 'oxfmt';

export default defineConfig({
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  ignorePatterns: ['dist/**', 'coverage/**', 'playwright-report/**', 'test-results/**'],
  insertFinalNewline: true,
  jsxSingleQuote: false,
  printWidth: 100,
  proseWrap: 'preserve',
  semi: true,
  singleQuote: true,
  sortImports: {
    groups: [
      'builtin',
      'external',
      { newlinesBetween: true },
      ['internal', 'subpath'],
      { newlinesBetween: true },
      ['parent', 'sibling', 'index'],
      'style',
      'unknown',
    ],
    newlinesBetween: false,
    sortSideEffects: false,
  },
  sortPackageJson: {
    sortScripts: true,
  },
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
});
