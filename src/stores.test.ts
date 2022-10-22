import { get } from 'svelte/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_RANGE } from './constants';
import { VEHICLE_TYPE } from './enums';

describe('stores', () => {
  let stores: typeof import('./stores');

  beforeEach(() => {
    return import('./stores').then((module) => {
      stores = module;
      vi.resetModules();
    });
  });

  describe('rangeStore', () => {
    it('should start with prev value of undefined', () => {
      expect(get(stores.rangeStore)[0]).toEqual(undefined);
    });

    it('should start with current value of DEFAULT_RANGE', () => {
      expect(get(stores.rangeStore)[1]).toEqual(DEFAULT_RANGE);
    });

    it('should keep the previous value', () => {
      stores.rangeStore.set(100);
      expect(get(stores.rangeStore)[0]).toEqual(DEFAULT_RANGE);
    });

    it('should set the next value', () => {
      stores.rangeStore.set(100);
      expect(get(stores.rangeStore)[1]).toEqual(100);
    });

    it('should keep the two latest values', () => {
      stores.rangeStore.set(100);
      stores.rangeStore.set(200);
      expect(get(stores.rangeStore)[0]).toEqual(100);
      expect(get(stores.rangeStore)[1]).toEqual(200);

      stores.rangeStore.set(300);
      expect(get(stores.rangeStore)[0]).toEqual(200);
      expect(get(stores.rangeStore)[1]).toEqual(300);
    });
  });

  describe('filtersStore', () => {
    it('should have a default range', () => {
      expect(get(stores.filtersStore).range).toEqual(DEFAULT_RANGE);
    });

    it('should contain all vehicleTypes by default', () => {
      expect(get(stores.filtersStore).vehicleTypes).toEqual(
        Object.values(VEHICLE_TYPE),
      );
    });

    it('should change values when range changes', () => {
      stores.rangeStore.set(100);
      expect(get(stores.filtersStore).range).toEqual(100);
    });

    it('should change when mode filter changes', () => {
      stores.vechicleFilterStore.set([VEHICLE_TYPE.BUS]);
      expect(get(stores.filtersStore).vehicleTypes).toEqual([VEHICLE_TYPE.BUS]);
    });
  });
});
