## Health Innovation Labs Giphy App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Demo

Deployed here: https://hilabs-giphy-app.vercel.app/ (note that my api key is a beta key so limited to 100 requests per hour)

Demo video here: https://github.com/goughjo02/hilabs-giphy-app/issues/1

## Tool versions

Nodejs version is specified in [the tool-versions file](./tool-versions)

Package manager is pnpm version 9.7.0

## Setup

First, install dependencies:

```bash
pnpm install
```

## Run the app

To run local development server. add env vars as in [.env.example](./.env.example) to .env

I obviously would obviously not usually do this, but here are contents of the .env file that can get you up and running quickly

```
GIPHY_API_BASE_URL="https://api.giphy.com"
GIPHY_API_KEY="gjDuxifNFmDRPmrdKzTLrmrO3Bstchwc"
```

Then run

```
pnpm dev
```

## Storybook

Storybook used for visual development

```
pnpm storybook
```

## Unit testing

unit tests uses vitest, react-testing-library, and msw (mock service worker)

```
pnpm test
```

### notable tools

- d3 was used for animating the like button
- tailwind css was used for styling
- css variables were used for theme switching
- local storage was used to persist state across page refreshes
- infintie scrolling is achieved through a custom hook
- preview of gifs is done using iframes
- theme-toggle button animations is done via keyframes
- vitest is test runner
- react-testing-library for react-specific testing
- msw (mock service worker) acts as http interceptor in tests
- Storybook was used for component visual development
