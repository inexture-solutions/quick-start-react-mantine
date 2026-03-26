# React Quick starter - Typescript

Production-ready React starter with **Inexture** UI (Mantine-based), **Redux Toolkit** and **RTK Query**, **React Router**, **Tailwind CSS**, and **Vite**. Intended as a modern alternative to Create React App–style setups, with routing, persistence, and tests wired in.

## Requirements

- [Node.js](https://nodejs.org/) 20+ (or current LTS)
- [Bun](https://bun.sh/) (used in examples below; `npm`, `pnpm`, or `yarn` work with the same scripts)

## Quick start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) (see `vite.config.ts`).

## Scripts

| Script          | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| `dev`           | Start Vite dev server                                                         |
| `build`         | Typecheck (`tsc`) and production build to `build/`                            |
| `preview`       | Preview the production build                                                  |
| `lint`          | ESLint on `ts` / `tsx` (zero warnings enforced)                               |
| `format`        | Prettier, write                                                               |
| `format:check`  | Prettier, check only                                                          |
| `test`          | Vitest (watch)                                                                |
| `test:run`      | Vitest single run                                                             |
| `test:ui`       | Vitest UI                                                                     |
| `test:coverage` | Vitest with coverage                                                          |
| `validate`      | `lint` + `format:check` + `test:run` (full gate)                              |
| `staged`        | Run [lint-staged](https://github.com/lint-staged/lint-staged) (see Git hooks) |

## Stack

- **React 19** + **TypeScript**
- **Vite 8** (dev server port `3000`, build output `build/`)
- **@inexture/core** (Mantine ecosystem), **@inexture/icons**, **@inexture/modals**
- **Redux Toolkit**, **RTK Query**, **react-redux**
- **redux-persist** (+ encrypt transform)
- **React Router 7**
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **Vitest**, **Testing Library**, **jsdom**
- **ESLint 10**, **Prettier 3**

Path aliases (see `vite.config.ts` / `tsconfig.json`): `@`, `@components`, `@assets`, `@utils`, `@services`, etc.

## Git hooks (Husky + lint-staged)

After `bun install`, the `prepare` script enables Husky. **pre-commit** runs **[lint-staged](https://github.com/lint-staged/lint-staged)**, configured in [`lint-staged.config.mjs`](./lint-staged.config.mjs) to run **`bun run validate`** when there is at least one staged file (lint, format check, tests on the whole repo).

**lint-staged vs [nano-staged](https://github.com/usmanyunusov/nano-staged):** nano-staged is much smaller and a bit faster in its own micro-benchmarks; **lint-staged** is the more common choice, with **more granular control** (stash backup/revert, concurrency, `--diff` / monorepo-style setups, richer docs and examples). For “only run ESLint/Prettier on staged files,” both work; this template uses a function config so `validate` runs **without** appending filenames to the command.

To run the same check manually:

```bash
bun run validate
```

To run lint-staged alone (e.g. to mirror the hook):

```bash
bun run staged
```

## Project layout (high level)

- `src/` — application code (pages, components, store, services, assets)
- `src/__tests__/` — Vitest tests and shared test utilities
- `vitest.config.ts` — Vitest + jsdom + path aliases
- `eslint.config.js` — flat ESLint config

### Tests (`__tests__`)

For this template, **all specs live under `src/__tests__/`** so the test layout is easy to see in one place.

**Recommendation for your own work:** colocate tests with the code they cover. For example, put `ContactPage` tests next to the page:

`src/pages/contact/__tests__/ContactPage.test.tsx`

The same idea applies to components, layouts, store slices, and services (`src/components/.../__tests__/`, `src/store/.../__tests__/`, and so on). Shared helpers (e.g. custom `render`, mock data) can stay in `src/__tests__/utils/` or a similar shared folder.

## License

MIT — see [`package.json`](./package.json) for `author` / metadata.
