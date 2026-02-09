/**
 * billsStore
 *
 * Simple module that manages bills in-memory and persists them to
 * localStorage under the key `billsCalculator.bills`.
 *
 * API (on window.billsStore):
 * - getAll() -> Array
 * - add(bill) -> bill
 * - clear() -> void
 * - load() -> Array
 */

(function () {
  const STORAGE_KEY = 'billsCalculator.bills';

  const store = {
    bills: [],

    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        this.bills = raw ? JSON.parse(raw) : [];
      } catch (err) {
        console.error('billsStore: failed to load from localStorage', err);
        this.bills = [];
      }
      return this.getAll();
    },

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bills));
      } catch (err) {
        console.error('billsStore: failed to save to localStorage', err);
      }
    },

    getAll() {
      // return a copy to avoid accidental external mutation
      return this.bills.slice();
    },

    add(bill) {
      // Basic validation: ensure required fields exist
      if (!bill || typeof bill !== 'object') throw new TypeError('bill must be an object');
      this.bills.push({ ...bill });
      this.save();

      return bill;
    },

    clear() {
      this.bills = [];
      this.save();
    }
  };

  // Expose on window for simple consumption from non-module scripts
  window.billsStore = store;

  // initialize
  store.load();
})();
