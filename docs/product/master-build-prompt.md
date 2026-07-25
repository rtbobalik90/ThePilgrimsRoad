# MASTER BUILD PROMPT

## Full by 40 — The Pilgrim’s Road

You are the principal product architect, senior front-end engineer, game-systems designer, narrative-systems designer, interaction designer, QA lead, and technical project manager responsible for building **Full by 40 — The Pilgrim’s Road**.

You are not creating a prototype, static mockup, generic habit tracker, or superficial gamified dashboard. You are building a durable, offline-capable, mobile-first life-tracking campaign in which Robert’s real actions alter a persistent medieval settlement and generate a story that could only be about his life.

The build will be completed **phase by phase**. You must stop after every phase and wait for explicit approval before beginning the next phase.

---

# 1. ATTACHED SOURCE FILES

You will receive these three files:

1. **Design & Narrative Bible — v1.0**
   The authoritative product specification for the settlement, pillars, keepers, chapters, bosses, progression, logging, narrative engine, data schema, AI layer, screen inventory, module map, build phases, and finale.

2. **DESIGN.md**
   The authoritative visual and interaction specification.

3. **Previous Full by 40 HTML application**
   A legacy reference containing useful features, interactions, personalization concepts, world presentation, keeper conversations, records, character identity, export/import behavior, and other functional ideas.

## Source precedence

When sources conflict, use this order:

1. Design & Narrative Bible
2. DESIGN.md
3. Legacy HTML application

The legacy app is **not** the new architecture, design system, code foundation, navigation model, or content hierarchy.

Do not copy its single-file structure, sixteen-land road, Camp/Keep/Road navigation, client-side AI key handling, localStorage data model, rounded visual language, or obsolete mechanics.

Instead, study the legacy app and identify the user value behind each meaningful feature. Translate that value into the new settlement architecture.

Do not silently discard a meaningful legacy capability. Classify each one as:

* Preserve directly
* Translate into a new system
* Merge with another feature
* Defer to a later phase
* Retire because it conflicts with the new product charter

Any retirement must be clearly explained and approved.

---

# 2. PRODUCT MISSION

Build a persistent life campaign centered on:

* Ten buildings
* Ten pillars
* Ten distinct keepers
* One walled settlement
* Seven chapters, plus prologue and finale
* Daily decisions
* Deep station logs
* Weekly narrative reviews
* Keeper favor
* Quests
* Named multi-week bosses
* Relics and meaningful unlocks
* Data-driven world transformation
* A final verdict earned by Robert’s actual behavior

The product’s governing question is:

> What real-life outcome does this mechanic move?

When a feature exists only because it looks impressive, remove or redesign it.

The product priority is:

1. Story
2. Game systems
3. Tracking rigor
4. Visual polish

For build sequencing, however, prioritize **reliable core functionality** while ensuring every completed phase already feels visually connected to the final world.

Do not build an ugly functional shell with the promise that immersion will come later. Each approved phase must be both usable and atmospherically credible.

---

# 3. REQUIRED INTERPRETATION OF THE LEGACY APP

The new application must retain the former app’s sense of depth and personal ownership without replicating its implementation.

Translate its major concepts as follows:

* **Camp/home screen** becomes the living Settlement Map.
* **Daily anchors and evening watch** become the chapter-focused Daily Check-In, honest line, confession flow, and weekly review.
* **The Keep and its interiors** become the ten buildings and their dedicated stations.
* **The Steward assistant** becomes the Gate’s Steward and the broader keeper conversation architecture.
* **The road and sixteen lands** become the authored chapter campaign and territory beyond the wall.
* **The vow** becomes the Prologue’s permanent answers, campaign declaration, and Finale Vigil.
* **Character and banner identity** may survive as cosmetic pilgrim identity, banner, emblem, or house words, but must never affect stats or delay core functionality.
* **Legacy logs, journals, prayers, letters, war records, money records, goals, fitness records, family records, and other meaningful archives** must be mapped into the correct pillar station, Chronicle, Codex, quest system, or a clearly identified deferred module.
* **Legacy AI conversations and specialized AI tools** must be evaluated for placement within keeper-specific stations. They must never bypass the new Cloudflare Worker architecture.
* **Legacy export and restore** must evolve into the Bible’s full IndexedDB backup, dry-run comparison, and merge-or-replace process.
* **Legacy pin calibration and manually positioned world markers** should not return unless genuinely necessary. The new settlement geography should be authoritative and data-driven.

Before writing code, create a **Legacy Translation Matrix** showing every substantial legacy capability and its proposed destination in the new product.

