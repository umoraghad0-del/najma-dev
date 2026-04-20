global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  clear() {
    this.store = {};
  }
};

const { getFromStorage } = require('./storage');

// Ett enkelt test
function testGetFromStorage() {
  localStorage.clear();

  const result = getFromStorage("tasks");
if (Array.isArray(result) && result.length === 0) {
  console.log("✅ Test godkänt: getFromStorage returnerar en tom array när inget finns sparat.");
} else {
  console.error("❌ Test misslyckades. Förväntade [], men fick:", result);
}
}

testGetFromStorage();