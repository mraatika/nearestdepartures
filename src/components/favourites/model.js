import { find } from '../../utils/utils';

/**
 * Check if two addresses have equal labels
 * @param {object} a
 * @param {object} b
 * @return {boolean}
 */
export const areLocationsEqual = (a = {}, b = {}) => a.label === b.label;

/**
 * Check if an adress is in the list of favoured addresses
 * @param {object} address
 * @param {object[]} favourites
 * @return {boolean}
 */
export const isLocationFavoured = (address, favourites) =>
  !!(address && find(it => areLocationsEqual(it, address))(favourites));
