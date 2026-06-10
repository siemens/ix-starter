# Siemens Industrial Experience Starter Apps

[![MIT License](https://img.shields.io/badge/license-MIT-009999.svg?style=flat)](./LICENSE.md)

iX is an open-source design system for designers and developers to consistently create great digital experiences for industrial software products.

<h3 align="center">
  <a href="https://github.com/siemens/ix">Main Repository</a>
  <span>-</span>
  <a href="https://ix.siemens.io/docs/installation/">Quickstart</a>
  <span>-</span>
  <a href="https://ix.siemens.io/docs/introduction">Documentation</a>
  <span>-</span>
  <a href="https://community.siemens.com/c/ix/">Community</a>
</h3>

## What's inside?

This repository includes the following starter apps:

| Name | Description | Dev Port |
|------|-------------|----------|
| react-starter | Vite + React + TypeScript starter app demonstrating iX components and patterns | 3000 |
| vue-starter | Vite + Vue + TypeScript starter app demonstrating iX components and patterns | 3200 |
| angular-starter | Angular CLI + Angular starter app demonstrating iX components and patterns | 4200 |

Each app is fully self-contained (independent dependencies, scripts, and build pipeline).

## Included Pages

All starters include the same feature pages:

- Get Started
- Forms
- Charts (ECharts + iX theme)
- Grids (AG Grid + iX theme)
- Theme toggle (light/dark)

## Utilities

Each starter is already configured with:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Playwright](https://playwright.dev/) for sanity E2E tests

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) >= 9

## Build

Build any starter app by running:

```bash
cd <app-folder>
pnpm i
pnpm build
```

## Develop

Run each app independently.

### React

```bash
cd react-starter
pnpm i
pnpm dev
```

### Vue

```bash
cd vue-starter
pnpm i
pnpm dev
```

### Angular

```bash
cd angular-starter
pnpm i
pnpm dev
```

## E2E Testing

```bash
cd <app-folder>
pnpm i
pnpm exec playwright install
pnpm test:e2e
```

## Available Scripts (per app)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm lint` | Run lint checks |
| `pnpm test:e2e` | Run Playwright sanity tests |

## Siemens iX Packages

| Package | Version | Description |
|---------|---------|-------------|
| `@siemens/ix` | ^5.0.0 | Core components |
| `@siemens/ix-react` | ^5.0.0 | React bindings |
| `@siemens/ix-vue` | ^5.0.0 | Vue bindings |
| `@siemens/ix-angular` | ^5.0.0 | Angular bindings |
| `@siemens/ix-icons` | ^3.2.0 | Icon library |
| `@siemens/ix-echarts` | ^4.0.0 | ECharts integration |
| `@siemens/ix-aggrid` | ^5.0.0 | AG Grid integration |

## Useful Links

- [Siemens iX Documentation](https://ix.siemens.io/)
- [Siemens iX GitHub](https://github.com/siemens/ix)
- [Siemens iX Community](https://community.siemens.com/c/ix/)
- [ECharts Documentation](https://echarts.apache.org/)
- [AG Grid Documentation](https://www.ag-grid.com/)

## License

MIT
