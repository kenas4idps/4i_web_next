This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v20 or higher)
- [pnpm](https://pnpm.io/installation) (v7.21.0 or higher)

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## About this Template

This template is a starting point for project with that requires SSR.

Things to note about this template:

- The template is based on the [Next.js App Router](https://nextjs.org/docs/app).
- This project runs with [pnpm](https://pnpm.io/installation) as the package manager.
- The preferred IDE to run this project is [VSCode](https://code.visualstudio.com/). So get one if you don't have one already.
- This project uses [Prettier](https://prettier.io/) for code formatting.
- This project uses [ESLint](https://eslint.org/) for code linting.
- This project is written in [Typescript](https://www.typescriptlang.org/).
- This project uses [husky](https://typicode.github.io/husky/get-started.html) for git hooks.
- This project uses [Tailwind CSS v4](https://tailwindcss.com/) for styling.

## Learn More

As the web is evolving, so there will be changes and as a web developer we have to adapt and keep up with those changes. Thus, even this template will need to be keep updated and maintained to adhere to the latest and modern web standards.
Here are lists of tech stack that are used in this template. Keep note of the version of each tech stack used in this template.

### 🔥🔥 Next.js App Router (v.15) 🔥🔥

We are using Next.js for the /app router and server components capabilites. Version 15 is the production-ready stable version.

Read [Next.js App Router](https://nextjs.org/docs/app) to learn more.

### 🔥🔥 Tailwind CSS (v4) 🔥🔥

We use version 4 of Tailwind CSS. We take advantages of pure CSS variables to keep our styles maintainable inside CSS.
Every styling configuration will be inside CSS and be kept in the CSS. No more JS to dictates the configuration of the styling.

Read [Tailwind CSS](https://tailwindcss.com/docs) to learn more.

### VSCode (Preferred IDE)

Please just use VSCode as your IDE.

Read [VSCode](https://code.visualstudio.com/) to learn more.

### Prettier (Opiniated code formatter)

It is required to have prettier as an extension for your VSCode.

Also added the [tailwind prettier plugin](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) to auto sort tailwind css classes.

Read [Prettier](https://prettier.io/docs/en/index.html) to learn more.

### ESLint (v9)

It is required to have ESLint as an extension for your VSCode.

Since ESLint v9 introduces the [flatCompat](https://eslint.org/docs/latest/use/configure/migration-guide#main). We have use the flatCompat to take advantage of the latest ESLint.

Read [ESLint](https://eslint.org/docs/latest/use/getting-started) to learn more.

### Typescript (v5)

Read [Typescript](https://www.typescriptlang.org/docs/handbook/intro.html) to learn more.

### Husky

We use husky to hook git with code formatting, linting, builds, and commit message linting.

- pre-commit: format code
- commit-msg: lint every commit message to adhere to [conventional commit message standard](https://www.conventionalcommits.org/en/v1.0.0/). This is to ensure that every commit message will be in the same format.
- pre-push: format code, lint code, build code before pushing to remote repo

Read [Husky](https://typicode.github.io/husky/get-started.html) to learn more.
