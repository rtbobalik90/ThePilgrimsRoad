/* fb40 · /js/systems/worldstate.js · v0.2.0 · 2026-07-25 */
import { daysBetween, shiftDate } from '../core/dates.js';
import { PROLOGUE_FOCUS_IDS } from '../data/pillars.js';
import { buildingTier } from './levels.js';

export const WEATHER_LABELS = {
  storm: 'Storm',
  overcast: 'Overcast',
  clear: 'Clear',
  'dawn-gold': 'Dawn-gold'
};

export function deriveWorldState({ days = [], pillars = [], campaignStart, today, dimThreshold = 14 }) {
  const elapsed = Math.max(1, Math.min(14, daysBetween(campaignStart, today) + 1));
  const windowStart = shiftDate(today, -(elapsed - 1));
  const completedDays = days.filter((day) => day.completed && day.date >= windowStart && day.date <= today).length;
  const completionRate = Math.min(1, completedDays / elapsed);
  const streakHealth = pillars.length
    ? pillars.reduce((sum, pillar) => sum + Math.min(14, pillar.streak ?? 0) / 14, 0) / pillars.length
    : 0;
  const composite = Number((completionRate * 0.7 + streakHealth * 0.3).toFixed(3));
  const hasData = completedDays > 0;
  const weather = !hasData ? 'overcast' : composite >= 0.78 ? 'dawn-gold' : composite >= 0.52 ? 'clear' : composite >= 0.28 ? 'overcast' : 'storm';

  const buildings = pillars.map((pillar) => {
    const referenceDate = pillar.lastLogDate || campaignStart;
    const idleDays = Math.max(0, daysBetween(referenceDate, today));
    const dimmed = idleDays >= dimThreshold;
    return { ...pillar, idleDays, dimmed, tier: buildingTier(pillar.level) };
  });
  const dimmedIds = buildings.filter(({ dimmed }) => dimmed).map(({ id }) => id);
  const focusIds = [...new Set([...PROLOGUE_FOCUS_IDS, ...dimmedIds])];

  return {
    weather,
    weatherLabel: WEATHER_LABELS[weather],
    composite,
    completionRate,
    streakHealth,
    completedDays,
    elapsedDays: elapsed,
    buildings,
    focusIds,
    dimmedCount: dimmedIds.length
  };
}
