import { findGPSLocation } from '../../services/locationservice';
import { lookupAddress, searchAddress } from '../../services/addresssearchservice';
import { MAX_ADDRESS_SUGGESTIONS } from '../../constants/constants';
import { PREFERRED_MUNICIPALITIES } from '../../constants/constants';

/** @module AddressSearchModel */

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

const isPreferredMunicipality = result => PREFERRED_MUNICIPALITIES.indexOf(result.localadmin) > -1;
const sortByConfidence = (a, b) => b.confidence - a.confidence;
const filterPreferredMunicipalitiesOnly =
  list => list
    .filter(isPreferredMunicipality)
    .sort(sortByConfidence);

/**
 * Fetch a list of address suggestions from the api
 * @async
 * @param {string} searchTerm
 * @return {object} object representing changes in the component state
 */
export const fetchSuggestions = async (searchTerm) => {
  const result = await searchAddress(searchTerm, MAX_ADDRESS_SUGGESTIONS);
  return { suggestions: filterPreferredMunicipalitiesOnly(result) };
}

/**
 * Select next suggestion.
 * @param {object} state
 * @return {object} suggestion
 */
export const selectNextSuggestion = (state) => {
  const { suggestions = [], selectedSuggestion } = state;
  const currentIndex = suggestions.indexOf(selectedSuggestion);
  const nextIndex = ((currentIndex + 1) >= suggestions.length) ? 0 : currentIndex + 1;
  return suggestions[nextIndex];
}

/**
 * Select previous suggestion.
 * @param {object} state
 * @return {object} suggestion
 */
export const selectPrevSuggestion = (state) => {
  const { suggestions = [], selectedSuggestion } = state;
  const currentIndex = suggestions.indexOf(selectedSuggestion);
  const prevIndex = [-1, 0].indexOf(currentIndex) > -1 ? (suggestions.length - 1) : (currentIndex - 1);
  return suggestions[prevIndex];
}
