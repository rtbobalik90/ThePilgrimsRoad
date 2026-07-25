/* fb40 · /js/systems/levels.js · v0.2.0 · 2026-07-25 */
export const MAX_LEVEL = 10;
export const LEVEL_COSTS = [120, 180, 240, 300, 360, 420, 480, 540, 600];
export const LEVEL_CUMULATIVE = LEVEL_COSTS.reduce((values, cost) => {
  values.push((values.at(-1) ?? 0) + cost);
  return values;
}, []);

export function levelFromXp(xp = 0) {
  const safeXp = Math.max(0, Number(xp) || 0);
  let level = 1;
  for (const threshold of LEVEL_CUMULATIVE) {
    if (safeXp < threshold) break;
    level += 1;
  }
  return Math.min(MAX_LEVEL, level);
}

export function levelProgress(xp = 0) {
  const level = levelFromXp(xp);
  if (level >= MAX_LEVEL) return { level, current: 0, required: 0, percent: 100 };
  const priorThreshold = level <= 1 ? 0 : LEVEL_CUMULATIVE[level - 2];
  const nextThreshold = LEVEL_CUMULATIVE[level - 1];
  const current = Math.max(0, xp - priorThreshold);
  const required = nextThreshold - priorThreshold;
  return { level, current, required, percent: Math.min(100, Math.round((current / required) * 100)) };
}

export function buildingTier(level = 1) {
  if (level >= 10) return 5;
  if (level >= 7) return 4;
  if (level >= 5) return 3;
  if (level >= 3) return 2;
  return 1;
}

export const TIER_LABELS = {
  1: 'Cleared ground and scaffold',
  2: 'Walls raised, roof open',
  3: 'Roofed, hung, and in use',
  4: 'Adorned and established',
  5: 'Light in the windows'
};
