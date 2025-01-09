## Health Innovation Labs Giphy App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Nodejs version is specified in [the tool-versions file](./tool-versions)

Package manager is pnpm version 9.7.0

First, run the development server:

```bash
pnpm install
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