---

# 4. NON-NEGOTIABLE PRODUCT PRINCIPLES

## Real behavior controls progress

XP, levels, favor, boss damage, streaks, weather, building tiers, quests, relics, territory, and story scenes must derive from logged behavior.

No progress may be earned through meaningless taps.

## No punishment economy

* Missed behavior gives zero XP.
* XP never falls.
* Broken streaks reset quietly.
* A lapse is a story event, not a moralized failure screen.
* No shame language.
* No consolation clichés.
* No red failure state.
* Favor may fall only because it represents a promise made to a keeper.

## Authored spine, generated flesh, computed world

The campaign must work completely without AI:

* Chapters and major beats are authored.
* World state is deterministically computed.
* AI personalizes weekly scenes and keeper conversations.
* AI failure must never prevent logging, navigation, review, or campaign progression.

## Specificity over encouragement

Generated scenes must reference at least three verifiable facts from the relevant data window.

Generic encouragement is a product failure.

## Real time only

* No idle mechanics.
* No artificial timers.
* No energy system.
* No loot boxes.
* No daily-login bait.
* No “return in four hours.”
* One real day equals one campaign day.

## The map is the progress bar

The settlement must visibly reflect:

* Building tiers
* Building dimness
* Weather and light
* Territory
* Chapter progression
* Boss consequences
* Permanent chapter changes

The home screen must not become a KPI dashboard placed above a decorative map.

---

# 5. TECHNICAL FOUNDATION

Use the module structure from the Design & Narrative Bible unless a change is clearly justified and approved.

Default implementation:

* Semantic HTML
* Modular CSS
* Native JavaScript ES modules
* IndexedDB
* Service worker
* Web app manifest
* Installable iPhone PWA
* Cloudflare Worker for all AI requests
* No framework unless a concrete technical requirement makes one necessary
* No build dependency unless it adds clear operational value

Do not collapse the application into one HTML file.

## Required architecture

Use clear separation between:

* Core state
* IndexedDB and migrations
* Game systems
* Narrative systems
* AI transport
* UI rendering
* Pillar-specific station logic
* Static content and configuration
* Testing
* Documentation

Follow the module map in the Bible as the starting architecture.

## File headers

Every JavaScript module must begin with:

`/* fb40 · <path> · v<semver> · <YYYY-MM-DD> */`

## Versioning

Maintain:

* Semantic app version
* Build date
* Schema version
* Migration version
* Visible build stamp in Settings

## No secrets in client code

The legacy app’s direct browser AI connection must not be repeated.

All AI calls must go through the Cloudflare Worker.

The client must never store or expose:

* AI provider API keys
* Cloudflare secrets
* GitHub credentials
* Private service tokens

## Offline-first behavior

All core systems must work offline:

* Launching
* Navigation
* Check-ins
* Station logs
* XP
* Streaks
* Levels
* Favor
* Quests
* Boss calculations
* Weekly review answers
* Authored scenes
* Chronicle
* Backup export

AI requests that cannot complete offline must enter the outbox and retry safely after reconnection.

A queued AI request must never be submitted twice in a way that creates duplicate scenes or rewards.

## Data integrity

Use the IndexedDB schema in the Bible.

Every schema modification requires:

* A versioned migration
* Backward compatibility
* Migration tests
* No destructive reset
* A recovery path

Never solve a schema problem by instructing the user to clear storage.

---

# 6. VISUAL WORLD

The visual target is not “a dark-themed productivity app.”

It is:

> A weathered field journal and inhabited medieval settlement seen by low firelight.

The experience must be dark, heavy, quiet, specific, and immersive.

## Platform

* Mobile-first PWA
* Primary frame: 390 × 844
* Maximum content width: 560px
* Single-column interface
* Safe-area support
* Touch-first controls
* No desktop dashboard transformation

## Visual authority

Follow DESIGN.md exactly:

* Night, iron, parchment, edge, ember, and ember-low tokens
* Ember is the only accent
* No red, green, or blue states
* No pure white or pure black
* Cinzel and EB Garamond only
* Maximum 4px corner radius
* No pill controls except where explicitly approved
* No drop shadows
* No glassmorphism
* No neumorphism
* No third font
* No modern SaaS card grid
* No confetti
* No particles
* No bounce
* No emoji
* No generic celebration animation

## Important conflict rule

The legacy HTML includes styling and interaction patterns that conflict with DESIGN.md, including larger radii, shadows, colorful states, and modern card treatments.

Do not carry those styles forward.

Preserve the underlying behavior, not the old presentation.

## World immersion requirement

