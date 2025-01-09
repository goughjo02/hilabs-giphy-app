## Health Innovation Labs Giphy App

see deployment here: https://hilabs-giphy-app.vercel.app/

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Nodejs version is specified in [the tool-versions file](./tool-versions)

Package manager is pnpm version 9.7.0

First, install dependencies:

```bash
pnpm install
```

## Run the app

To run local development server. add env vars as in [.env.example](./.env.example)

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
