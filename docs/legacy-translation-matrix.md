# Legacy Translation Matrix

The previous single-file application is a capability reference, not a code or screen template. The Design & Narrative Bible and `DESIGN.md` remain authoritative.

| Legacy capability | Decision | New destination |
|---|---|---|
| Opening splash and begin threshold | Translate | Gate and Prologue entry |
| Name, start date, birthday | Preserve | Campaign metadata and onboarding |
| Written Vow | Merge | Three Prologue answers, declaration, Finale Vigil |
| Banner and emblem | Defer | Cosmetic identity in Phase 2 or 6 |
| Camp home screen | Translate | Settlement Map |
| Daily anchors | Translate | Daily Check-In |
| Evening Watch | Merge | Honest line, confession flow, Weekly Review |
| Keep and interiors | Translate | Ten buildings and stations |
| Steward assistant | Translate | Gate Steward and keeper conversations |
| Sixteen-land road | Retire structure | Seven chapters and territory beyond the wall |
| Portrait stages | Translate | Cosmetic pilgrim progression |
| Identity declarations | Merge | Prologue declaration and later Codex reflection |
| Armor stand | Translate | Relics and cosmetic gear |
| Trophy wall and deeds | Translate | Badges and Codex |
| Record desk | Translate | Chronicle |
| Prayer, Scripture, confession tools | Translate | Chapel and Watchtower stations |
| Letters and family records | Translate | Hearth and Great Hall records |
| Falls and battle records | Translate | Watchtower logs, Chronicle, bosses |
| Fitness and body logs | Translate | Training Yard, Granary, Health import |
| Goals, work, and tasks | Merge | Forge, Gate, quests |
| Money records | Translate | Treasury |
| Joy and hobby records | Translate | Garden |
| Real weather and geolocation | Retire | World weather derives from behavior |
| Browser-held AI key | Retire | Cloudflare Worker in Phase 4 |
| JSON export and import | Upgrade | IndexedDB backup, inspection, later restore diff |
| Manual map-pin calibration | Retire | Authoritative settlement geography |
| Full local reset | Preserve carefully | Settings danger zone |

No retired feature has been removed merely because it was difficult to migrate. Each retirement reflects a direct conflict with the new product charter or technical security model.