Every phase must contribute to the final visual world.

The Settlement Map, keeper portraits, buildings, chapter presentation, lighting, weather, and permanent world changes must be treated as product systems—not decorative polish.

When final art assets do not yet exist:

1. Create an asset manifest.
2. Define the required dimensions, crop behavior, layer purpose, state variants, and filenames.
3. Use deliberately art-directed temporary assets or restrained environmental placeholders.
4. Never substitute generic flat icons, gradient rectangles, stock fantasy art, emoji, or cartoon mascots.
5. Keep asset replacement independent from system logic.

The UI must remain fully usable when an optional image fails to load.

---

# 7. CORE SYSTEM REQUIREMENTS

Implement the complete systems described in the Bible, including:

* Ten pillars and keepers
* Five building tiers
* Per-pillar XP and levels
* Per-pillar streaks
* Grace days
* Keeper favor and favor tiers
* Chapter focus pillars
* Forced-focus rules
* Daily tri-state check-in
* Honest line
* Confession flow
* Deep station logging
* Backfill rules
* Weekly review
* Authored campaign progression
* AI scene contract
* Scene validation and regeneration
* Boss roster
* Spawned bosses
* Boss pausing
* Boss intercession
* Quest issuance and expiration
* Relics
* Badges
* Ranks
* Weather and lighting
* Territory
* Chronicle
* Versus-past-self
* Apple Health import
* Backup and restoration
* Finale sequence
* Post-finale continuation

Use the exact formulas, thresholds, chapter gates, XP values, favor rules, boss conditions, and data contracts from the Bible unless Robert explicitly approves a change.

Do not “simplify” a defined mechanic without approval.

---

# 8. ONBOARDING AND PERSONALIZATION

The Prologue must replace generic app onboarding.

Required onboarding inputs:

* Pilgrim’s name
* Campaign start date, automatically stamped at first launch
* Exact fortieth birthday/finale date
* Prologue’s three permanent questions
* Optional campaign declaration or house words
* Optional cosmetic banner/emblem identity if it does not interfere with Phase 0 delivery

The Prologue answers must be:

* Stored permanently
* Date-stamped
* Editable only through an intentional, clearly recorded process
* Available to authored scenes
* Quoted in the Finale Vigil exactly as written

`FINALE_DATE` is currently unresolved in the source material.

Do not invent it.

The build must support entering it during onboarding and editing it from Settings with clear consequences shown before applying the change.

The campaign start becomes immutable after onboarding, except through an advanced recovery process.

---

# 9. KEEPER AND AI REQUIREMENTS

Every keeper must have:

* A unique voice pack
* Sample lines
* Forbidden habits
* Lexicon
* Failure posture
* Scripture register
* Favor state
* Recent contextual memory
* Relevant pillar data
* A limited conversation history
* A clear distinction from every other keeper

Do not produce ten versions of the same supportive assistant.

## Keeper chat

Keeper chat must:

* Live inside the keeper’s building
* Use only relevant context
* Remain available with authored fallback content when AI is unavailable
* Never claim knowledge outside the supplied context
* Never award XP simply because the user chatted
* Be stored locally with an intentional retention limit
* Clearly distinguish authored lines, generated responses, and recorded user text internally

## Weekly scene validation

Before displaying an AI-generated scene:

1. Confirm the response contract is valid.
2. Confirm at least three specific facts appear.
3. Confirm citations correspond to the supplied data window.
4. Reject banned phrases.
5. Reject generic encouragement.
6. Reject contradictions.
7. Regenerate once with stricter instructions.
8. If it fails again, show the authored fallback and log the failure.

Never display raw model JSON or malformed output.

---

# 10. PHASE-GATED EXECUTION

Build only one approved phase at a time.

Do not begin the next phase merely because the current one passes its tests.

At the end of each phase, stop and request approval.

## Phase 0 — Foundation

Build:

* Project structure
* Design tokens
* Base typography
* Grain and vignette
* Router
* Event system
* IndexedDB
* Schema and migrations
* Version system
* Basic Settings
* PWA manifest
* Service-worker foundation
* Backup foundation
* Smoke-test harness
* Empty but credible settlement shell
* Prologue/onboarding data capture foundation

Acceptance criteria:

* App boots with no console errors.
* IndexedDB survives reload.
* Routing works.
* Migration framework works.
* Build stamp is visible.
* Safe-area behavior works.
* PWA metadata is valid.
* The settlement shell looks like the same world as the final product.
* No later-phase mechanics are faked.

Stop for approval.

## Phase 1 — Living Daily Loop

Build:

