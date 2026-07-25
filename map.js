/* fb40 · /js/core/config.js · v0.2.0 · 2026-07-25 */
let configPromise;

function validateConfig(config) {
  const required = ['WEEK_ANCHOR', 'PILLAR_MAX_LEVEL', 'BUILDING_TIERS', 'DIM_THRESHOLD_DAYS', 'CHECKIN_MODE', 'TIME_ZONE'];
  for (const key of required) if (config?.[key] === undefined || config?.[key] === null) throw new Error(`Configuration is missing ${key}.`);
  if (config.PILLAR_MAX_LEVEL !== 10) throw new Error('Phase 1 requires PILLAR_MAX_LEVEL 10.');
  if (config.CHECKIN_MODE !== 'focus') throw new Error('Phase 1 requires focus check-ins.');
  return Object.freeze({ ...config });
}

export function loadConfig() {
  configPromise ??= fetch(new URL('../../data/config.json', import.meta.url)).then((response) => {
    if (!response.ok) throw new Error('The campaign configuration could not be loaded.');
    return response.json();
  }).then(validateConfig);
  return configPromise;
}
