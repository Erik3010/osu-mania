class Storage {
  constructor({ strategy = "local", key }) {
    this.key = key;
    this.strategy = strategy;

    this.storage =
      this.strategy === "local" ? window.localStorage : window.sessionStorage;
  }
  set(value) {
    try {
      this.storage.setItem(this.key, value);
    } catch {}
  }
  get() {
    try {
      return this.storage.getItem(this.key);
    } catch {}
  }
  remove() {
    try {
      this.storage.removeItem(this.key);
    } catch {}
  }
}

export default Storage;
