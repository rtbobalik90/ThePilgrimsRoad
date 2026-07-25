/* fb40 · /tools/memory-indexeddb.mjs · v0.1.0 · 2026-07-25 */
class NameList {
  constructor(source) { this.source = source; }
  contains(name) { return this.source.has(name); }
  item(index) { return [...this.source.keys()][index] ?? null; }
  get length() { return this.source.size; }
  [Symbol.iterator]() { return this.source.keys(); }
}

class MemoryRequest extends EventTarget {
  result = undefined;
  error = null;
}

function emit(target, type, properties = {}) {
  const event = new Event(type);
  Object.assign(event, properties);
  target.dispatchEvent(event);
}

class MemoryIndexList {
  constructor(indexes) { this.indexes = indexes; }
  contains(name) { return this.indexes.has(name); }
  item(index) { return [...this.indexes.keys()][index] ?? null; }
  get length() { return this.indexes.size; }
  [Symbol.iterator]() { return this.indexes.keys(); }
}

class UpgradeObjectStore {
  constructor(store) { this.store = store; }
  createIndex(name, keyPath, options = {}) { this.store.indexes.set(name, { keyPath, options }); return { name, keyPath }; }
  get indexNames() { return new MemoryIndexList(this.store.indexes); }
}

class MemoryObjectStore {
  constructor(transaction, store) { this.transaction = transaction; this.store = store; }
  get indexNames() { return new MemoryIndexList(this.store.indexes); }
  get(key) { return this.transaction.request(() => structuredClone(this.store.records.get(key))); }
  getAll() { return this.transaction.request(() => [...this.store.records.values()].map((value) => structuredClone(value))); }
  put(record) {
    return this.transaction.request(() => {
      const key = record?.[this.store.keyPath];
      if (key === undefined) throw new Error(`Record is missing keyPath ${this.store.keyPath}.`);
      this.store.records.set(key, structuredClone(record));
      return key;
    });
  }
  delete(key) { return this.transaction.request(() => this.store.records.delete(key)); }
}

class MemoryTransaction extends EventTarget {
  constructor(database, stores, mode) {
    super();
    this.database = database;
    this.stores = stores;
    this.mode = mode;
    this.error = null;
    this.pending = 0;
    this.completionScheduled = false;
    queueMicrotask(() => this.scheduleCompletion());
  }
  objectStore(name) {
    if (!this.stores.includes(name)) throw new Error(`Store ${name} is outside this transaction.`);
    const store = this.database.data.stores.get(name);
    if (!store) throw new Error(`Store ${name} does not exist.`);
    return new MemoryObjectStore(this, store);
  }
  request(operation) {
    const request = new MemoryRequest();
    this.pending += 1;
    queueMicrotask(() => {
      try { request.result = operation(); emit(request, 'success'); }
      catch (error) { request.error = error; this.error = error; emit(request, 'error'); emit(this, 'error'); }
      finally { this.pending -= 1; this.scheduleCompletion(); }
    });
    return request;
  }
  scheduleCompletion() {
    if (this.pending !== 0 || this.completionScheduled) return;
    this.completionScheduled = true;
    queueMicrotask(() => {
      if (this.pending !== 0) { this.completionScheduled = false; this.scheduleCompletion(); return; }
      emit(this, this.error ? 'abort' : 'complete');
    });
  }
}

class MemoryDatabase {
  constructor(data) { this.data = data; this.name = data.name; this.version = data.version; }
  get objectStoreNames() { return new NameList(this.data.stores); }
  createObjectStore(name, { keyPath }) {
    if (this.data.stores.has(name)) throw new Error(`Store ${name} already exists.`);
    const store = { keyPath, records: new Map(), indexes: new Map() };
    this.data.stores.set(name, store);
    return new UpgradeObjectStore(store);
  }
  transaction(storeNames, mode = 'readonly') {
    const stores = Array.isArray(storeNames) ? storeNames : [storeNames];
    return new MemoryTransaction(this, stores, mode);
  }
  close() {}
}

export class MemoryIndexedDB {
  constructor() { this.databases = new Map(); }
  open(name, version = 1) {
    const request = new MemoryRequest();
    queueMicrotask(() => {
      try {
        let data = this.databases.get(name);
        if (!data) {
          data = { name, version: 0, stores: new Map() };
          this.databases.set(name, data);
        }
        if (version < data.version) throw new Error('VersionError');
        const db = new MemoryDatabase(data);
        request.result = db;
        if (version > data.version) {
          const oldVersion = data.version;
          data.version = version;
          db.version = version;
          emit(request, 'upgradeneeded', { oldVersion, newVersion: version });
        }
        emit(request, 'success');
      } catch (error) {
        request.error = error;
        emit(request, 'error');
      }
    });
    return request;
  }
  deleteDatabase(name) {
    const request = new MemoryRequest();
    queueMicrotask(() => {
      this.databases.delete(name);
      emit(request, 'success');
    });
    return request;
  }
}
