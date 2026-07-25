/* fb40 · /js/data/pillars.js · v0.2.0 · 2026-07-25 */
export const PILLAR_DEFINITIONS = [
  { id: 'chapel', building: 'Chapel', keeper: 'Aldous', domain: 'Faith, prayer, scripture', map: { x: 34, y: 18 } },
  { id: 'watchtower', building: 'Watchtower', keeper: 'Garrick', domain: 'Vigilance, purity, guarding the mind', map: { x: 69, y: 15 } },
  { id: 'greathall', building: 'Great Hall', keeper: 'Tomas', domain: 'Friendship, brotherhood, community', map: { x: 44, y: 41 } },
  { id: 'treasury', building: 'Treasury', keeper: 'Mercer', domain: 'Money, stewardship, generosity', map: { x: 39, y: 61 } },
  { id: 'garden', building: 'Garden', keeper: 'Linden', domain: 'Rest, sabbath, hobbies, joy', map: { x: 78, y: 61 } },
  { id: 'forge', building: 'Forge', keeper: 'Wulf', domain: 'Work, craft, calling', map: { x: 23, y: 57 } },
  { id: 'hearth', building: 'Hearth', keeper: 'The Hearthkeeper', domain: 'Marriage, family, emotional life', map: { x: 65, y: 43 } },
  { id: 'gate', building: 'Gate', keeper: 'The Steward', domain: 'Commitment, boundaries, yes and no', map: { x: 56, y: 89 } },
  { id: 'trainingyard', building: 'Training Yard', keeper: 'Hoel', domain: 'Fitness, strength, discipline', map: { x: 24, y: 76 } },
  { id: 'granary', building: 'Granary', keeper: 'Ansel', domain: 'Food, sleep, health inputs', map: { x: 48, y: 76 } }
];

export const PILLAR_IDS = PILLAR_DEFINITIONS.map(({ id }) => id);
export const PILLAR_BY_ID = Object.fromEntries(PILLAR_DEFINITIONS.map((pillar) => [pillar.id, pillar]));
export const PROLOGUE_FOCUS_IDS = ['chapel', 'hearth', 'gate', 'watchtower'];

export function createPillarRecord(definition) {
  return {
    ...definition,
    xp: 0,
    level: 1,
    streak: 0,
    bestStreak: 0,
    graceUsedOn: null,
    lastLogDate: null,
    lastStreakBreakDate: null,
    favor: 0,
    updatedAt: null
  };
}
