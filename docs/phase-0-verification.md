# Phase 0 Verification Report

## Release

- App version: `0.1.0`
- Schema version: `1`
- Migration version: `1`
- Build date: `2026-07-25`

## Completed

- Modular application shell
- History API router with GitHub Pages fallback
- IndexedDB database and initial migration
- Complete known object-store set
- Immutable first-launch campaign start
- Prologue draft recovery and atomic completion
- Finale-date validation and change history
- Settlement Map foundation
- Four-item permanent navigation with sealed future routes
- Settings, backup export, backup inspection, reset flow
- PWA manifest, icons, service worker, offline shell
- Version and build stamps
- Dependency-free smoke gate

## Automated verification

Run `npm run check`.

The gate validates syntax, JSON, manifest requirements, store creation, indexes, persistence after reopen, campaign persistence, backup-envelope validity, settlement rendering, and project-site route generation.

## Known Phase 0 limitations

- Check-in, Review, and Chronicle are intentionally sealed.
- Buildings are not interactive.
- World state is not yet calculated.
- Backup import is inspection-only.
- Google-hosted display fonts fall back to Georgia when never previously loaded and the device is offline.
- Final settlement art will continue to evolve as tier and weather state assets are created.
