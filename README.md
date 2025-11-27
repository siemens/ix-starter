/*
 * COPYRIGHT (c) Siemens AG 2018-2025 ALL RIGHTS RESERVED.
 */
# Siemens Industrial Experience Starter Apps

[![MIT License](https://img.shields.io/badge/license-MIT-009999.svg?style=flat)](./LICENSE.md)

iX is an open-source design system for designers and developers, to consistently create the perfect digital experience for industrial software products.

<h3 align="center">
  <a href="https://github.com/siemens/ix">Main Repository</a>
  <span>-</span>
  <a href="https://ix.siemens.io/docs/installation/">Quickstart</a>
  <span>-</span>
  <a href="https://ix.siemens.io/docs/introduction">
    Documentation
  </a>
  <span>-</span>
  <a href="https://community.siemens.com/c/ix/">Community</a>
</h3>


## What's inside?

This Turborepo includes the following packages/apps:

| Name          | Description                                                | Deploy |
|---------------|------------------------------------------------------------|--------|
| react-starter | Example application to show some features of the framework | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/siemens/ix-starter/tree/main/apps/react-starter) |
| angular-starter | Example application to show some features of the framework | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/siemens/ix-starter/tree/main/apps/angular-starter) |

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

#### React

```
pnpm dev --filter ix-react-starter
```


#### Angular

```
pnpm dev  --filter ix-angular-starter

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
