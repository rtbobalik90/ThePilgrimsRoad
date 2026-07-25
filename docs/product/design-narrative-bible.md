# FULL BY 40 — THE PILGRIM'S ROAD
## Design & Narrative Bible — v1.0

*Self-contained. No reliance on chat history. Portable to Claude Design.*

---

## 0. CHARTER

A walled settlement stands half-ruined on a road that ends at a fortieth birthday. Ten buildings, ten keepers, one pilgrim. The buildings rise or dim according to what the pilgrim actually does — not what he intends. A story is written about him weekly, from his own logged life, by keepers who know his name and will not flatter him. On the morning of his fortieth birthday the campaign ends with a verdict he earned. The next morning a new arc opens in the same settlement, on the same save, with the walls he built still standing.

**Priority order, enforced in every design decision:** story → game systems → tracking rigor → polish.

**The test every mechanic must pass:** *what real-life outcome does this move?* If the answer is "it looks good," cut it.

---

## 1. CONFIGURATION CONSTANTS

These live in `/data/config.json` and are read once at boot. Everything downstream is derived.

| Key | Value | Notes |
|---|---|---|
| `FINALE_DATE` | **TBD — needs Robert's 40th birthday** | The finale chapter opens 7 days before this date. All chapter math derives from it. |
| `CAMPAIGN_START` | first launch date | Stamped on first boot, immutable. |
| `WEEK_ANCHOR` | Monday | Weekly review unlocks Sunday 18:00, expires Wednesday 23:59. |
| `PILLAR_MAX_LEVEL` | 10 | |
| `BUILDING_TIERS` | 5 | Visual stages at levels 1, 3, 5, 7, 10. |
| `DIM_THRESHOLD_DAYS` | 14 | Days without a log before a building visually dims. Never costs XP. |
| `SCENE_SPECIFICITY_MIN` | 3 | Concrete data references required in an AI scene or it regenerates. |
| `MAX_ACTIVE_BOSSES` | 2 | Hard cap. A third cannot spawn until one resolves or is paused. |
| `CHECKIN_MODE` | `focus` | Chapter's four focus pillars shown by default; the other six live behind one tap. |

If `FINALE_DATE` is more than 100 weeks out, chapters stretch. If under 28 weeks, the engine compresses to a 4-chapter short campaign (see §5.4).

---

## 2. THE WORLD

### 2.1 The Settlement

A walled hill settlement at the end of a long road, in a country that is not named. It was built by people who are gone. The pilgrim did not found it; he inherited it, and he found it in poor repair. There is no army coming to take it. The threat is entropy, and the pilgrim's own hands.

**Geography (the map screen, top to bottom):**

- **The Gate** — south, the only way in. First building the eye meets.
- **The Lower Yard** — Training Yard and Granary, working ground, mud and racks.
- **The Common** — Great Hall and Hearth, the warm center, smoke and light.
- **The Works** — Forge and Treasury, stone buildings, the sound of hammers and counting.
- **The Green** — Garden, the only soft ground inside the walls.
- **The Height** — Chapel and Watchtower, above everything, reached by steps.
- **Beyond the wall** — locked territory. Unlocks as map areas (§7.4).

### 2.2 World State Reflects Data

The map is the progress bar. Four visible channels, all data-driven, all computed in `worldstate.js`:

1. **Building tier** — physical upgrade at pillar levels 1/3/5/7/10. Scaffolding → walls → roof → adornment → light in the windows.
2. **Building dimness** — a building with no log in 14 days goes grey and unlit. Not a penalty. A keeper will mention it.
3. **Weather & light** — driven by a rolling 14-day composite of check-in completion and streak health. Storm → overcast → clear → dawn-gold. Weather is atmospheric only; it never blocks input.
4. **Territory** — ground beyond the wall claimed by chapter progression and boss defeats.

### 2.3 Time

Real time only. No in-game clock, no idle timers, no "come back in 4 hours." A day is a day. A week is Monday–Sunday. Missing a day removes nothing.

---

## 3. THE TEN PILLARS AND THEIR KEEPERS

Six names carry forward unchanged. Two titles (Hearthkeeper, Steward) carry forward as titles — they are older than names in this world, and the ambiguity is deliberate. Two TBD keepers are proposed below.

| # | Building | Domain | Keeper |
|---|---|---|---|
| 1 | Chapel | Faith, prayer, scripture | **Aldous** |
| 2 | Watchtower | Vigilance, purity, guarding the mind | **Garrick** |
| 3 | Great Hall | Friendship, brotherhood, community | **Tomas** |
| 4 | Treasury | Money, stewardship, generosity | **Mercer** |
| 5 | Garden | Rest, sabbath, hobbies, joy | **Linden** |
| 6 | Forge | Work, craft, calling | **Wulf** |
| 7 | Hearth | Marriage, family, emotional life | **The Hearthkeeper** |
| 8 | Gate | Commitment, boundaries, yes and no | **The Steward** |
| 9 | Training Yard | Fitness, strength, discipline | **Hoel** |
| 10 | Granary | Food, sleep, health inputs | **Ansel** |

