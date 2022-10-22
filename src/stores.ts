import { derived, writable } from 'svelte/store';
import { getFavourites, getFilter } from '@/services/storageService';
import type { Address, Departure } from '@/types';
import { DEFAULT_RANGE } from './constants';
import { VEHICLE_TYPE } from './enums';

type ScanStoreValue<T> = [previous: T | undefined, current: T];
type ScanUpdater<T> = (prevValue: T) => T;

function scanTwoStore<T>(initial: T) {
  const { subscribe, update } = writable<ScanStoreValue<T>>([
    undefined,
    initial,
  ]);
  return {
    subscribe,
    set: (newValue: T) => update(([, prevValue]) => [prevValue, newValue]),
    update: (updater: ScanUpdater<T>) =>
      update(([, prevValue]) => [prevValue, updater(prevValue)]),
  };
}

export const locationStore = writable<GeolocationCoordinates>();
export const addressStore = writable<Address | undefined>();
export const favouritesStore = writable<Address[]>(getFavourites() ?? []);
export const rangeStore = scanTwoStore(
  <number>getFilter('range') ?? DEFAULT_RANGE,
);
export const vechicleFilterStore = writable(
  <VEHICLE_TYPE[]>getFilter('vehicleTypes') ?? Object.values(VEHICLE_TYPE),
);
export const filtersStore = derived(
  [rangeStore, vechicleFilterStore],
  ([range, vehicleTypes]) => ({ range: range[1], vehicleTypes }),
);
export const departuresStore = writable<Departure[]>();
export const lastUpdatedStore = derived(departuresStore, (v) =>
  v === undefined ? v : new Date(),
);
