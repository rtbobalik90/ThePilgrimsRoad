/* fb40 · /js/content/first-flame.js · Sprint 01 · 2026-09-05 */

export const ALDOUS = Object.freeze({
  id: 'aldous',
  canonicalStatus: 'sprint-01-proposed',
  role: 'Keeper of the Chapel',
  location: 'The Chapel',
  pillarId: 'faith',
  worldview: 'Faithfulness is proven by return, not intensity.',
  strengths: ['steady', 'observant', 'practical', 'reverent'],
  weaknesses: ['slow to ask for help', 'can hide grief inside useful work'],
  history: 'Aldous has kept the Chapel from disappearing by doing ordinary repairs no one applauded: resetting loose stones, drying old books, replacing roof pegs, and keeping the altar clean even when the room stood empty.',
  relationshipArc: 'He begins as a guarded caretaker who watches whether the Pilgrim returns. Trust grows through repeated faithful action, not speeches.',
  voice: 'Concise, grounded, quietly demanding, dry warmth, never theatrical or sermonizing.'
});

export const CHAPEL_LORE = Object.freeze({
  id: 'chapel',
  canonicalStatus: 'sprint-01-proposed',
  name: 'The Chapel',
  purpose: 'A place where the Pilgrim turns real prayer, Scripture, Quiet Hour, and reflection into visible restoration.',
  dormant: 'The Chapel is not ruined. It is neglected. Dust gathers, brass darkens, and the room holds the silence of a place waiting to be used again.',
  firstRestoration: 'The First Flame does not rebuild the room. One candle burns. Warmth reaches a little farther. The first change is small enough to feel true.',
  principle: 'The Chapel responds to faithful return. It never shames absence.'
});

export const PRAYER_BENCH = Object.freeze({
  id: 'prayer-bench',
  name: 'The Prayer Bench',
  lore: 'Dark oak worn smooth at the hand rail, repaired more than once, built for kneeling rather than display. The point is not the object. The point is what the Pilgrim does when he stops here.',
  activityId: 'quiet-hour',
  activityLabel: 'Quiet Hour'
});

export const FIRST_FLAME_CONTENT = Object.freeze({
  id: 'chapel:first-flame',
  title: 'The First Flame',
  canonicalStatus: 'sprint-01-proposed',
  summary: 'Return attention to God in real life, then watch the Chapel answer.',
  rewardXp: 10,
  rewardStatus: 'experimental-sprint-01',
  beats: [
    'Enter the Chapel.',
    'Speak with Aldous.',
    'Inspect the Prayer Bench.',
    'Complete a Quiet Hour in real life.',
    'Return to see the First Flame lit.'
  ],
  dialogue: {
    available: 'A chapel is not restored by stone alone. Begin with one faithful hour, and we will see what answers.',
    accepted: 'Do not hurry it. Give the hour your full attention, then return when the prayer is finished.',
    complete: 'The flame remembers what you brought here. Do not worship the feeling of progress. Return tomorrow because He is worthy.',
    repeat: 'The flame is already lit today. Sit if you need to. Not every return needs a reward.'
  }
});