### 3.1 Keeper Voice Packs

Each keeper has a voice pack in `/data/keepers/<id>.json`: 6–10 sample lines, 5 forbidden habits, a lexicon, a posture toward failure, and a scripture register. The AI scene engine is given the pack, never a generic "be encouraging" instruction.

---

**ALDOUS — Chapel.** Very old. Unhurried to the point of discomfort. Quotes scripture without preamble or citation, as if continuing a sentence. Never raises his voice. The only keeper who will sit in silence with the pilgrim.
> "You prayed four times this week. You told me daily. I am not angry — I am asking what you did not want to say to Him."

**GARRICK — Watchtower.** Ex-soldier of the watch. Clipped. Refuses euphemism and will make the pilgrim restate a confession in plain words. Treats the mind as terrain to be held.
> "Say the thing. Not 'slipped.' Not 'struggled.' Say what you did, and then we will decide what to do about it."

**TOMAS — Great Hall.** Loud, warm, feeds people. Physically affectionate. The keeper most likely to name isolation as sin rather than temperament.
> "Nine days. Nine days and the only name in your mouth was your own. Sit. Eat. Then tell me who you are going to call."

**MERCER — Treasury.** Dry, exact, ledger in hand. Moralizes about money only after the numbers are on the table. Believes generosity is a discipline, not a mood.
> "The numbers do not lie and they do not scold. Scolding is my office, and I have not opened it yet. Look at the column."

**LINDEN — Garden.** Patient, hands in soil, speaks in growing things. The only keeper who actively defends the pilgrim *against* his own ambition. Will refuse to reward overwork.
> "You cannot force a thing to bloom by standing over it at midnight. Go home. The Forge will still be cold in the morning; that is what mornings are for."

**WULF — Forge.** Blunt craftsman. Contemptuous of motion mistaken for work. Cares about output and calling, not hours.
> "Eleven hours at the bench. Show me what you made. No — not the list of what you touched. What you *made*."

**THE HEARTHKEEPER — Hearth.** Quiet. Speaks least and last. Knows Lizzie and the girls by name and asks about them before asking about him. The only keeper who will ask a question and then not fill the silence.
> "You wrote three lines about work and one about her. I am not going to tell you what that means. You already know."

**THE STEWARD — Gate.** Formal, contractual, keeps a book of yeses. Treats an overcommitted week as a breach of covenant with the people already owed.
> "You gave your word to six things this week. You possessed four hours. One of those numbers was a lie when you said it."

**HOEL — Training Yard.** Younger than the other keepers. He runs the yard because no one else would, and it shows — the racks are mended with wire. He trains beside the pilgrim rather than watching him, and he is the only keeper who visibly gets tired. Worships showing up. Will not celebrate a heroic session that followed nine empty days, because he was here for all nine.
> "I do not care what you lifted. I came, and I am tired too, and that is the whole of it. Come tomorrow and I will start caring what you lifted."

**ANSEL — Granary.** Careful provisioner, weighs everything, counts sacks. Connects sleep and food to every other failure in the settlement, and is usually right.
> "You blame the Forge for the bad week. It began three nights before it, at two in the morning, with a lit screen."

### 3.2 Keeper Favor

Each keeper tracks **Favor 0–100**, separate from pillar XP. XP measures *what was done*; Favor measures *whether he kept his word to that keeper specifically*.

- +6 completing a quest that keeper issued
- +3 a deep log at their station
- +10 telling a keeper a hard truth (flagged confession field)
- −4 accepting a quest from that keeper and letting it expire unattempted
- Never below 0. Favor is the one number that can fall — because a broken promise to a person is different from a missed workout, and the design should say so.

Favor tiers: **Wary (0–24) → Known (25–49) → Trusted (50–74) → Bound (75–100).** Higher favor unlocks: longer VN conversations, that keeper's relic, and their intercession during a boss fight (§6.5).

---

## 4. NARRATIVE ARCHITECTURE

### 4.1 The Hybrid Model

**The spine is authored.** Chapters, beats, and the ending are written in advance and stored in `/data/beats/*.json`. They do not change based on performance. The story is going somewhere and it will get there.

**The flesh is generated.** Between authored beats, the AI writes scenes at each weekly review from the actual data window. These are the scenes that could only be about his week.

**The world state is computed.** Neither authored nor generated — derived from data by `worldstate.js` and rendered on the map.

### 4.2 Beat Types

| Type | Source | Trigger | Length |
|---|---|---|---|
| **Chapter Open** | Authored | Chapter start | 200–400 words, VN-delivered |
| **Interstitial** | AI, from data | Every weekly review | 150–300 words |
| **Keeper Scene** | AI, voice-packed | Favor tier-up, or keeper-issued quest resolution | 100–200 words |
| **Boss Beat** | Authored frame + AI detail | Phase change | 150–250 words |
| **Chapter Close** | Authored | Chapter exit condition met | 300–500 words + permanent map change |
| **Finale** | Fully authored | `FINALE_DATE` | Multi-scene sequence, §5.5 |

