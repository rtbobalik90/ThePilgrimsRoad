/* fb40 · /js/systems/xp.js · v0.2.0 · 2026-07-25 */
export const MARK = Object.freeze({ MISSED: 0, PARTIAL: 1, KEPT: 2 });
export const MARK_XP = Object.freeze({ [MARK.MISSED]: 0, [MARK.PARTIAL]: 4, [MARK.KEPT]: 10 });

export function isExplicitMark(value) {
  return value === MARK.MISSED || value === MARK.PARTIAL || value === MARK.KEPT;
}

export function isPositiveMark(value) {
  return value === MARK.PARTIAL || value === MARK.KEPT;
}

export function streakMultiplier(streak = 0) {
  if (streak >= 60) return 1.5;
  if (streak >= 21) return 1.3;
  if (streak >= 7) return 1.15;
  return 1;
}

export function multipliedXp(base, streak) {
  return Math.round(base * streakMultiplier(streak));
}
