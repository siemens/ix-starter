import baseConfig from '@siemens/prettier-config';

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  ...baseConfig,
  trailingComma: 'all',
};

export default config;
