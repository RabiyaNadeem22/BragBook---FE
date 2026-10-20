# BragBook Client

The client is the React single-page application for BragBook, a career and achievement tracking platform. It lets signed-in users manage achievements, projects, skills, goals, feedback, and career activity.

## Tech stack

- React 18 and JavaScript (ES modules)
- Vite 6 for development and production builds
- React Router for navigation
- TanStack Query for server state
- Tailwind CSS for styling
- React Hook Form and Zod for forms and validation
- Recharts for analytics visualizations
- Lucide React for icons

## Requirements

- Node.js 20 or newer
- npm
- The BragBook server running locally for API-backed features

## Install and run

From this directory:

```bash
npm install
npm run dev
```

Vite serves the app at [http://localhost:5173](http://localhost:5173). The Vite configuration proxies `/api` requests to `http://localhost:5000`, so start the server separately.

Useful commands:

```bash
npm run dev       # Start the local development server
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
```

## API configuration

By default, API calls use the relative `/api` path. During local development, Vite proxies this path to the server at `http://localhost:5000`.

To use a different API base URL, set `VITE_API_URL` in a client `.env` file, for example:

```env
VITE_API_URL=https://api.example.com/api
```

The API client sends cookies with requests; the server must allow credentialed requests from the client origin.

## Application structure

```text
src/
├── api/           # API client and resource-specific request helpers
├── components/ui/ # Shared UI components
├── context/       # Authentication and theme providers
├── layouts/       # Auth and signed-in application layouts
├── pages/         # Login, dashboard, achievements, projects, skills, goals, etc.
├── routes/        # Public and protected route definitions
├── utils/         # Validation and formatting helpers
├── App.jsx        # Query, theme, auth, and router providers
├── main.jsx       # Browser entry point
└── index.css      # Global styles and theme tokens
```

The application includes public login and registration routes. Dashboard, achievements, projects, skills, goals, feedback, timeline, analytics, and settings are behind the authentication guard.

## Production build

Run `npm run build` to generate static assets in `dist/`. Deploy those assets to a static host configured to serve `index.html` for client-side routes, and configure `VITE_API_URL` for the deployed API when it is not served from the same origin.