### 4.3 The Scene Contract (anti-generic enforcement)

Every AI scene request sends a **data window** and receives a scene plus a **citations array**. The client validates before display:

- Scene must contain **≥3 verifiable specifics** from the window — a number, a date, a quoted fragment of his own honest-line text, a named streak, a named person from a Hearth or Great Hall log.
- Scene must not contain any phrase from a **banned-phrase list** (`/data/banned.json`): "journey," "you've got this," "small steps," "be kind to yourself," "progress not perfection," etc.
- If validation fails → one silent regeneration with a stricter prompt → if it fails again, fall back to an authored keeper line and log the failure for review.

This is the single most important guardrail in the system. Without it, the app becomes every other habit app.

### 4.4 Confession & Lapse Handling

A lapse is a **story beat**, never a penalty. Mechanically: no XP loss, no streak shaming copy, no red. What happens instead:

1. The lapse is logged (optionally with a confession field).
2. It becomes a required specific in the next interstitial scene — the story acknowledges it by name.
3. The relevant keeper's next line addresses it directly and without softening.
4. If it recurs 3+ times in 21 days, it becomes eligible to spawn a **boss** (§6). A repeated failure is promoted to a named enemy — which is a gift, not a punishment.

---

## 5. THE CAMPAIGN

### 5.1 Chapter Structure

Seven chapters plus prologue and finale. Chapter length = `(weeks between CAMPAIGN_START and FINALE_DATE − 2) / 7`, minimum 4 weeks each.

**Exit condition per chapter: time elapsed AND at least one of the chapter's two deed-gates.** He cannot rush ahead of the calendar, and the calendar will not drag him past a chapter he hasn't lived. If time elapses without deeds, the chapter closes anyway — with a different, colder closing beat. Two endings per chapter, and the data picks.

### 5.2 The Chapters

**PROLOGUE — The Road In.** *(Week 0, one sitting.)* He arrives at the gate. The Steward asks his name and what he intends to do here. Three questions establish the campaign's stakes in his own words — these answers are stored permanently and quoted back in the finale. All ten buildings are visible; eight are locked. Chapel and Hearth open first.

**I — THE RECKONING OF WALLS.** *Keeper focus: the Steward, Mercer.* An honest inventory. Every pillar gets a first deep log; nothing is fixed yet, only measured. Aldous refuses to discuss improvement until the pilgrim has said out loud what is broken.
*Deed-gates:* all 10 stations logged once · 14 consecutive check-ins.
*Boss:* none. This chapter is the audit.
*Map change:* the walls are mapped; ruined sections become visible instead of hidden.

**II — THE THING IN THE CELLAR.** *Keeper focus: Garrick.* The first named boss — whichever hidden struggle he flagged most in Chapter I. Garrick makes him name it. The chapter is about the difference between managing a sin and killing it.
*Deed-gates:* boss reaches Phase 2 · one accountability conversation logged in the Great Hall.
*Boss:* **The Cellar Door.**
*Map change:* the cellar is opened and lit; a new station appears under the Watchtower.

**III — THE LEAN SEASON.** *Keeper focus: Hoel, Ansel.* Motivation is gone. This chapter is deliberately unglamorous: it rewards showing up at 40% for eight weeks over one heroic fortnight. Hoel's entire arc lives here.
*Deed-gates:* 40 of 56 days with any log · Training Yard or Granary reaches level 4.
*Boss:* **The Grey Ox.**
*Map change:* the Lower Yard is re-roofed; winter stores appear in the Granary.

**IV — GUESTS AT THE GATE.** *Keeper focus: Tomas, the Hearthkeeper.* The turn outward. The settlement has been about him for three chapters. Now people arrive: named friends, Lizzie, the girls. The Hearth becomes the highest-XP building in the settlement for this chapter only.
*Deed-gates:* 6 consecutive weeks with a logged one-on-one with Lizzie · 4 named friends logged in the Great Hall.
*Boss:* **Silence at the Hearth.**
*Map change:* the Common lights at night; NPC figures appear on the map.

**V — THE FORGE RUNS HOT.** *Keeper focus: Wulf, Mercer, Linden.* Work, money, and calling under pressure. The chapter's real question is whether the Forge is a calling or an idol — Linden and Wulf openly disagree with each other in front of him, and he must side with one in a logged decision.
*Deed-gates:* 8 weeks inside budget · one sabbath logged every week for 6 weeks.
*Boss:* **The Ledger-Wraith.**
*Map change:* the Works expand; a chimney smokes. The Garden gains a bench that only appears if Linden won the argument.

