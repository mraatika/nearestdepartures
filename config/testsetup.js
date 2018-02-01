global.fetch = require('jest-fetch-mock');

// mock localStorage for tests
const localStorageMock = (() => {
  let store = {};

  return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      }
  };
})();

global.localStorage = localStorageMock;
