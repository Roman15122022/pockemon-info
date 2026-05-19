# PokeAPI Explorer

Single-page React application for browsing Pokemon with PokeAPI.

## Tech stack

- React
- TypeScript
- Vite
- MUI
- Zustand
- Axios

## Scripts

```bash
npm install
npm run dev
npm run build
```

The app runs against `https://pokeapi.co/api/v2` and keeps favorite Pokemon in browser storage.

## Implementation notes

- The interface follows the provided reference: top title bar, search/filter controls, card grid, pagination, and a right-side details drawer.
- Favorite persistence is isolated behind a storage service (`favoritesStorageService` over `localStorageService`). If the persistence layer changes later, the Zustand store should not need to know whether data comes from `localStorage`, IndexedDB, or an API.
- Favorite storage is validated on startup, so broken saved data is ignored instead of breaking the app.
- Pokemon without artwork use a simple fallback placeholder.
