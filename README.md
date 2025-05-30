# Todo using Convex

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Convex, and more.

## Why?

I wrote this on an evening in May 2025 because I wanted to better understand how to use Convex and apply how the web-sockets based backend works in a real world application. In particular, I learned a lot about how to use the `useQuery` and `useMutation` hooks to fetch and mutate data from the backend. I also learned a lot about how to use the `useDebouncedCallback` hook to debounce the input of the user so that the backend is not hit with every keystroke and appears more responsive to the user. I also learned a lot about how to use the `useEffect` hook to fetch data from the backend and update the UI when the data changes.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Convex** - Reactive backend-as-a-service platform
- **Biome** - Linting and formatting
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
bun install
```

## Convex Setup

This project uses Convex as a backend. You'll need to set up Convex before running the app:

```bash
bun dev:setup
```

Follow the prompts to create a new Convex project and connect it to your application. Once you have the `CONVEX_URL` set `.env.local` in your application directory (e.g. `apps/web/.env.local`) per the example in the `apps/web/.env.example` file.

## Development

```bash
bun dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application. Your app will connect to the Convex cloud backend automatically provided you have the `CONVEX_URL` and `CONVEX_TOKEN` environment variables set.

## Production

> [!NOTE]
> In Vercel, you need to specify custom build instructions to build the web application.

```bash
cd ../../packages/backend && npx convex deploy --cmd 'cd ../../apps/web && turbo run build' --cmd-url-env-var-name NEXT_PUBLIC_CONVEX_URL
```

![Vercel Build Instructions](./docs/img/build_instructions.png)

You also need to specify the `CONVEX_DEPLOY_KEY` environment variable in Vercel.

> [!NOTE]
> The `CONVEX_DEPLOY_KEY` is a secret key that is used to deploy the web application without needing to enter the password to authenticate to Convex. You can get it from the Convex dashboard.


![Vercel Environment Variables](./docs/img/deploy_instructions.png)


## Project Structure

```
todo/
├── apps
│   └── web
│       └── src
│           ├── app
│           ├── components
│           │   ├── todo
│           │   └── ui
│           ├── context
│           ├── functions
│           └── lib
├── docs
└── packages
    └── backend
        └── convex
            └── _generated
```