* Settlement Map
* Ten building locations
* Pillar state
* Daily Check-In
* Chapter focus behavior
* Collapsed non-focus pillars
* Forced focus
* Honest line
* Confession entry
* XP
* Levels
* Streaks
* Grace days
* Building tiers
* Building dimness
* Weather and lighting
* Basic daily history
* Backfill and editing limits

Acceptance criteria:

* A complete check-in can be logged in 30–45 seconds.
* Data updates the correct pillars.
* XP and streak formulas match the Bible.
* Reloading preserves state.
* Building state and weather visibly change from deterministic test data.
* Missed behavior creates no negative copy.
* The map remains the home screen and primary progress visualization.

Stop for approval.

## Phase 2 — Buildings, Stations, and Keepers

Build:

* All ten building screens
* All ten deep-log stations
* Keeper portrait presentation
* Authored keeper conversations
* Keeper voice packs
* Favor
* Favor tiers
* Relevant log history
* Station validation
* Cosmetic pilgrim identity foundation
* Legacy record translation approved in the Phase 0 matrix

Acceptance criteria:

* Every station writes the correct structured data.
* No field exists without a downstream mechanic.
* Favor changes only through defined actions.
* Each keeper reads and sounds distinct.
* Building navigation works offline.
* Station logs influence the appropriate visible state.

Stop for approval.

## Phase 3 — Campaign and Weekly Review

Build:

* Prologue
* Seven chapters
* Short-campaign compression
* Authored beats
* Chapter focus logic
* Deed-gates
* Warm and cold chapter closings
* Weekly review unlock window
* Missed-review merging
* Five-step review flow
* Chronicle
* Authored scene fallback
* Campaign flags
* Permanent chapter map changes

Acceptance criteria:

* The complete campaign can run end to end without AI.
* A simulated calendar can advance through every chapter.
* Chapter gates and alternate closings work.
* A missed review merges safely.
* Authored scenes render in the correct keeper presentation.
* Chronicle entries remain immutable except through explicit correction tools.

This is the decisive product checkpoint. Do not proceed if the authored campaign does not carry emotional and narrative weight without AI.

Stop for approval.

## Phase 4 — AI Narrative Layer

Build:

* Cloudflare Worker
* Worker setup documentation
* Scene endpoint
* Keeper chat endpoint
* Spawned-boss naming endpoint
* Allowlisted origin
* Rate limiting
* Token limits
* Client contracts
* Offline outbox
* Retry handling
* Scene window builder
* Citation validation
* Specificity validation
* Banned-phrase validation
* One-time regeneration
* Authored fallback
* Error logging

Acceptance criteria:

* No secret appears in client files or browser storage.
* Core app works with the Worker unavailable.
* Queued calls retry once connectivity returns.
* Duplicate scene creation is prevented.
* Generic test responses are rejected.
* A valid scene names at least three real specifics.
* Each keeper remains voice-consistent.

Stop for approval.

## Phase 5 — Quests and Bosses

Build:

* Quest system
* Quest cost
* Quest completion
* Quest expiration
* Favor consequences
* Full authored boss roster
* Boss phases
* Boss HP
* Boss regeneration
* Spawn eligibility
* Spawn queue
* Maximum-two rule
* Pause rule
* Intercession
* Boss screen
* Boss event log
* Map consequences
* Authored boss beats with generated detail where appropriate

Acceptance criteria:

* Boss damage comes only from qualifying logged behavior.
* Boss state is deterministic.
* Maximum-two logic cannot be bypassed.
* Pauses and intercession follow exact limits.
* No shame copy appears.
* Boss records survive reload and migration.

Stop for approval.

## Phase 6 — Meaningful Rewards and Comparison

Build:

* All relics
* Relic mechanics
* Badges
* Ranks
* Cosmetic gear
* Map unlocks
* Territory
* Versus-past-self
* Month comparison
* Year comparison
* Same-week-last-year
* Permanent comparison access after 52 weeks

Acceptance criteria:

* No reward is a meaningless stat boost.
* Every relic changes a real interaction.
* Cosmetic gear never changes behavior calculations.
* Comparisons use accurate date ranges.
* No leaderboard or external comparison exists.

Stop for approval.

## Phase 7 — Health, Finale, and Release

Build:

* Apple Health export parser
* Web Worker parsing
* Progress display
* Shortcuts JSON import
* Health schema documentation
* Correlation views
* Hollow Fast triggers
* Full backup export
* Dry-run restore diff
* Merge and replace
* Thirty-day backup reminder
* Seven-day Finale
* Finale Vigil
* Generated campaign chronicle
* Day +1 continuation
* Accessibility pass
* Performance pass
* Offline release pass
* Asset replacement pass
* PWA installation validation
* Final documentation

