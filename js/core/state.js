/* fb40 · /js/core/state.js · v0.1.0 · 2026-07-25 */
import { atomicPut, getRecord } from './db.js';
import { APP_TIME_ZONE, localDateISO } from './dates.js';
import { APP_VERSION, BUILD_DATE, MIGRATION_VERSION, SCHEMA_VERSION } from './version.js';

const META_KEYS = ['appVersion', 'buildDate', 'schemaVersion', 'migrationVersion', 'campaignStart', 'finaleDate', 'timeZone', 'onboardingStatus', 'pilgrimName', 'lastBackupAt', 'lastRoute', 'finaleDateHistory'];

export async function ensureFirstBootMetadata(db) {
  const currentStart = await getRecord(db, 'meta', 'campaignStart');
  const currentStatus = await getRecord(db, 'meta', 'onboardingStatus');
  const campaignStart = currentStart?.value ?? localDateISO();
  const entries = [
    { store: 'meta', record: { key: 'appVersion', value: APP_VERSION } },
    { store: 'meta', record: { key: 'buildDate', value: BUILD_DATE } },
    { store: 'meta', record: { key: 'schemaVersion', value: SCHEMA_VERSION } },
    { store: 'meta', record: { key: 'migrationVersion', value: MIGRATION_VERSION } },
    { store: 'meta', record: { key: 'timeZone', value: APP_TIME_ZONE } }
  ];
  if (!currentStart) entries.push({ store: 'meta', record: { key: 'campaignStart', value: campaignStart } });
  if (!currentStatus) entries.push({ store: 'meta', record: { key: 'onboardingStatus', value: 'draft' } });
  await atomicPut(db, entries);
  return campaignStart;
}

export async function loadAppState(db) {
  const metaEntries = await Promise.all(META_KEYS.map((key) => getRecord(db, 'meta', key)));
  const meta = Object.fromEntries(metaEntries.filter(Boolean).map((entry) => [entry.key, entry.value]));
  const campaign = await getRecord(db, 'campaign', 'state');
  const draft = await getRecord(db, 'campaign', 'onboardingDraft');
  return { db, meta, campaign: campaign?.value ?? null, draft: draft?.value ?? null };
}

export async function saveLastRoute(db, route) {
  await atomicPut(db, [{ store: 'meta', record: { key: 'lastRoute', value: route } }]);
}
