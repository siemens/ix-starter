# Siemens Industrial Experience Starter Apps

[![MIT License](https://img.shields.io/badge/license-MIT-009999.svg?style=flat)](./LICENSE.md)

iX is an open-source design system for designers and developers to consistently create great digital experiences for industrial software products. This repository provides ready-to-use starter apps that can be scaffolded with [`degit`](https://github.com/Rich-Harris/degit).

<h3 align="center">
  <a href="https://github.com/siemens/ix">Main Repository</a>
  <span>-</span>
  <a href="https://ix.siemens.io">Documentation</a>
</h3>

## Scaffold a starter app

Use `degit` to copy a starter app into a new project folder without cloning the full repository history.

The current starter version is always available from `main`. Omit a tag to scaffold the current version.

| Framework | Source                 | Command                                                               |
| --------- | ---------------------- | --------------------------------------------------------------------- |
| React     | `apps/react-starter`   | `npx degit siemens/ix-starter/apps/react-starter my-ix-react-app`     |
| Vue       | `apps/vue-starter`     | `npx degit siemens/ix-starter/apps/vue-starter my-ix-vue-app`         |
| Angular   | `apps/angular-starter` | `npx degit siemens/ix-starter/apps/angular-starter my-ix-angular-app` |

## Scaffold an older version

Older starter versions are stored as repository tags. Append `#<tag>` to the starter source to scaffold a specific older version.

For example, use `#v5.0.0` to scaffold starter apps from the `v5.0.0` tag:

| Framework | Source                        | Command                                                                      |
| --------- | ----------------------------- | ---------------------------------------------------------------------------- |
| React     | `apps/react-starter#v5.0.0`   | `npx degit siemens/ix-starter/apps/react-starter#v5.0.0 my-ix-react-app`     |
| Vue       | `apps/vue-starter#v5.0.0`     | `npx degit siemens/ix-starter/apps/vue-starter#v5.0.0 my-ix-vue-app`         |
| Angular   | `apps/angular-starter#v5.0.0` | `npx degit siemens/ix-starter/apps/angular-starter#v5.0.0 my-ix-angular-app` |

The tag must exist in this repository. If a tag does not exist, `degit` will fail.

## Start development

After scaffolding a starter app, install dependencies and start the development server from the generated project folder.

```bash
cd my-ix-react-app
pnpm install
pnpm dev
```

Use the generated folder name from your selected command, for example `my-ix-vue-app` or `my-ix-angular-app`.

## Starter apps

| Framework | Starter path           | Tooling                   | Dev port |
| --------- | ---------------------- | ------------------------- | -------- |
| React     | `apps/react-starter`   | Vite + React + TypeScript | 3000     |
| Vue       | `apps/vue-starter`     | Vite + Vue + TypeScript   | 3200     |
| Angular   | `apps/angular-starter` | Angular CLI + Angular     | 4200     |

Each starter app is self-contained with its own dependencies, scripts, and build pipeline.

## Included pages

All starters include the same feature pages:

- Get Started
- Forms
- Charts with ECharts and the iX theme
- Grids with AG Grid and the iX theme
- Theme toggle for light and dark mode

## Included utilities

Each starter is configured with:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Playwright](https://playwright.dev/) for sanity E2E tests

## Available scripts

Run scripts from the generated starter app folder.

| Script          | Description                  |
| --------------- | ---------------------------- |
| `pnpm dev`      | Start the development server |
| `pnpm build`    | Build for production         |
| `pnpm lint`     | Run lint checks              |
| `pnpm test:e2e` | Run Playwright sanity tests  |

## E2E testing

```bash
pnpm install
pnpm exec playwright install
pnpm test:e2e
```

## Siemens iX packages

| Package               | Description         |
| --------------------- | ------------------- |
| `@siemens/ix`         | Core components     |
| `@siemens/ix-react`   | React bindings      |
| `@siemens/ix-vue`     | Vue bindings        |
| `@siemens/ix-angular` | Angular bindings    |
| `@siemens/ix-icons`   | Icon library        |
| `@siemens/ix-echarts` | ECharts integration |
| `@siemens/ix-aggrid`  | AG Grid integration |

## Useful links

- [Siemens iX Documentation](https://ix.siemens.io/)
- [Siemens iX GitHub](https://github.com/siemens/ix)
- [Siemens iX Community](https://community.siemens.com/c/ix/)
- [ECharts Documentation](https://echarts.apache.org/)
- [AG Grid Documentation](https://www.ag-grid.com/)

## License

MIT
