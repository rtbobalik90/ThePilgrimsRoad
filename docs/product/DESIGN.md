# DESIGN.md — Full by 40: The Pilgrim's Road

A gamified life-tracking app framed as a medieval pilgrimage. Iron, ember, and scripture. It should feel like a weathered field journal lit by a low fire — never like a wellness app.

**One-line brief for any screen:** dark, heavy, quiet, and specific. If it looks encouraging, it's wrong.

---

## PLATFORM

- Mobile-first, installable web app (PWA on iPhone home screen). Not native.
- Design frame: **390 × 844**.
- Content column: **max 560px**, centered, 20px side gutters.
- Respect safe-area insets top and bottom.
- Single-column only. No side-by-side cards, no responsive desktop layout.

---

## COLOR

| Token | Hex | Use |
|---|---|---|
| `--night` | `#0E0B07` | Page background. Everything sits on this. |
| `--iron` | `#221C15` | Panel and card fill. |
| `--iron-raised` | `#2B231A` | Raised surfaces: bottom sheets, active rows, portrait plates. |
| `--edge` | `#3A2F20` | All borders, dividers, hairlines. 1px. |
| `--parchment` | `#E6D6B0` | Primary text. |
| `--parchment-dim` | `#9A8C6E` | Secondary text, labels, timestamps. |
| `--ember` | `#C98A2E` | The only accent. Active state, XP fill, keeper names, primary action. |
| `--ember-low` | `#7A5219` | Ember at rest: inactive bars, unlit glyphs, muted accent. |

**Rules:**
- **One accent, ever.** Ember. No green, no blue, no red — not for success, not for error, not for a broken streak. Failure is rendered as *absence of ember*, never as red.
- No pure white, no pure black. `#FFFFFF` and `#000000` are banned.
- No gradients except a single radial vignette per screen and the ember glow on lit windows.
- Dark mode is the only mode.

---

## TYPOGRAPHY

- **Display — Cinzel.** Chapter titles, keeper names, building names, rank labels, numerals in stats. Letter-spacing +0.04em. Small caps feel. Never for body text.
- **Body — EB Garamond.** All prose, all scene text, all UI copy, all form labels. Line-height 1.6.

| Role | Font | Size | Weight |
|---|---|---|---|
| Chapter title | Cinzel | 30 | 600 |
| Screen title | Cinzel | 22 | 600 |
| Keeper name | Cinzel | 17 | 600, ember |
| Building name | Cinzel | 16 | 500 |
| Body / scene prose | EB Garamond | 17 | 400 |
| Secondary / label | EB Garamond | 14 | 400, parchment-dim |
| Micro / timestamp | EB Garamond | 12 | 400, parchment-dim |

Never more than two fonts on a screen. No sans-serif anywhere.

---

## TEXTURE & DEPTH

- **Grain:** SVG `feTurbulence` fractal noise, fixed-position overlay, ~4% opacity, over the entire viewport. Present on every screen.
- **Vignette:** radial darkening at the edges, subtle, always on.
- **No drop shadows.** Depth comes from the `--edge` hairline and the fill step from `--iron` to `--iron-raised`.
- **Corner radius: 4px maximum.** This is stone and iron. Pill shapes and 16px radii are forbidden.

---

## COMPONENTS

**Bottom bar** — 4 items: Map · Check-in · Review · Chronicle. Iron fill, 1px top edge, ember for the active item, `--ember-low` for the rest. Text labels in Cinzel 11, no icons where a word will do.

**Bottom sheet** — the primary modal. Rises from the bottom, `--iron-raised` fill, 4px top corners, 1px edge, a 36×3px `--edge` drag handle. Backdrop is night at 70%. Never a centered dialog box.

**Tri-state control (Kept / Partial / Missed)** — three equal segments in a 1px edge frame.
- *Kept:* solid `--ember` fill, night text.
- *Partial:* transparent fill, `--ember` 1px border, ember text.
- *Missed:* `--iron` fill, `--parchment-dim` text. **Flat and quiet — never red, never an X, never a frown.**

**XP bar** — 4px tall, `--iron` track, `--ember` fill, square ends. Level numeral in Cinzel to the left.

**Boss HP bar** — 6px tall, `--iron` track, `--ember-low` fill. HP falls left to right. No red, no shake, no damage numbers flying.

**Keeper portrait plate** — full-bleed portrait image, night gradient rising from the bottom third, keeper name in Cinzel ember above a parchment text plate at the lower third. Visual-novel layout: portrait behind, text in front.

**Parchment text plate** — `--iron-raised` at 92% opacity, 1px `--edge`, 20px padding, EB Garamond 17. Tap anywhere to advance. A small ember caret in the lower-right when more text follows.

**Building card** — a row on the map. Building name in Cinzel, keeper name in `--parchment-dim` beneath it, XP bar at the bottom. A dimmed building (14+ days idle) renders at 45% opacity with no ember anywhere in the row.

**Badge / sigil** — a small iron lozenge with an ember line-glyph, 32px. Awarded as a line of text plus the sigil. Never animated.

---

## MOTION

Slow and heavy. Nothing bounces.

- Bottom sheets rise: 240ms, ease-out.
- Screen transitions: 180ms cross-fade. No slide, no push.
- Ember glow (lit windows, active accents): 4s breathe cycle, ±8% opacity.
- XP bar fill: 600ms linear.
- **No spring physics. No confetti. No particles. No emoji. No celebration animation of any kind.**

---

## UI COPY VOICE

Spare, weighty, declarative. Second person. Never exclamatory.

- Yes: "Logged." / "The Chapel has been dark for nine days." / "Two remain."
- No: "Great job!" / "You've got this!" / "Nice streak 🔥" / "Oops, looks like you missed a day!"

A broken streak is stated as a fact and nothing else. There is no consoling copy anywhere in the product.

---

## HARD DON'TS

1. No red, green, or blue. Ember is the only accent.
2. No emoji, no confetti, no particles, no bounce.
3. No rounded cards, pills, or radii above 4px.
4. No sans-serif, no third font.
5. No drop shadows, no glassmorphism, no neumorphism.
6. No stock illustration style, no flat vector mascots, no 3D icons.
7. No guilt, shame, or consolation copy — ever.
8. No white space that reads as "clean and airy." This design is dense and low-lit.

---

## SCREENS TO DESIGN (in order of importance)

1. **Settlement Map** — home. Ten buildings arranged on a hill, weather and light state, chapter banner, one primary action. This screen carries the product.
2. **Daily Check-In** — bottom sheet. Four focus-pillar rows with tri-state controls, a collapsed "The rest of the settlement (6)" row, and one free-text "honest line" field.
3. **VN Keeper Chat** — full-bleed portrait, parchment text plate, tap-advance.
4. **Building** — keeper portrait, pillar level and XP bar, active boss, quest list, station entry.
5. **Weekly Review** — five sequential steps, one per screen.
6. **Boss** — name, HP bar, current phase with its win condition in plain English, last five damage events.
7. **Chronicle** — the archive of every scene, by chapter.
