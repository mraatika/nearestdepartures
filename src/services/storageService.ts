import type { Address, Filters } from '@/types';
import { propOr } from 'ramda';

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

/**
 * Get a filter value from the store (range/vehicleType/etc.)
 */
export const getFilter = (key: keyof Filters) =>
  propOr(null, key, getFilters());

export const saveFilter = (key: keyof Filters, value: unknown): Filters => {
  const filters = { ...getFilters(), [key]: value };
  return set('filters', filters);
};
