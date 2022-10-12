import { PREFERRED_MUNICIPALITIES } from '@/constants';
import { searchAddress } from '@/services/addressService';
import type { Address } from '@/types';

const isPreferredMunicipality = (result: Address) =>
  PREFERRED_MUNICIPALITIES.indexOf(result.localadmin) > -1;

/**
 * Fetch a list of address suggestions from the api
 */
export async function fetchSuggestions(
  searchTerm: string,
  coordinates?: GeolocationCoordinates,
) {
  try {
    const result = await searchAddress(searchTerm, coordinates);
    return result.filter(isPreferredMunicipality);
  } catch (e) {
    return [];
  }
}

/**
 * Select next suggestion.
 */
export const selectNextSuggestion = (
  suggestions: Address[],
  selectedSuggestion?: Address,
) => {
  const currentIndex = selectedSuggestion
    ? suggestions.indexOf(selectedSuggestion)
    : -1;
  const nextIndex =
    currentIndex + 1 >= suggestions.length ? 0 : currentIndex + 1;
  return suggestions[nextIndex];
};

/**
 * Select previous suggestion.
 */
export const selectPrevSuggestion = (
  suggestions: Address[],
  selectedSuggestion?: Address,
) => {
  const currentIndex = selectedSuggestion
    ? suggestions.indexOf(selectedSuggestion)
    : -1;
  const prevIndex =
    [-1, 0].indexOf(currentIndex) > -1
      ? suggestions.length - 1
      : currentIndex - 1;
  return suggestions[prevIndex];
};
