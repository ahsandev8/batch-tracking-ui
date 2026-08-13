# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  # Batch Tracking UI

  A small React + TypeScript UI for creating and tracking processing batches. Built with Vite, Axios, Zustand and a lightweight toast notification system.

  Features

  - Create and list batches
  - Update batch status
  - Global API error handling with toast notifications

  Requirements

  - Node.js 18+ and npm or yarn

  Environment

  Create a `.env` file in the project root with the API base URL:

```

VITE_API_URL=http://127.0.0.1:8000

````

Project scripts

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

Setup

1. Install dependencies:

```bash
npm install
````

2. Add `.env` as above.

3. Start dev server:

```bash
npm run dev
```

API notes

- Base URL is read from `src/config/env.ts` via `VITE_API_URL`.
- Requests attach an `Authorization` header when `localStorage` contains the `batch-tracking-auth` key (see `src/api/axios.ts`).
- Main endpoints used by the UI:
  - `POST /batch/` — create batch (expects JSON `{ sample_id, batch_type, submitted_by }`)
  - `GET /batch/` — list batches
  - `GET /batch/:id` — get batch details
  - `PUT /batch/:id` — update batch

Notifications

- The app includes a simple toast system. API errors are shown automatically as error toasts. You can find the implementation in `src/components/Toast` and the service at `src/utils/toastService.ts`.

Contributing

Feel free to open issues or PRs. For development, follow the standard Git workflow and run linting before committing.

License

This project is provided as-is.
