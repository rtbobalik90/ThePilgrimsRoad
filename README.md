# Full by 40 — The Pilgrim's Road

A four-year journey from 36 to 40, played as a pilgrimage through sixteen lands. Phase 1.

## Deploy (GitHub Pages)

1. Create a new **public** repo (e.g. `pilgrims-road`)
2. Upload `index.html` to the repo root
3. Settings → Pages → Deploy from branch → `main` / root
4. Open `https://<username>.github.io/pilgrims-road/` and bookmark it in Safari

## Security rules (written in blood)

- The Anthropic API key is pasted once into **Pack → Mentor Key** on each device. It is stored in `localStorage` under its own key, shown masked, and is on a hard exclusion list.
- **Never** put the key (or a GitHub token) anywhere in this repo. GitHub scans public repos and Anthropic auto-revokes leaked keys.
- Exports (`Pack → Export journey`) contain journey data only — secrets are excluded automatically by an allow-list.
- Cloud sync arrives in a later phase and will be **encrypted on-device** before anything touches a Gist. Until then: export often.

## Adding artwork

The map and territory panels work with zero images (SVG world built in). To make it cinematic, add painterly art to an `/art` folder in the repo — the app lazy-loads each file automatically and silently skips any that don't exist.

**Filenames:**
- `art/land_01.webp` through `art/land_16.webp` — the sixteen lands
- `art/keep.webp` — the castle home base (wide establishing shot, replaces the built-in SVG castle)
- `art/b_chapel.webp`, `b_watchtower.webp`, `b_hall.webp`, `b_yard.webp`, `b_treasury.webp`, `b_hearth.webp`, `b_forge.webp`, `b_granary.webp`, `b_garden.webp`, `b_vault.webp` — building interiors, shown when you enter each one
**Size:** 1200×675 (16:9), WebP, aim under 150KB each (any image tool or squoosh.app can convert/compress)

### Style prefix — paste before every prompt for a consistent world

> Dark oil painting, 17th-century romantic landscape style, moody chiaroscuro torchlight, amber and iron color palette, parchment haze, lone pilgrim figure with a pack seen from behind, cinematic, no text, no modern objects

### The sixteen prompts

1. **City of Destruction** — a smoking grey city at dusk seen from a hill outside its walls, one road leading away toward distant light, the pilgrim taking his first step
2. **Slough of Despond** — a black mire under fog, a man waist-deep reaching for stepping stones that glow faintly gold
3. **The Wicket Gate** — a small narrow wooden gate in a high stone wall, warm lantern above it, dark woods on either side
4. **Interpreter's House** — a candlelit stone hall with tall windows, dust in the light beams, mysterious framed scenes on the walls
5. **The Cross & the Tomb** — a hilltop cross at dawn, a heavy burden rolling down the slope into an open sepulchre, sunrise breaking
6. **Hill Difficulty** — a steep switchback trail up a rocky mountainside, two easier false paths splitting off into shadow
7. **Palace Beautiful** — a fortified palace glowing with hearthlight on a ridge at night, banners, lions chained at the path
8. **Valley of Humiliation** — a low green valley, a winged shadow-beast rising before a small armored pilgrim holding his ground
9. **Valley of the Shadow** — a narrow canyon path between a deep ditch and a quagmire, near-total darkness, one shaft of light far ahead
10. **Vanity Fair** — a torch-lit medieval market at night, garish tents and gold, masked crowds, the pilgrim walking straight through unmoved
11. **By-Path Meadow** — a soft sunlit meadow path running parallel to a rough stone road, a stile between them, storm building far off
12. **Doubting Castle** — a massive black castle on a crag in the rain, one tiny barred window lit, a golden key glinting in the foreground
13. **Delectable Mountains** — high green alpine country in clear morning light, shepherds and flocks, a far-off shining city on the horizon
14. **The Enchanted Ground** — a warm drowsy forest of golden pollen haze, arbors and soft moss beds beside the path, dangerously peaceful
15. **Land of Beulah** — orchards and vineyards in permanent golden hour, the shining city now large across a river
16. **The River & the Gate** — a wide dark river at dawn, the celestial gate blazing on the far bank, the pilgrim stepping into the water

## What's in Phase 3

- **The cast** — ten AI keepers, one per building, each with a name, voice, and knowledge of their domain: Brother Aldous (Chapel), Garrick the Watchman (Watchtower), Elder Tomas (Great Hall), Brand the Master-at-Arms (Yard), Mercer the Bursar (Treasury), Marta the Hearthkeeper (Hearth), Wulf the Smith (Forge), Oren (Granary), Linden the Gardener (Garden), Crane (Vault)
- **RPG dialogue screens** — portrait, nameplate, typewriter text, AI-generated reply choices plus free typing; each keeper opens with a data-aware line (Garrick: "12 days standing. Good.") at zero API cost, and conversations persist per building
- **The town map** — the painted town IS the navigation: all ten buildings plus the Gate (the Steward's post) are tappable directly on the art. Pin coordinates are pre-placed to match the delivered painting; Pack → Place the pins exists only if the art is ever replaced
- **Keepers can hand you off** — ask Marta about temptation and she can send you to Garrick's tower

New art slots: `town.webp` (the clickable town), `npc_<building>.webp` (ten portraits), `b_<building>.webp` (ten interior backdrops). See `chatgpt_art_order_2.md`.

## What's in Phase 2

- **The Keep** — castle home base with ten buildings, one per pillar: Chapel (prayer + scripture memory), Watchtower (the war log + the Beast: Lust), Great Hall (the girls + the letter chest), Training Yard (weight/steps), Treasury (weekly count + goals), Hearth (the heart's record), Forge (work wins), Granary (house tasks), Garden (joy log), Vault (the Vow, the Death List, the Growing)
- **The Steward** — AI keeper of the gate; talks in the world's voice, knows your state, and opens buildings for you ("I want to pray" → walks you to the Chapel). Uses your stored key.
- **Character builder** — banner color, emblem, house words; character sheet with nine pillar ranks fed by tagged XP
- **The Road, redrawn** — deeper night sky, layered ranges, pine forests, drifting fog, your banner planted on the current land

## What's in Phase 1

- The Camp: daily anchors (Prayer, The Word, Sweat, Presence, Order), verse of the day (KJV), evening watch with one-word heart check and the battle report
- The Road: living SVG map, 16 lands, quarter tracking from your start date to your 40th birthday
- The Vow: your north star, with days-to-the-gate countdown
- XP engine: 12 titles from Wanderer to Whole Man; falls never cost XP — returning earns it
- Restoration flow: Truth → Confession → Rise → One next step, with time-to-return tracking
- The Pack: export/import, masked key storage, scoped `fb40_` storage keys

## Road ahead

- **Phase 2 — The War Log:** fast temptation logging, trigger patterns, the first beast
- **Phase 3 — The Mentor:** AI brother on the road (uses your stored key)
- **Phase 4 — The Altar:** reading plan, prayer list, scripture memory
- **Phase 5+:** Body, Ledger, the Table & the letters vault, encrypted Gist sync
