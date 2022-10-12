import { derived, writable } from 'svelte/store';
import type { Address, Departure, Filters } from '@/types';
import { getFavourites, getFilters } from '@/services/storageService';
import { defaultFilters } from './util';

export const locationStore = writable<GeolocationCoordinates>();
export const addressStore = writable<Address | undefined>();
export const favouritesStore = writable<Address[]>(getFavourites() ?? []);
export const filtersStore = writable<Filters>({
  ...defaultFilters(),
  ...getFilters(),
});
export const departuresStore = writable<Departure[]>([]);
export const lastUpdatedStore = derived(departuresStore, () => new Date());
