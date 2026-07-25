# Phase 0 Test Plan

## Automated ship gate

Run:

```bash
npm run check
```

The gate validates JavaScript syntax, JSON files, manifest fields, IndexedDB creation through a dependency-free test implementation, all stores and indexes, atomic onboarding writes, persistence after reopen, backup-envelope validation, and settlement rendering.

## Manual checks

1. Serve with `npm run serve`.
2. Complete the Prologue.
3. Reload and confirm the Map opens.
4. Open Provisions and export a backup.
5. Inspect the exported backup; confirm no data is imported.
6. Open Check-in, Review, and Chronicle; confirm each is sealed.
7. Install to an iPhone home screen.
8. Reopen after enabling airplane mode.
9. Verify the settlement fallback by temporarily renaming the WebP.
10. Verify the 390×844 viewport and safe-area spacing.
