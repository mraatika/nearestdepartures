import { propOr } from '../utils/utils';

/**
  * Get a value from the store
  * @param  {String} key
  * @return {*}
  */
export const get = key => (key ? JSON.parse(localStorage.getItem(key)) : null);
/**
  * Set value to the store
  * @param  {String} key
  * @param  {*} value
  */
export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
};

/**
 * Get filters object from the store
 * @private
 * @return {object}
 */
const getFilters = () => get('filters') || {};

/**
 * Get a filter value from the store
 * @param {string} key
 * @return {*}
 */
export const getFilter = key => propOr(key, null, getFilters());

/**
 * Store a filter value
 * @param {string} key
 * @param {*} value
 * @return {*} The value parameter is returned
 */
export const saveFilter = (key, value) => {
  if (!key) { return undefined; }
  const filters = { ...getFilters(), [key]: value };
  return set('filters', filters);
};
