/* fb40 · /tools/smoke.mjs · v0.1.0 · 2026-07-25 */
import { MemoryIndexedDB } from './memory-indexeddb.mjs';

globalThis.indexedDB = new MemoryIndexedDB();

const { openDatabase, atomicPut, closeDatabase, deleteDatabase, getRecord, STORE_NAMES } = await import('../js/core/db.js');
const { createBackupEnvelope, validateBackupEnvelope } = await import('../js/data/backup.js');
const { STORE_DEFINITIONS } = await import('../js/data/schema.js');
const { mapMarkup } = await import('../js/ui/map.js');
const { Router } = await import('../js/core/router.js');

const assertions = [];
function assert(condition, message) {
  if (!condition) throw new Error(message);
  assertions.push(message);
}

const name = `fb40-smoke-${Date.now()}`;
let db;
try {
  db = await openDatabase({ name, version: 1 });
  assert(STORE_NAMES.every((store) => db.objectStoreNames.contains(store)), 'All known stores exist.');
  for (const [storeName, definition] of Object.entries(STORE_DEFINITIONS)) {
    const tx = db.transaction(storeName, 'readonly');
    for (const [indexName] of definition.indexes ?? []) {
      assert(tx.objectStore(storeName).indexNames.contains(indexName), `${storeName}.${indexName} exists.`);
    }
  }

  await atomicPut(db, [
    { store: 'meta', record: { key: 'campaignStart', value: '2026-07-25' } },
    { store: 'meta', record: { key: 'finaleDate', value: '2030-03-01' } },
    { store: 'meta', record: { key: 'pilgrimName', value: 'Robert' } },
    { store: 'meta', record: { key: 'onboardingStatus', value: 'complete' } },
    { store: 'campaign', record: { key: 'state', value: { chapterId: 'prologue', beatIndex: 0, prologueAnswers: [{ questionId: 'intent', answer: 'Build a faithful life.' }] } } }
  ]);
  closeDatabase(db);
  db = await openDatabase({ name, version: 1 });
  assert((await getRecord(db, 'meta', 'campaignStart')).value === '2026-07-25', 'IndexedDB survives reopen.');
  assert((await getRecord(db, 'campaign', 'state')).value.chapterId === 'prologue', 'Campaign record survives reopen.');

  const envelope = await createBackupEnvelope(db);
  assert(validateBackupEnvelope(envelope).valid, 'Backup envelope validates.');
  assert(Object.keys(envelope.stores).length === STORE_NAMES.length, 'Backup contains every store.');

  const map = mapMarkup({ meta: { pilgrimName: 'Robert', campaignStart: '2026-07-25', finaleDate: '2030-03-01' } });
  assert(map.includes('settlement-frame'), 'Settlement shell renders.');
  assert((map.match(/district-row/g) ?? []).length === 6, 'Settlement district structure renders.');

  const router = new Router({ basePath: '/full-by-40/' });
  assert(router.url('/settings') === '/full-by-40/settings', 'Router builds project-site URLs.');

  console.log('Smoke test passed.');
  for (const assertion of assertions) console.log(`- ${assertion}`);
} finally {
  closeDatabase(db);
  await deleteDatabase(name).catch(() => {});
}