**VI — THE WATCH BEFORE DAWN.** *Keeper focus: Aldous.* The hardest chapter. Designed to intersect a real relapse — and if none occurs, to intersect the dry, faithful, unfelt obedience that is its own kind of hard. The Chapel dims regardless of behavior at the chapter's midpoint; Aldous explains why.
*Deed-gates:* 30 days with prayer logged · one full night vigil quest completed.
*Boss:* **The Dry Well.**
*Map change:* the Height is lit; the Chapel bell can be rung from the map.

**VII — THE BUILDING OF THE LAST WALL.** *Keeper focus: all ten.* Consolidation. No new systems, no new boss unless one is still alive. Every keeper issues one final quest. The wall is closed section by section, visibly, as quests complete.
*Deed-gates:* all pillars ≥ level 5 · every keeper at Trusted or above.
*Boss:* any surviving boss must be finished here, or it walks into the finale with him.
*Map change:* the wall closes. Territory beyond the gate becomes visible for the next arc.

**FINALE — FULL.** *(Opens 7 days before `FINALE_DATE`.)* §5.5.

### 5.2b Chapter Focus Pillars

These four drive the daily check-in (§8.1), the keeper who narrates that chapter's scenes, and the quest weighting.

| Chapter | Focus pillars |
|---|---|
| Prologue | Chapel · Hearth · Gate · Watchtower |
| I — Reckoning of Walls | **All ten.** The audit chapter is the one exception; he answers for everything, once, so the baseline is real. |
| II — Thing in the Cellar | Watchtower · Chapel · Great Hall · Training Yard |
| III — The Lean Season | Training Yard · Granary · Forge · Chapel |
| IV — Guests at the Gate | Hearth · Great Hall · Gate · Garden |
| V — The Forge Runs Hot | Forge · Treasury · Garden · Gate |
| VI — Watch Before Dawn | Chapel · Watchtower · Hearth · Granary |
| VII — The Last Wall | **Computed weekly:** the two lowest-level pillars plus the two lowest-favor keepers. The wall closes where it is thinnest. |
| Finale | All ten. |

### 5.3 Weekly Review — the beat that advances everything

Sunday 18:00 the review unlocks. It is the only place the chapter advances. Structure, in order:

1. **The week in data** — one screen: pillar deltas, streaks alive and broken, health import summary, quests won and expired.
2. **Three questions** — authored per chapter, answered in his own words. These become the primary source material for the scene.
3. **The scene** — AI-written interstitial, delivered VN-style by the chapter's focus keeper.
4. **Boss resolution** — damage applied, phase check.
5. **Next week's quests** — 3–5 issued, each attributed to a keeper, each with a stated cost.
6. **Vs. past self** — this month against last, this year against last (§7.5).

If the review is missed, the week is not lost — it merges into the next review as a two-week window, and the scene says so.

### 5.4 Short-Campaign Compression

If `FINALE_DATE` is under 28 weeks out, the engine loads a 4-chapter arc: Reckoning → Cellar → Guests → Last Wall. Bosses reduce to two. All other systems unchanged.

### 5.5 The Finale

Seven days, one scene per day, fully authored, each stitched with real data from the whole campaign.

- **Day −7 to −2:** each keeper delivers a final word. Their line varies by favor tier — Bound keepers say something they have never said before; Wary keepers say something short and true.
- **Day −1: The Vigil.** A single screen, no logging. The Prologue's three answers are shown back to him in his own handwriting-font, unedited, with the date he wrote them.
- **Day 0: FULL.** The map renders the settlement complete, at dawn, with every building at its true tier — not an idealized one. Then the verdict: a generated chronicle of the campaign that names the three hardest weeks, the boss that cost the most, the streak he is proudest of, and the one thing that did not get fixed.
- **Day +1:** the gate opens outward. The next arc's first beat is already written and waiting: *"The road did not end here. It only stopped being about you."*

---

## 6. BOSSES

### 6.1 Rules

- A boss is a **named multi-week struggle**, never a random encounter.
- HP falls only from **logged behavior**, never from taps.
- Phases have distinct win conditions. Losing a phase costs **ground** (HP regenerates, territory reverts), never dignity — no shame copy, no "you failed."
- A boss can be **paused** by the pilgrim, once, for two weeks. Garrick will have something to say about it.
- **Maximum two bosses alive at once.** A third cannot spawn while two are active — the engine holds it in a queue and the owning keeper mentions it is waiting. Two is deliberate: one boss is a single front and feels narrow, three is a to-do list. Two lets a chapter boss run while a spawned personal boss burns alongside it.
- When two are active, they may not share an owning pillar, and the weekly review resolves the older one first.

### 6.2 The Roster

**THE CELLAR DOOR** — *Watchtower · HP 100 · Ch. II*
The hidden thing. Phases: **Named** (confess it plainly in a Watchtower log, −20 HP) → **Starved** (14 consecutive clean days, −50) → **Sealed** (30 days plus one accountability conversation logged in the Great Hall, −30). Regen: +15 on a lapse, and the door creaks on the map.

