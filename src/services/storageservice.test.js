import * as storage from './storageservice';

describe('StorageService', () => {
  afterEach(() => localStorage.clear());

  describe('Storing filters', () => {
    it('should return filters object', () => {
      expect(storage.saveFilter('a', 1)).toEqual({a: 1});
    });

    it('should add given value to filters object', () => {
      storage.saveFilter('a', 1);
      expect(storage.saveFilter('b', 2)).toEqual({ a: 1, b: 2 });
    });

    it('should not set value and return undefined if key is falsy', () => {
      expect(storage.saveFilter(undefined, 'abc')).toEqual(undefined);
      expect(storage.saveFilter(null, 'abc')).toEqual(undefined);
      expect(storage.saveFilter(NaN, 'abc')).toEqual(undefined);
      expect(storage.saveFilter(0, 'abc')).toEqual(undefined);
      expect(storage.saveFilter('', 'abc')).toEqual(undefined);
      expect(localStorage.getItem('filters')).toEqual(null);
    });
  });

  describe('Getting filters', () => {
    const filters = { a: 1, b: 2 };

    beforeEach(() => localStorage.setItem('filters', JSON.stringify(filters)));

    it('should find filter value from storage', () => {
      expect(storage.getFilter('a')).toEqual(filters.a);
    });

    it('should return null if filter is not found', () => {
      expect(storage.getFilter('c')).toEqual(null);
    });

    it('should return null if filters object is not stored', () => {
      localStorage.clear();
      expect(storage.getFilter('a')).toEqual(null);
    });

    it('should return null if called without key parameter', () => {
      expect(storage.getFilter()).toEqual(null);
    });
  });
});
