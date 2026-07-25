/* fb40 · /js/data/migrate.js · v0.1.0 · 2026-07-25 */
import { STORE_DEFINITIONS } from './schema.js';

function createStore(db, name, definition) {
  if (db.objectStoreNames.contains(name)) return;
  const store = db.createObjectStore(name, { keyPath: definition.keyPath });
  for (const [indexName, keyPath, options = {}] of definition.indexes ?? []) {
    store.createIndex(indexName, keyPath, options);
  }
}

const MIGRATIONS = [
  {
    version: 1,
    description: 'Create the complete known Full by 40 store set.',
    apply(db) {
      for (const [name, definition] of Object.entries(STORE_DEFINITIONS)) {
        createStore(db, name, definition);
      }
    }
  }
];

export function runMigrations(db, oldVersion, targetVersion) {
  for (const migration of MIGRATIONS) {
    if (migration.version > oldVersion && migration.version <= targetVersion) migration.apply(db);
  }
}

export { MIGRATIONS };
