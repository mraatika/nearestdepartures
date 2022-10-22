import type { Address, Filters } from '@/types';
import * as R from 'ramda';

const get = <T>(key: string) => {
  const result = localStorage.getItem(key);
  return result ? <T>JSON.parse(result) : null;
};

const set = <V>(key: string, value: V): V => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

export const getFavourites = () => get<Address[]>('favourites');
export const saveFavourites = (favourites: Address[]) =>
  set('favourites', favourites);

export const getFilters = () => get<Filters>('filters') ?? ({} as Filters);
export const saveFilters = (filters: Filters) => set('filters', filters);
/**
 * Get a filter value from the store (range/vehicleType/etc.)
 */
export const getFilter = (key: keyof Filters): Filters[keyof Filters] =>
  R.propOr(null, key, getFilters());
