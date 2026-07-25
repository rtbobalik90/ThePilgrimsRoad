/* fb40 · /tools/smoke-browser.js · v0.1.0 · 2026-07-25 */
import { openDatabase, atomicPut, closeDatabase, deleteDatabase, getRecord, STORE_NAMES } from '../js/core/db.js';
import { createBackupEnvelope, validateBackupEnvelope } from '../js/data/backup.js';
import { STORE_DEFINITIONS } from '../js/data/schema.js';
import { mapMarkup } from '../js/ui/map.js';

const output = document.querySelector('#results');
const assertions = [];
function assert(condition, message) { if (!condition) throw new Error(message); assertions.push(message); }

async function run() {
  const name = `fb40-smoke-${Date.now()}`;
  let db;
  try {
    db = await openDatabase({ name, version: 1 });
    assert(STORE_NAMES.every((store) => db.objectStoreNames.contains(store)), 'All known stores exist.');
    for (const [storeName, definition] of Object.entries(STORE_DEFINITIONS)) {
      const tx = db.transaction(storeName, 'readonly');
      for (const [indexName] of definition.indexes ?? []) assert(tx.objectStore(storeName).indexNames.contains(indexName), `${storeName}.${indexName} exists.`);
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

    const fixtureState = { meta: { pilgrimName: 'Robert', campaignStart: '2026-07-25', finaleDate: '2030-03-01' } };
    document.querySelector('#fixture').innerHTML = mapMarkup(fixtureState);
    assert(Boolean(document.querySelector('.settlement-frame')), 'Settlement shell renders.');
    assert(document.querySelectorAll('.district-row').length === 6, 'Settlement district structure renders.');

    output.textContent = assertions.join(' | ');
    document.body.dataset.status = 'pass';
  } catch (error) {
    output.textContent = error.stack || error.message;
    document.body.dataset.status = 'fail';
  } finally {
    closeDatabase(db);
    await deleteDatabase(name).catch(() => {});
  }
}
run();