**THE GREY OX** — *Training Yard + Forge · HP 150 · Ch. III*
Sloth and drift. Beaten by frequency, not intensity — a session over 90 minutes deals no bonus damage. Phases: **Yoked** (10 logged sessions in 21 days) → **Turned** (40 of 56 days with any log) → **Broken** (a 21-day unbroken chain of at least one training or deep-work block). Hoel's damage formula explicitly caps per-day contribution at 1 session.

**SILENCE AT THE HEARTH** — *Hearth · HP 90 · Ch. IV*
Emotional distance. Phases: **Heard** (3 hard conversations logged) → **Warmed** (6 consecutive weeks with a one-on-one with Lizzie) → **Home** (one logged conversation with each daughter by name in a single week). The only boss where the Hearthkeeper will end the fight early if the data says it is already won.

**THE LEDGER-WRAITH** — *Treasury · HP 120 · Ch. V*
Spending drift and debt. Phases: **Counted** (every category logged for 4 weeks) → **Cut** (8 weeks inside budget) → **Cleared** (one named debt milestone, or a generosity commitment kept for 8 weeks). Mercer narrates in numbers only.

**THE DRY WELL** — *Chapel · HP 130 · Ch. VI*
Prayerlessness. The hardest by design, because the win condition rewards *unfelt* obedience: damage is dealt by logged prayer regardless of the "did it feel like anything" field, and a week of all-dry prayer deals **more** damage than a week of felt ones. Aldous explains this exactly once. Phases: **Drawn** → **Deepened** → **Given**.

**THE APPROVAL COURT** — *Gate · HP 100 · unlockable, any chapter III+*
People-pleasing and overcommitment. Spawns when the Steward's expired-quest count exceeds 8 in 30 days. Win condition: 5 logged refusals that cost him something, each with the cost named.

**THE HOLLOW FAST** — *Granary · HP 110 · unlockable, any chapter*
Food and sleep chaos. Spawns from Apple Health data — 10 of 14 nights under a set sleep floor. Deliberately gentle in tone; Ansel does not moralize about food, he schedules it.

### 6.3 Spawned Bosses

Any repeated failure logged 3+ times in 21 days becomes eligible. The engine proposes it at the weekly review: *"This has a name now. Do you want to give it one?"* He names it; the AI writes its description in the keeper's voice; it enters the roster with HP 80 and three phases generated from the failure's own data pattern.

### 6.4 Boss Screen

Lives inside the owning building, not on the map. Shows: name, illustration slot, HP bar (iron, not red), current phase and its literal win condition in plain English, the last five damage events with dates, and the keeper's standing comment. No timers, no countdown pressure.

### 6.5 Keeper Intercession

A keeper at **Bound** favor may be called once per boss. Effect: the current phase's win condition is reduced by roughly 25%, and the keeper delivers a scene explaining that he is not doing this because the pilgrim earned it. Once per boss, ever.

---

## 7. PROGRESSION, ECONOMY, AND REWARDS

### 7.1 XP Sources

| Action | XP | Notes |
|---|---|---|
| Check-in: pillar marked **kept** | +10 | that pillar |
| Check-in: pillar marked **partial** | +4 | that pillar |
| Check-in: pillar marked **missed** | 0 | never negative |
| Check-in completed at all | +5 | all pillars |
| Deep station log | +15 | once per pillar per day |
| Honest line written (≥20 chars) | +5 | all pillars — this is the highest-value input, pay for it |
| Weekly review completed | +40 | all pillars |
| Quest complete — minor / standard / hard | +30 / +60 / +120 | issuing pillar |
| Boss phase cleared | +100 | owning pillar |
| Boss defeated | +250 | owning pillar, +50 to all others |
| Confession logged | +20 | Watchtower or Chapel |

### 7.2 Streak Multiplier

Applied to check-in and station XP only. Per-pillar consecutive-day streaks.

| Streak | Multiplier |
|---|---|
| 0–6 days | ×1.00 |
| 7–20 | ×1.15 |
| 21–59 | ×1.30 |
| 60+ | ×1.50 (cap) |

**Streak break rule:** a broken streak resets to 0 and produces **no negative copy anywhere in the UI**. It is recorded as a story event and surfaces in the next scene as a fact, not a verdict. One **grace day** per pillar per 30 days absorbs a single miss silently.

### 7.3 Level Curve

`XP to advance from level L to L+1 = 120 + 60 × (L − 1)`

| Level | Cost | Cumulative | Building tier |
|---|---|---|---|
| 1 → 2 | 120 | 120 | **I — Cleared ground, scaffold** |
| 2 → 3 | 180 | 300 | |
| 3 → 4 | 240 | 540 | **II — Walls up, no roof** |
| 4 → 5 | 300 | 840 | |
| 5 → 6 | 360 | 1200 | **III — Roofed, doors hung, in use** |
| 6 → 7 | 420 | 1620 | |
| 7 → 8 | 480 | 2100 | **IV — Adorned: banner, glass, carved lintel** |
| 8 → 9 | 540 | 2640 | |
| 9 → 10 | 600 | 3240 | **V — Light in the windows, keeper at the door** |

