# React + React Query + Zustand Boilerplate

Pre-configured CRA TypeScript project featuring:

- React Query with devtools
- Zustand store with devtools and persistence
- Example data fetching (`/todos`) and a simple counter store

## Quick start

```bash
npm install
npm start
```

Open `http://localhost:3000`. React Query Devtools can be toggled from the bottom-right.

## Backend (Express + SQLite)

Run frontend and backend together:

```bash
npm run dev
```

This starts:
- Frontend on `http://localhost:3000`
- API server on `http://localhost:4000` with CRA proxy at `/api`

API endpoints:
- `GET /api/health` – health check
- `GET /api/todos` – list todos
- `POST /api/todos` – create `{ title: string }`
- `PATCH /api/todos/:id` – update `{ title?: string, completed?: boolean }`
- `DELETE /api/todos/:id` – delete

## Where things live

- `src/index.tsx`: Sets up `QueryClientProvider` and React Query Devtools


## Scripts

- `npm start`: run dev server
- `npm test`: run tests
- `npm run build`: production build
