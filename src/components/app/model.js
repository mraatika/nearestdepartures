import values from '1-liners/values';
import { getNowInSeconds } from '../../utils/utils';
import { stopLocating } from '../../services/locationservice';
import { fetchDepartures, batchDepartures } from '../../utils/departurefetchmerge';
import { VEHICLE_TYPE } from '../../constants/constants';
import { fetchDisruptions } from '../../services/disruptionsservice';

/** @module AppModel */

/**
 * All vehicle filters
 * @private
 * @type {string[]}
 */
export const allVehicleTypes = values(VEHICLE_TYPE);

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
});

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
};

/**
 * Find departures by given location
 * @param {object} state Current app state
 * @param {object} location
 * @return {object} object representing state changes
 */
export const findDepartures = async(state, location) => {
  // stop location search if still running
  stopLocating();
  // search departures by given location
  return findDeparturesByLocation(location, state);
};

/**
 * Batch departures
 * @async
 * @param {object} state Current app state
 * @return {object} object representing state changes
 */
export const batchDeparturesToState = async (state) => {
  const departures = await batchDepartures(state.departures);
  return formStateWithDepartures(departures, state);
};

/**
 * Fetch disruptions from the api and add them to state
 * @param {object} state
 * @return {object} object representing state changes
 */
export const fetchDisruptionsToState = async (state) => {
  try {
    const disruptions = await fetchDisruptions();
    return { disruptions };
  } catch(e) {
    // if disruption fetching fails then nothing special should happen
    process.env.NODE_ENV === 'production' && console.error(e);
    return {};
  }
};

/**
 * Form updated filters
 * @private
 * @param {string} type
 * @param {string[]} current
 * @param {boolean} multiselect
 * @return {string[]}
 */
const getActiveFilters = (type, current, multiselect) => {
  const currentToggled = current.indexOf(type) > -1;

  // if pressed with ctrl key
  if (multiselect) {
    return currentToggled
      // remove filter from actives
      ? current.filter(f => f !== type)
      // add filter to actives
      : current.concat(type);
  }
  // if pressed without ctrl key
  return current.length > 1 || !currentToggled
    // if filter is not toggled then select only that
    ? [type]
    // else select all filters
    : allVehicleTypes.slice(0);
};

/**
 * Callback for filter button. Toggles filter state.
 * @param {string} type
 * @param {boolean} multiselect
 * @param {object} state
 * @return {object} object representing state changes
 */
export const updateVehicleFilters = (type, multiselect, state) => {
  const { filters } = state;
  const { vehicleTypes: current = [] } = filters;
  const activeFilters = getActiveFilters(type, current, multiselect);

  // update filter props on state and then filter departures
  return { ...filters, vehicleTypes: activeFilters };
};
