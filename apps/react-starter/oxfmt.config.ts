import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  insertFinalNewline: true,
  embeddedLanguageFormatting: 'auto',
  proseWrap: 'preserve',
  ignorePatterns: ['dist/**', 'coverage/**', 'playwright-report/**', 'test-results/**'],
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
});
