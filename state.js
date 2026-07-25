# Current Data Contract — v0.2.0

## `days`

```js
{
  date: "YYYY-MM-DD",
  marks: { pillarId: 0 | 1 | 2 },
  honestLine: "",
  confession: null | { pillarId: "watchtower" | "chapel", text: "", ts: "ISO" },
  completed: true,
  backfilled: false,
  ts: "ISO",
  updatedAt: "ISO"
}
```

Mark values are `0 = missed`, `1 = partial`, and `2 = kept`. Unanswered non-focus pillars are omitted rather than silently marked missed.

## `pillars`

Phase 1 maintains these derived fields while preserving future keeper-system fields:

```js
{
  id,
  building,
  keeper,
  domain,
  map: { x, y },
  xp,
  level,
  tier,
  streak,
  bestStreak,
  graceUsedOn,
  lastLogDate,
  lastStreakBreakDate,
  favor,
  updatedAt
}
```

## Deterministic derivation

After every day write, the app replays the campaign calendar from `campaignStart` through today. It computes:

- Mark XP
- Check-in completion XP
- Honest-line XP
- Confession XP
- Per-pillar streaks
- Thirty-day grace cooldowns
- Levels and building tiers
- Last answered and streak-break dates

This prevents duplicate rewards and makes backfill corrections propagate accurately.

## Backup

The backup envelope remains `fb40-backup` format version `1`. All Phase 1 day and pillar data is included automatically. Import remains inspection-only until the approved restore phase.