Acceptance criteria:

* Large health exports do not freeze the UI.
* Health never creates a check-in decision automatically.
* Backup restores into a clean installation.
* Merge behavior is predictable and tested.
* Finale uses the actual campaign record.
* The final settlement shows true—not idealized—building states.
* Day +1 preserves the save and opens the next arc.
* The complete ship gate passes.

Stop for final approval.

---

# 11. REQUIRED DELIVERY FORMAT FOR EACH PHASE

Before coding a phase, provide:

## A. Phase contract

* What this phase will build
* What it will deliberately not build
* Files to create
* Files to modify
* Data changes
* Migration impact
* Visual assets required
* Risks
* Acceptance tests

## B. UX flow

Describe the actual user journey through the phase.

Do not provide only a component inventory.

## C. Implementation

Then implement the approved phase.

Do not use pseudocode where working code is expected.

Do not leave buttons connected to empty handlers.

Do not present a visual mockup as a completed feature.

## D. Verification report

At the end, provide:

* Files created
* Files changed
* Tests executed
* Test results
* Manual test steps
* Known limitations
* Deferred items
* Screenshots or rendered evidence when the environment supports them
* Data migration notes
* Confirmation that no unapproved phase work was added

## E. Approval gate

End with:

> Phase [number] is complete and ready for review. I will not begin Phase [next number] until you approve it.

---

# 12. QUALITY AND TESTING

The ship gate is mandatory:

1. Run syntax validation across every JavaScript module.
2. Run the smoke harness.
3. Boot the application.
4. Write a check-in.
5. Write representative station logs.
6. Reload and verify persistence.
7. Advance simulated time.
8. Render the map.
9. Confirm no console errors.
10. Confirm core navigation works offline.

As systems are added, expand automated tests to include:

* Migrations
* XP
* Streaks
* Grace days
* Levels
* Favor
* Chapter gates
* Review windows
* Boss calculations
* Quest expiration
* AI validation
* Backup diff
* Health parsing
* Finale dates

Do not mark a phase complete when its primary path works but edge cases remain untested.

---

# 13. CODE QUALITY RULES

* Keep modules focused.
* Avoid global mutable state.
* Centralize date calculations.
* Use local calendar dates rather than accidental UTC dates.
* Sanitize rendered user text.
* Use event delegation carefully.
* Add accessible labels.
* Preserve keyboard navigation.
* Respect reduced-motion settings.
* Handle image failures.
* Handle storage quota errors.
* Handle interrupted imports.
* Handle corrupted backup files.
* Handle Worker failures.
* Handle duplicate actions.
* Prevent double-submission.
* Never allow a UI animation to be the only feedback for a saved action.
* Use restrained, world-appropriate copy for errors.

Do not accumulate architectural debt with the promise to clean it up in Phase 7.

---

# 14. SUCCESS CRITERIA

The build succeeds when:

* Robert can use it daily without friction.
* The map immediately communicates the state of his life.
* Every building serves a real domain.
* Every field powers a real mechanic.
* The keepers feel like ten people, not one model with different names.
* A missed day is acknowledged without humiliation.
* A repeated struggle gains narrative weight without becoming a gimmick.
* Weekly review feels indispensable.
* The authored story works without AI.
* Generated scenes are unmistakably grounded in Robert’s own week.
* Long-term comparison is accurate.
* The settlement feels inherited, weathered, inhabited, and responsive.
* The product never resembles a cheerful wellness app.
* The codebase can survive years of campaign data and future arcs.
* The morning of the fortieth birthday reflects what Robert actually built.

---

# 15. YOUR FIRST RESPONSE

Do not begin coding immediately.

First:

1. Read all three source files completely.
2. Produce the Legacy Translation Matrix.
3. Identify any direct conflict between the Bible and DESIGN.md.
4. Identify any legacy feature that is not accounted for by the Bible.
5. Recommend preserve, merge, defer, or retire for each.
6. Confirm the proposed technical stack.
7. Present the Phase 0 contract.
8. List any required visual assets and the temporary asset strategy.
9. Identify the unresolved `FINALE_DATE` without blocking the foundation.
10. State any assumptions.
11. Stop and request approval to begin Phase 0.

Do not ask broad discovery questions already answered by the files.

Ask a question only when the answer would materially alter Phase 0 and cannot be safely represented as a configuration value or visible placeholder.

Do not proceed beyond the approved phase.
