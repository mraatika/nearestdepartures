import { areLocationsEqual } from '../../utils/utils';

/**
 * Check if an adress is in the list of favoured addresses
 * @param {object} address
 * @param {object[]} favourites
 * @return {boolean}
 */
export const isLocationFavoured = (address, favourites) =>
  !!(address && favourites.find(it => areLocationsEqual(it, address)));
