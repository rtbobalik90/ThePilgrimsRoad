/* fb40 · /js/data/schema.js · v0.1.0 · 2026-07-25 */
export const DB_NAME = 'fb40';
export const STORE_NAMES = [
  'meta', 'days', 'logs', 'pillars', 'health', 'campaign', 'scenes',
  'bosses', 'quests', 'relics', 'badges', 'reviews', 'outbox'
];

export const STORE_DEFINITIONS = {
  meta: { keyPath: 'key' },
  days: { keyPath: 'date' },
  logs: { keyPath: 'id', indexes: [['pillarId', 'pillarId'], ['date', 'date']] },
  pillars: { keyPath: 'id' },
  health: { keyPath: 'date' },
  campaign: { keyPath: 'key' },
  scenes: { keyPath: 'id', indexes: [['chapterId', 'chapterId'], ['weekOf', 'weekOf']] },
  bosses: { keyPath: 'id' },
  quests: { keyPath: 'id', indexes: [['keeperId', 'keeperId'], ['pillarId', 'pillarId'], ['state', 'state']] },
  relics: { keyPath: 'id' },
  badges: { keyPath: 'id', indexes: [['ruleId', 'ruleId']] },
  reviews: { keyPath: 'weekOf' },
  outbox: { keyPath: 'id', indexes: [['endpoint', 'endpoint']] }
};
