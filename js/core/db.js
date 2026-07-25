/* fb40 · /js/core/db.js · v0.1.0 · 2026-07-25 */
import { DB_NAME, STORE_NAMES } from '../data/schema.js';
import { runMigrations } from '../data/migrate.js';
import { SCHEMA_VERSION } from './version.js';

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.addEventListener('success', () => resolve(request.result), { once: true });
    request.addEventListener('error', () => reject(request.error ?? new Error('IndexedDB request failed.')), { once: true });
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.addEventListener('complete', () => resolve(), { once: true });
    transaction.addEventListener('abort', () => reject(transaction.error ?? new Error('IndexedDB transaction was aborted.')), { once: true });
    transaction.addEventListener('error', () => reject(transaction.error ?? new Error('IndexedDB transaction failed.')), { once: true });
  });
}

export function openDatabase({ name = DB_NAME, version = SCHEMA_VERSION } = {}) {
  if (!('indexedDB' in globalThis)) return Promise.reject(new Error('IndexedDB is not available in this browser.'));
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    request.addEventListener('upgradeneeded', (event) => runMigrations(request.result, event.oldVersion, event.newVersion ?? version));
    request.addEventListener('success', () => resolve(request.result), { once: true });
    request.addEventListener('blocked', () => reject(new Error('The local record is open in another tab. Close it and try again.')), { once: true });
    request.addEventListener('error', () => reject(request.error ?? new Error('The local record could not be opened.')), { once: true });
  });
}

export async function getRecord(db, storeName, key) {
  const tx = db.transaction(storeName, 'readonly');
  return requestResult(tx.objectStore(storeName).get(key));
}

export async function getAllRecords(db, storeName) {
  const tx = db.transaction(storeName, 'readonly');
  return requestResult(tx.objectStore(storeName).getAll());
}

export async function putRecord(db, storeName, record) {
  const tx = db.transaction(storeName, 'readwrite');
  tx.objectStore(storeName).put(record);
  await transactionDone(tx);
  return record;
}

export async function deleteRecord(db, storeName, key) {
  const tx = db.transaction(storeName, 'readwrite');
  tx.objectStore(storeName).delete(key);
  await transactionDone(tx);
}

export async function atomicPut(db, entries) {
  const stores = [...new Set(entries.map((entry) => entry.store))];
  const tx = db.transaction(stores, 'readwrite');
  for (const entry of entries) tx.objectStore(entry.store).put(entry.record);
  await transactionDone(tx);
}

export async function exportStoreData(db) {
  const result = {};
  for (const store of STORE_NAMES) result[store] = await getAllRecords(db, store);
  return result;
}

export function closeDatabase(db) { db?.close(); }

export function deleteDatabase(name = DB_NAME) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(name);
    request.addEventListener('success', () => resolve(), { once: true });
    request.addEventListener('blocked', () => reject(new Error('The local record is still open in another tab.')), { once: true });
    request.addEventListener('error', () => reject(request.error ?? new Error('The local record could not be erased.')), { once: true });
  });
}

export { STORE_NAMES };
