import fputils from '../../utils/fputils';
import { getNowInSeconds } from '../../utils/utils';
import { findGPSLocation, stopLocating } from '../../services/locationservice';
import { lookupAddress, searchAddress } from '../../services/addresssearchservice';
import { fetchDepartures, batchDepartures } from '../../utils/departurefetchmerge';
import { LOCATION_MAGIC_WORD, VEHICLE_TYPE } from '../../constants/constants';

/**
 * All vehicle filters
 * @private
 * @type {string[]}
 */
export const allVehicleTypes = fputils.values(VEHICLE_TYPE);

/**
 * Matcher function for departure filtering
 * @private
 * @param {object} filters
 * @return {function}
 */
const filterMatcher = filters => departure => departure.distance < filters.range
  && departure.realtimeDeparture >= getNowInSeconds()
  && filters.vehicleTypes.indexOf(departure.vehicleType) > -1;

/**
* Function for filtering departures by type
* @param {string[]} filters
* @return {Function}
*/
export const filterDepartures = (filters, departures) => departures.filter(filterMatcher(filters));

/**
* Form an object to represent state after departures has been fetched/batched
* @private
* @param {Object[]} departures
* @param {Object} state
* @return {object} object representing state changes
*/
const formStateWithDepartures = (departures, state) => ({
  ...state,
  loading: false,
  departures: departures,
  filtered: filterDepartures(state.filters, departures),
  departureUpdateTime: new Date(),
})

/**
* Fetch departures by location
* @private
* @param {Object} location
* @param {number} location.latitude
* @param {number} location.longitude
* @return {object} object representing state changes
*/
const findDeparturesByLocation = async (location, state) => {
  const { filters } = state;
  const departures = await fetchDepartures(location, filters.vehicleTypes);
  return { ...formStateWithDepartures(departures, state), location };
}

/**
 * Find location and then departures by location found
 * @async
 * @param {object} state Current app state
 * @return {object} object representing state changes
*/
const findDeparturesByCurrentLocation = async (state) => {
  // find location
  const location = await findGPSLocation();
  const address = await lookupAddress(location);
  // and finally fetch all departures
  return findDeparturesByLocation(location, { ...state, addressSearchTerm: address });
}

/**
 * Find departures by address search string. First search location with that address and
 * then use that location to fetch departures.
 * @async
 * @param {string} searchTerm
 * @param {object} state Current app state
 * @return {object} object representing state changes
*/
const findDeparturesByAddress = async (searchTerm, state) => {
  console.log(searchTerm, state.filters);
  const result = await searchAddress(searchTerm);
  const { location, label } = result[0];
  return findDeparturesByLocation(location, { ...state, addressSearchTerm: label });
}

/**
 * Find departures. Select correct method for search depending on given parameters.
 * @param {object} state Current app state
 * @param {string} searchTerm
 * @param {object} location
 * @return {object} object representing state changes
 */
export const findDepartures = async(state, searchTerm, location) => {
  // stop location search if still running
  stopLocating();

  // search departures by given location
  if (location) {
    console.log('by location');
    return findDeparturesByLocation(location, state);
  }

  // search departures by address search term
  if (searchTerm && searchTerm.toLocaleLowerCase() !== LOCATION_MAGIC_WORD) {
    return findDeparturesByAddress(searchTerm, state);
  }

  // search departures by current location
  return findDeparturesByCurrentLocation(state);
}

/**
 * Batch departures
 * @async
 * @param {object} state Current app state
 * @return {object} object representing state changes
 */
export const batchDeparturesToState = async (state) => {
  const departures = await batchDepartures(state.departures);
  return formStateWithDepartures(departures, state);
}

/**
 * Callback for filter button. Toggles filter state.
 * @param {string} type
 * @param {boolean} multiselect
 * @return {object} object representing state changes
 */
export const updateVehicleFilters = (type, multiselect, state) => {
  const { filters } = state;
  const { vehicleTypes: current } = filters;
  const currentToggled = current.indexOf(type) > -1;

  const activeFilters = fputils.ifThenElse(
    () => !!multiselect,
    // if pressed with ctrl key
    fputils.ifThenElse(
      () => currentToggled,
      // remove filter from actives
      fputils.filter(f => f !== type),
      // add filter to actives
      fputils.concat(type),
    ),
    // if pressed without ctrl key
    fputils.ifThenElse(
      () => current.length > 1 || !currentToggled,
      // if filter is not toggled then select only that
      () => [type],
      // else select all filters
      () => allVehicleTypes.slice(0),
    )
  )(current);

  // update filter props on state and then filter departures
  return { ...filters, vehicleTypes: activeFilters };
}
