# Phase 0 Architecture

Full by 40 is a no-framework, offline-first PWA. The application shell is split into core state, data/migrations, UI modules, static configuration, and testing.

## Runtime flow

1. `js/main.js` opens IndexedDB.
2. `ensureFirstBootMetadata` stamps the immutable campaign start.
3. App state is loaded from `meta` and `campaign`.
4. The router guards unfinished onboarding.
5. The shell renders once; routes replace only `#view`.
6. The service worker caches the Phase 0 shell.

## Route strategy

The application uses the History API. `404.html` preserves deep links on GitHub Pages by returning the requested route through `sessionStorage`. For a project repository, keep `PATH_SEGMENTS_TO_KEEP = 1`. For a custom domain rooted at `/`, change it to `0`.

## Data rules

- The database name is `fb40`.
- Schema changes occur only through `js/data/migrate.js`.
- `campaignStart` is written once.
- Date-only values use `YYYY-MM-DD`.
- Operational time-zone calculations use `America/Chicago`.
- Backup export includes all stores, even stores not yet active.
