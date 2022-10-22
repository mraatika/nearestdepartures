import { VEHICLE_TYPE } from '@/enums';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import * as storage from './storageService';

let getItemMock: Mock = vi.fn();
let setItemMock: Mock = vi.fn();

describe('StorageService', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: getItemMock,
      setItem: setItemMock,
    });
  });

  describe('Storing filters', () => {
    it('should save filters', () => {
      storage.saveFilters({ range: 1, vehicleTypes: [] });
      expect(setItemMock).toHaveBeenCalledWith(
        'filters',
        JSON.stringify({ range: 1, vehicleTypes: [] }),
      );
    });

    it('should return filters', () => {
      expect(storage.saveFilters({ range: 1, vehicleTypes: [] })).toEqual({
        range: 1,
        vehicleTypes: [],
      });
    });
  });

  describe('Getting filters', () => {
    const filters = { range: 1 };

    it('should get value from storage', () => {
      storage.getFilter('range');
      expect(getItemMock).toHaveBeenCalledWith('filters');
    });

    it('should find filter value from storage', () => {
      getItemMock.mockReturnValueOnce(JSON.stringify(filters));
      expect(storage.getFilter('range')).toEqual(1);
    });

    it('should return null if filter is not found', () => {
      getItemMock.mockReturnValueOnce(JSON.stringify(filters));
      expect(storage.getFilter('vehicleTypes')).toEqual(null);
    });
  });
});
