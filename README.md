# Full by 40 — The Pilgrim’s Road

Phase 0 foundation for a persistent, offline-capable life campaign.

## What is included

- Modular HTML, CSS, and JavaScript
- IndexedDB schema and migration runner
- Immutable first-launch campaign start
- Prologue data capture
- GitHub Pages-compatible routing
- Installable PWA shell
- Offline caching
- Settlement-map foundation
- Settings, backup export, backup inspection, and local reset
- Dependency-free IndexedDB and module smoke gate

Phase 0 does **not** fake check-ins, XP, levels, buildings, chapters, keepers, quests, or bosses.

## Product source documents

The authoritative Design & Narrative Bible, visual specification, master build prompt, and legacy translation matrix are preserved under `docs/`. The previous single-file application is intentionally not part of the runtime repository.

## Run locally

```bash
npm run serve
```

Open the URL printed in the terminal.

## Run the ship gate

```bash
npm run check
```

No package installation is required. The smoke harness uses a dependency-free in-memory IndexedDB implementation to exercise the production data modules in Node.

## Upload to GitHub

1. Upload the complete repository contents, preserving folders.
2. Open **Settings → Pages** in GitHub.
3. Deploy from the repository root of the selected branch.
4. Keep `PATH_SEGMENTS_TO_KEEP = 1` in `404.html` for a normal GitHub project site.
5. Change it to `0` only when the app is hosted at the root of a custom domain.

## Version

- App: 0.1.0
- Schema: 1
- Migration: 1
- Build date: July 25, 2026