At steady engagement (~70–110 XP/week on an actively worked pillar) a pillar reaches level 10 in roughly 35–45 weeks. Two or three pillars will max in a year-long campaign; that is intended. A settlement where everything is finished has nothing left to say.

### 7.4 Relics, Gear, Map Unlocks

**Relics** — 12, one per keeper plus two campaign relics. Earned at Bound favor or chapter close. Each grants a *real mechanic*, never a stat bonus:

| Relic | Keeper | Effect |
|---|---|---|
| Aldous's Cord | Chapel | Unlocks the pre-dawn prayer quest chain |
| Garrick's Glass | Watchtower | Boss damage log shows patterns by weekday and hour |
| Tomas's Cup | Great Hall | Great Hall logs can name a person and auto-prompt a follow-up in 14 days |
| Mercer's Rule | Treasury | Budget variance projection on the Treasury station |
| Linden's Seed | Garden | Sabbath quests can be scheduled in advance and lock the day |
| Wulf's Hammer | Forge | Deep-work sessions can be timed in-app with an output field |
| The Hearth Key | Hearth | Per-person threads for Lizzie and each daughter |
| The Steward's Book | Gate | A visible ledger of every yes given this month, with hours costed |
| Hoel's Chalk | Training Yard | Skips intensity fields entirely; one-tap "I came" logging |
| Ansel's Measure | Granary | Sleep-to-outcome correlation view across all pillars |
| **The Pilgrim's Staff** | campaign, Ch. IV | Unlocks travel beyond the wall |
| **The Keystone** | campaign, Ch. VII | Closes the wall; required for the finale |

**Gear** is cosmetic-only and honest: the pilgrim's figure on the map changes as pillars level. No stat gear — a system where a hat makes real discipline easier would be a lie.

**Map unlocks:** the Cellar (II), the Lower Yard stores (III), the Common at night (IV), the Chimney and the Bench (V), the Height and the Bell (VI), the Wall and the outward road (VII).

### 7.5 Vs. Past Self

The Chronicle screen's second tab. No leaderboards, no external comparison — the only opponent is who he was.

- **This month vs. last month** — per pillar: check-in rate, deep logs, streak max, quests won.
- **This year vs. last year** — same, plus bosses defeated and levels gained.
- **The same week, last year** — shown whenever data exists. This is the most powerful view in the app and gets a permanent home on the map screen once 52 weeks of data exist.

### 7.6 Badges & Ranks

Badges are **named after events, not milestones**: "Came After Nine Empty Days," "Told Garrick First," "Sabbath in a Hot Week." Awarded by rule, described by AI in the awarding keeper's voice. Ranks are pilgrimage stations — Wayfarer → Sojourner → Pilgrim → Warden → Keeper — computed from the sum of all pillar levels.

---

## 8. THE DATA LOOP

### 8.1 Channel 1 — Daily Check-In (target: 30–45 seconds)

**Focus mode.** The chapter's four focus pillars are shown as rows by default. The other six collapse behind a single line — *"The rest of the settlement (6)"* — one tap to expand. Marking a collapsed pillar earns identical XP; nothing is hidden, only unasked.

**Forced into focus regardless of chapter:** any pillar with a live boss, and any pillar dimmed 14+ days. The app will not let him quietly stop being asked about the thing he is avoiding.

Each row is a tri-state segmented control: **Kept / Partial / Missed**. Below them:

- **The honest line** — one free-text field, ≤140 characters, prompt text rotates daily and is chapter-aware. *"What did you not want to write here today?"* This single field carries more scene weight than all ten toggles combined.
- **Optional:** one tap to flag "something happened" → opens confession flow.

Editable for 48 hours. Backfill allowed up to 7 days, marked as backfilled (the story knows the difference, and says so gently).

### 8.2 Channel 2 — Stations (deep per-pillar logging)

Each building has a station. Every field is ≤3 seconds of input. No field exists without a mechanic behind it.

| Pillar | Station fields |
|---|---|
| Chapel | prayer (min) · scripture (passage) · dry/felt toggle · one line to Him |
| Watchtower | clean toggle · trigger tag · time of day · confession (optional) |
| Great Hall | person named · mode (call/meet/text) · depth 1–3 |
| Treasury | category · amount · planned toggle · generosity flag |
| Garden | rest type · minutes · joy 1–5 · sabbath toggle |
| Forge | deep-work minutes · what was *made* (required, free text) · shipped toggle |
| Hearth | person (Lizzie / each daughter) · minutes · one line · hard-conversation flag |
| Gate | yes given / no given · to whom · hours it costs |
| Training Yard | came toggle (that alone is a valid log) · type · minutes · RPE 1–5 |
| Granary | sleep hours · meals on plan · water · one flag: what wrecked it |

