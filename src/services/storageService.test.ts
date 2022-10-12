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
    it('should return filters object', () => {
      expect(storage.saveFilter('range', 1)).toEqual({ range: 1 });
    });

    it('should add given value to filters object', () => {
      getItemMock.mockReturnValueOnce(JSON.stringify({ range: 1 }));
      expect(storage.saveFilter('vehicleTypes', [VEHICLE_TYPE.BUS])).toEqual({
        range: 1,
        vehicleTypes: [VEHICLE_TYPE.BUS],
      });
    });
  });

  describe('Getting filters', () => {
    const filters = { range: 1 };

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
