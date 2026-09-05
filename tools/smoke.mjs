/* fb40 · /tools/smoke.mjs · v0.2.0 · 2026-09-05 */
import { MemoryIndexedDB } from './memory-indexeddb.mjs';

globalThis.indexedDB = new MemoryIndexedDB();

const { openDatabase, atomicPut, closeDatabase, deleteDatabase, getRecord, STORE_NAMES } = await import('../js/core/db.js');
const { createBackupEnvelope, validateBackupEnvelope } = await import('../js/data/backup.js');
const { STORE_DEFINITIONS } = await import('../js/data/schema.js');
const { mapMarkup } = await import('../js/ui/map.js');
const { Router } = await import('../js/core/router.js');
const { acceptFirstFlame, completeFirstFlame, loadChapelState, FIRST_FLAME_XP } = await import('../js/systems/chapel.js');

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
  assert(map.includes('data-route="/chapel"'), 'The Keep exposes a Chapel entry point.');

  const router = new Router({ basePath: '/full-by-40/' });
  assert(router.url('/settings') === '/full-by-40/settings', 'Router builds project-site URLs.');
  assert(router.url('/chapel') === '/full-by-40/chapel', 'Router builds Chapel deep links.');

  const initialChapel = await loadChapelState(db, '2026-09-05');
  assert(initialChapel.quest.state === 'available', 'First Flame begins available.');
  assert(initialChapel.scene.restorationTier === 0, 'Chapel begins unrestored.');

  await acceptFirstFlame(db);
  const acceptedChapel = await loadChapelState(db, '2026-09-05');
  assert(acceptedChapel.quest.state === 'accepted', 'Aldous quest acceptance persists.');

  const firstCompletion = await completeFirstFlame(db, { date: '2026-09-05', source: 'demo' });
  assert(firstCompletion.duplicate === false, 'First Faith completion is accepted.');
  assert(firstCompletion.pillar.xp === FIRST_FLAME_XP, 'Faith completion awards the expected XP.');
  assert(firstCompletion.scene.restorationTier === 1, 'Faith completion restores the First Flame.');
  assert(firstCompletion.quest.state === 'complete', 'Faith completion finishes Aldous quest.');

  const duplicateCompletion = await completeFirstFlame(db, { date: '2026-09-05', source: 'demo' });
  assert(duplicateCompletion.duplicate === true, 'Duplicate Faith completion is rejected.');
  assert(duplicateCompletion.pillar.xp === FIRST_FLAME_XP, 'Duplicate completion does not award XP twice.');

  closeDatabase(db);
  db = await openDatabase({ name, version: 1 });
  const persistedChapel = await loadChapelState(db, '2026-09-05');
  assert(persistedChapel.completion?.status === 'complete', 'Faith activity completion survives reopen.');
  assert(persistedChapel.scene.restorationTier === 1, 'Chapel restoration survives reopen.');
  assert(persistedChapel.pillar.xp === FIRST_FLAME_XP, 'Faith XP survives reopen.');

  console.log('Smoke test passed.');
  for (const assertion of assertions) console.log(`- ${assertion}`);
} finally {
  closeDatabase(db);
  await deleteDatabase(name).catch(() => {});
}