### 8.3 Channel 3 — Apple Health

Two supported paths, both offline-friendly:

1. **Export parse** — Health app → Export All Health Data → upload the zip; a Web Worker parses `export.xml` for steps, sleep analysis, workouts, resting HR, body mass. Chunked parse with progress, since the file is large.
2. **Shortcuts JSON drop** — a documented iOS Shortcut writes a small daily JSON to a file the app imports (or pastes). Preferred for daily use. Schema documented in `/docs/health-schema.md`.

Health data **never** creates check-in state on its own. It informs scenes, fuels Ansel, and can spawn The Hollow Fast — but a step count is not a decision, and the app never pretends it is.

### 8.4 Channel 4 — Weekly Review

See §5.3. This is the load-bearing ritual of the entire product.

---

## 9. DATA SCHEMA (IndexedDB, db name `fb40`, version-migrated)

```
meta          { key, value }                          // version, config, campaignStart, finaleDate
days          { date PK, marks{pillarId:0|1|2}, honestLine, backfilled, ts }
logs          { id PK, pillarId IX, date IX, fields{}, confession?, ts }
pillars       { id PK, xp, level, streak, bestStreak, graceUsedOn, lastLogDate, favor }
health        { date PK, steps, sleepMin, workoutMin, restingHR, weightKg, source }
campaign      { key PK }                              // chapterId, beatIndex, flags{}, prologueAnswers[]
scenes        { id PK, chapterId IX, weekOf IX, type, keeperId, text, citations[], ts }
bosses        { id PK, name, pillarId, hp, hpMax, phase, state, events[], pausedUntil? }
quests        { id PK, keeperId, pillarId, tier, text, cost, state, issuedOn, dueOn }
relics        { id PK, earnedOn, source }
badges        { id PK, ruleId, earnedOn, description }
reviews       { weekOf PK, answers[], deltas{}, sceneId, completedOn }
outbox        { id PK, endpoint, payload, tries, lastError }   // offline-safe AI queue
```

**Backup:** full export to a single JSON file (`fb40-backup-YYYYMMDD.json`), import with a merge-or-replace choice and a dry-run diff shown before commit. Manual export prompt every 30 days.

---

## 10. MODULE MAP

```
/index.html                     shell, font preloads, no inline logic
/styles/
  tokens.css                    colors, type scale, spacing
  base.css  layout.css  vn.css  map.css  sheet.css
/js/
  main.js                       boot, migrate, route
  core/       db.js  state.js  router.js  events.js  version.js  log.js
  data/       schema.js  migrate.js  backup.js  health-import.js  health-worker.js
  systems/    xp.js  streaks.js  levels.js  bosses.js  quests.js  relics.js
              favor.js  badges.js  worldstate.js  compare.js
  narrative/  campaign.js  chapters.js  beats.js  scene-engine.js
              prompts.js  validate.js
  ai/         worker-client.js  contracts.js  queue.js
  ui/         shell.js  map.js  building.js  station.js  vn-chat.js  sheet.js
              checkin.js  review.js  chronicle.js  codex.js  boss.js  settings.js
              components/  seg.js  bar.js  portrait.js  grain.js  toast.js
  pillars/    chapel.js  watchtower.js  greathall.js  treasury.js  garden.js
              forge.js  hearth.js  gate.js  trainingyard.js  granary.js
/data/
  config.json  keepers/*.json  beats/*.json  quests.json  relics.json
  badges.json  banned.json
/worker/                        Cloudflare Worker source (deployed separately)
  index.js  prompts.js  wrangler.toml
/tools/
  smoke.mjs                     jsdom harness
  check.sh                      node --check across /js, then smoke
/docs/
  health-schema.md  worker-setup.md
```

Every JS file carries `/* fb40 · <path> · v<semver> · <YYYY-MM-DD> */` on line 1. `version.js` exports a build stamp rendered in Settings.

**Ship gate (never skipped):** `bash tools/check.sh` → `node --check` every module → jsdom smoke test boots the app, writes a check-in, advances a week, renders the map, and asserts no console errors.

---

## 11. AI LAYER

### 11.1 Worker Contract

All AI calls go to the Cloudflare Worker. **No credentials in client code, ever.** The client sends only what the scene needs — never the full database.

```
POST /scene    { chapterId, beatType, keeperId, window, voicePack, constraints }
               → { text, citations[], keeperLine, questSeeds[] }
POST /chat     { keeperId, voicePack, recentContext, history[], message }
               → { text }
POST /name     { failurePattern, keeperId }        // names a spawned boss
               → { name, description, phases[] }
```

The Worker enforces: rate limit, max tokens, allowlisted origin, and a server-side system prompt the client cannot override. All requests queue in `outbox` when offline and flush on reconnect.

### 11.2 The Window Object

What a scene actually gets:

