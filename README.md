# Pokemons

A Pokémon browser built with React 19 and a local JSON API.

## Stack

| Tool                                                   | Version | Purpose                      |
| ------------------------------------------------------ | ------- | ---------------------------- |
| [Vite](https://vite.dev)                               | 8       | Build tool & dev server      |
| [React](https://react.dev)                             | 19      | UI framework                 |
| [TypeScript](https://www.typescriptlang.org)           | 5.9     | Type safety                  |
| [Tailwind CSS](https://tailwindcss.com)                | 4       | Utility-first styling        |
| [shadcn/ui](https://ui.shadcn.com)                     | —       | Component library            |
| [TanStack Query](https://tanstack.com/query)           | 5       | Server state & data fetching |
| [Zustand](https://zustand-demo.pmnd.rs)                | 5       | Client state (theme mode)    |
| [Zod](https://zod.dev)                                 | 4       | Schema validation            |
| [json-server](https://github.com/typicode/json-server) | 1 beta  | Local REST API               |
| [Vitest](https://vitest.dev)                           | 4       | Unit testing                 |

**Tooling:** ESLint (strict TypeScript + React rules), Prettier (with Tailwind class sorting), pnpm.

## Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io) 10 — `npm install -g pnpm`

## Getting Started

```bash
pnpm install

# Terminal 1 — start the JSON API (http://localhost:3000)
pnpm json-server

# Terminal 2 — start the dev server
pnpm dev
```
