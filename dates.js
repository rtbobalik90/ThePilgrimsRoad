# Phase 1 Verification Report

## Release

- App version: 0.2.0
- Schema version: 1
- Migration version: 1
- Build date: July 25, 2026

## Automated result

`npm run check` passed.

The gate verified:

- Every known IndexedDB store and required index
- Ten idempotently seeded pillar records
- Check-in completion, mark, honest-line, and confession XP
- Per-pillar streak calculation
- Thirty-day grace behavior
- Edit recalculation without duplicate XP
- Preservation of future non-Phase-1 pillar fields
- Level thresholds and building tiers
- IndexedDB persistence across reopen
- Behavior-driven weather
- Prologue and forced-dim focus rules
- Fourteen-day building dimness
- Backup envelope integrity
- Ten settlement building nodes and ten building records
- GitHub project-site check-in routing
- Service-worker asset completeness

## Manual review checklist

1. Open the existing Phase 0 save and confirm onboarding data remains present.
2. Open Check-in and confirm Chapel, Hearth, Gate, and Watchtower appear first.
3. Answer the four focus rows and save.
4. Confirm the map updates, the day appears in history, and building XP changes.
5. Reopen today, change one answer, save, and confirm XP changes rather than adding a duplicate award.
6. Select a date within the last seven days and save a backfill.
7. Confirm the history row says `backfilled`.
8. Enable `Something happened`, select Watchtower or Chapel, and save a plain-language entry.
9. Reopen the app offline after one online load.
10. Confirm Settings displays `v0.2.0`.

## Known boundaries

- Building interiors and keeper dialogue remain sealed until Phase 2.
- Weekly Review and Chronicle remain sealed until Phase 3.
- The current chapter focus is the Prologue set; later chapter focus tables activate with the campaign engine.
- The 48-hour edit window begins when a check-in is first written, allowing a seven-day backfill to be corrected after entry.
