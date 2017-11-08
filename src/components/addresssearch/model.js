import { findGPSLocation } from '../../services/locationservice';
import { lookupAddress, searchAddress } from '../../services/addresssearchservice';

/**
 * Find current location and lookup address based on that
 * @async
 * @return {object} address object with location
*/
export const findAddressByCurrentLocation = async () => {
  // find location
  const location = await findGPSLocation();
  const address = await lookupAddress(location);
  // and finally fetch all departures
  return { ...address, location };
}

/**
 * Search address by a search term
 * @async
 * @param {string} searchTerm
 * @return {object} address object
*/
export const findAddressBySearchTerm = async (searchTerm) => {
  const result = await searchAddress(searchTerm);
  return result[0];
}
