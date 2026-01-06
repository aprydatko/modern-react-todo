# Modern React Todo (Pro)

Quick start and basic checks for the project. 

Demo Website: [Link](https://modern-react-todo.netlify.app)

![App Screenshot](/screenchot.png)

Screenshot: Login page for the app (place `screenchot.png` in the `public/` folder so it's included in production builds).

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm (or yarn/pnpm)

## Setup

Install dependencies:

```bash
npm install
```

## Development

Start the dev server with hot reload:

```bash
npm run dev
```

Open http://localhost:5173 (or the URL shown by Vite).

## Build & Preview

Build production assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Serve the built `dist` folder:

```bash
npm run start
```

## Tests

- Run unit tests once:

```bash
npm run test
```

- Run tests in watch mode:

```bash
npm run test:watch
```

- Update snapshot tests:

```bash
npm run test:snapshot
```

- Coverage report:

```bash
npm run test:coverage
```

- End-to-end tests (Playwright):

```bash
npm run test:e2e
```

Note: Playwright may require browsers to be installed; run `npx playwright install` if needed.

## General project check

A single script runs basic checks (typecheck, unit tests, and build):

```bash
npm run check
```

What `check` does:

- Runs `lint` (project TypeScript check via `tsc --noEmit`)
- Runs unit tests (`npm run test`)
- Runs a production build (`npm run build`)

Use this before creating PRs or CI jobs to ensure the project is healthy.

## Notes

- Type information and static checks are performed by `tsc` via the `lint` script.
- Adjust Node version or commands to match your environment or CI.

---

If you want, I can add a CI configuration (GitHub Actions) to run `npm run check` automatically.

