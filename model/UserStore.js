import { User } from "./User.js";
import { LocalStore } from "./storage/LocalStore.js";

export class UserStore {
  #store; #subs = [];
  constructor(store = new LocalStore()){
    this.#store = store;
  }

  subscribe(fn){ this.#subs.push(fn); }
  #notify(){ for (const fn of this.#subs) fn(this.list()); }

  list(){
    return this.#store.readAll()
      .map(User.fromJSON)
      .filter(u => u.active)
      .map(u => u.toJSON());
  }

  create({ name, email, phone }){
    const all = this.#store.readAll();
    const u = new User({ name, email, phone });
    all.push(u.toJSON());
    this.#store.writeAll(all);
    this.#notify();
    return u.toJSON();
  }

  remove(id, { soft = true } = {}){
    const all = this.#store.readAll();
    const i = all.findIndex(o => o.id === id);
    if (i < 0) return false;
    if (soft) { const u = User.fromJSON(all[i]); u.deactivate(); all[i] = u.toJSON(); }
    else { all.splice(i, 1); }
    this.#store.writeAll(all);
    this.#notify();
    return true;
  }
}