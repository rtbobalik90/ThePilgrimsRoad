# Current Architecture — v0.2.0

## Boot sequence

1. Load and validate `/data/config.json` once.
2. Open IndexedDB database `fb40`.
3. Run any required schema migrations.
4. Stamp immutable first-boot metadata when absent.
5. Seed or reconcile the ten pillar records without replacing future keeper fields.
6. Rebuild Phase 1 derived progress from stored day records.
7. Load metadata, campaign state, pillars, and days.
8. Render the routed application shell.
9. Register the versioned offline service worker.

## Daily write path

1. The Check-In sheet loads the selected date.
2. Focus pillars are computed from the Prologue focus set plus dimmed buildings.
3. The user answers required focus rows and may answer the remaining pillars.
4. The day record is written once to the `days` store.
5. Pillar XP, streaks, grace use, levels, tiers, and last-log dates are rebuilt chronologically.
6. The refreshed state renders the updated settlement and weather.

Rebuilding derived data is intentional. Editing or backfilling a date cannot award the same action twice or leave later multipliers stale.

## Runtime boundaries

- `js/core/` — configuration, database, state, routing, dates, events, logging, versioning
- `js/data/` — schema, migration, backups, static pillar definitions
- `js/systems/` — XP, streaks, levels, check-in derivation, world state
- `js/ui/` — shell, map, onboarding, check-in, Settings, sheets, sealed screens
- `styles/` — visual tokens and screen-specific styling
- `tools/` — local server and ship-gate harness

## Offline behavior

The service worker caches the complete v0.2.0 application shell. Check-ins, backfills, XP, streaks, world state, map rendering, history, Settings, and backups remain local and available without AI or network access.