```
{ dateRange, pillarDeltas[], streaksAlive[], streaksBroken[],
  honestLines[{date,text}], confessions[], namedPeople[],
  questsWon[], questsExpired[], bossEvents[],
  health{sleepAvg,workouts,stepsAvg}, reviewAnswers[],
  lastSceneSummary, chapterFlags }
```

### 11.3 Prompt Discipline

The system prompt on the Worker states, in order: the keeper's voice pack; that the scene must reference at least three specifics from the window verbatim or near-verbatim; the banned-phrase list; the prohibition on encouragement that isn't earned; and the instruction to end on a question or a command, never a summary. Scenes are 150–300 words. The keeper never says "I" about the pilgrim's feelings.

---

## 12. SCREEN INVENTORY

| # | Screen | Route | Purpose |
|---|---|---|---|
| 1 | **Settlement Map** | `/` | Home. Ten buildings, weather, pilgrim figure, chapter banner, one primary action. |
| 2 | **Daily Check-In** | `/checkin` | Bottom sheet. §8.1. |
| 3 | **Building** | `/b/:id` | Keeper portrait, pillar level + XP bar, boss if any, quests, station entry, chat entry. |
| 4 | **Station** | `/b/:id/log` | Deep log form. §8.2. |
| 5 | **VN Chat** | `/b/:id/talk` | Full-bleed keeper portrait, parchment text plate, tap-advance, branch buttons. |
| 6 | **Weekly Review** | `/review` | The ritual. Five steps, one per screen. §5.3. |
| 7 | **Boss** | `/b/:id/boss` | §6.4. |
| 8 | **Chronicle** | `/chronicle` | Tab 1: every scene ever, by chapter. Tab 2: vs. past self. |
| 9 | **Codex** | `/codex` | Relics, badges, keeper favor, ranks, the ten pillar definitions. |
| 10 | **Health** | `/health` | Import, last sync, what it's feeding. |
| 11 | **Settings** | `/settings` | Backup/restore, version stamp, finale date, danger zone. |
| 12 | **Finale** | `/finale` | Locked until `FINALE_DATE − 7`. §5.5. |

**Nav:** the map is home and is never more than one tap away. Bottom bar: Map · Check-in · Review (badges when live) · Chronicle. Everything else reached through buildings.

---

## 13. VISUAL SYSTEM (carried forward, unchanged)

- **Type:** Cinzel (display, keeper names, chapter titles) · EB Garamond (body, all prose)
- **Color:** ember `#C98A2E` · night `#0E0B07` · parchment `#E6D6B0` · iron `#221C15` / `#2B231A` · edge `#3A2F20`
- **Texture:** SVG `feTurbulence` fractal-noise grain overlay at low opacity, fixed; vignette on every screen
- **Chrome:** bottom-sheet modals with a drag handle; ~560px max column, centered, mobile-first; safe-area insets respected; installable to the iPhone home screen (manifest + icons + standalone display)
- **Motion:** slow. Sheets rise in 240ms. Ember glows breathe at 4s. Nothing bounces. No confetti, no emoji, no particle celebration — a badge arrives as a line of text and a small iron sigil.

---

## 14. BUILD PHASES

Each phase is independently runnable and passes the ship gate before the next begins.

| Phase | Contents | Runnable result |
|---|---|---|
| **0** | Shell, router, IndexedDB + migrations, tokens.css, version stamp, smoke harness | Empty settlement renders, DB writes and survives reload |
| **1** | Map with 10 buildings, pillar state, daily check-in, XP/streaks/levels, building tiers, weather | A daily loop that works and visibly changes the map |
| **2** | All 10 stations, VN chat UI with authored (non-AI) keeper lines, favor | Deep logging + keepers who speak |
| **3** | Campaign engine, authored beats, weekly review, Chronicle | The story runs end to end on authored content alone |
| **4** | Cloudflare Worker, scene engine, validation + regeneration, keeper AI chat | The scenes become his |
| **5** | Bosses (roster + spawned), quests, boss screen, intercession | The fight |
| **6** | Relics, badges, map unlocks, vs-past-self, ranks | The rewards |
| **7** | Apple Health import, backup/restore, finale sequence, polish pass | Complete campaign, shippable |

Phase 3 is the checkpoint that matters: if the story doesn't land on authored content alone, no amount of AI will save it.

---

## 15. OPEN DECISIONS

1. **`FINALE_DATE`** — the exact 40th-birthday date. Everything in §5 is parameterized on it and cannot be finalized without it. **Still open.**
2. ~~Training Yard and Granary keeper names~~ — **settled: Hoel (Training Yard), Ansel (Granary).**
3. ~~Concurrent boss limit~~ — **settled: two.** (§6.1)
4. ~~Daily check-in shape~~ — **settled: chapter-focus, rest one tap away.** (§5.2b, §8.1)

---

*End of bible v1.0. Nothing here is built yet. Approve, amend, or reject before Phase 0.*