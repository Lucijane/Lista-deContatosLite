const KEYS = { DATA: "users.v1", META: "users.meta.v1" };

export class LocalStore {
  constructor(storage = window.localStorage){ this.s = storage; }
  readAll(){ const t = this.s.getItem(KEYS.DATA); return t ? JSON.parse(t) : []; }
  writeAll(arr){
    this.s.setItem(KEYS.DATA, JSON.stringify(arr));
    this.s.setItem(KEYS.META, JSON.stringify({ version:1, lastSyncAt:new Date().toISOString() }));
  }
}