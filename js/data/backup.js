/* fb40 · /js/data/backup.js · v0.1.0 · 2026-07-25 */
import { exportStoreData } from '../core/db.js';
import { backupDateStamp } from '../core/dates.js';
import { APP_VERSION, SCHEMA_VERSION } from '../core/version.js';
import { STORE_NAMES } from './schema.js';

export async function createBackupEnvelope(db) {
  return {
    format: 'fb40-backup',
    formatVersion: 1,
    exportedAt: new Date().toISOString(),
    appVersion: APP_VERSION,
    schemaVersion: SCHEMA_VERSION,
    stores: await exportStoreData(db)
  };
}

export function validateBackupEnvelope(value) {
  const errors = [];
  if (!value || typeof value !== 'object') errors.push('The file does not contain a JSON object.');
  if (value?.format !== 'fb40-backup') errors.push('The backup format is not recognized.');
  if (value?.formatVersion !== 1) errors.push('The backup format version is not supported.');
  if (!value?.stores || typeof value.stores !== 'object') errors.push('The backup has no store data.');
  for (const store of STORE_NAMES) if (!Array.isArray(value?.stores?.[store])) errors.push(`Store “${store}” is missing or invalid.`);
  return { valid: errors.length === 0, errors };
}

export function downloadBackup(envelope) {
  const blob = new Blob([JSON.stringify(envelope, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `fb40-backup-${backupDateStamp()}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export async function inspectBackupFile(file) {
  const text = await file.text();
  let parsed;
  try { parsed = JSON.parse(text); }
  catch { return { valid: false, errors: ['The file is not valid JSON.'], envelope: null }; }
  const result = validateBackupEnvelope(parsed);
  return { ...result, envelope: parsed };
}
