import flatten from 'lodash/fp/flatten';
import fetchDepartures from '../services/departuresservice';
import { findFrom } from '../utils/utils';

/**
 * Merge two departure arrays, discard doubles preferring fetched
 * @param {Object[]} fetched
 * @param {Object[]} existing
 * @returns {Object[]}
 */
const mergeDepartures = (fetched, existing) => {
    const isFetched = findFrom(fetched, 'id');
    const existingWithoutNew = existing.filter(d => !isFetched(d));
    return [...existingWithoutNew, ...fetched];
}

/**
 * Fetch departures, merge results with existing departures
 * @async
 * @param {Object} location
 * @param {number} location.latitude
 * @param {number} location.longitude
 * @param {string[]} vehicleTypes]
 * @param {Object[]} [existing=[]]
 * @returns {Object[]}
 */
export default async function departureFetchMerge(location, vehicleTypes = [], existing = []) {
    // no need to fetch if vehicle types is empty
    if (!vehicleTypes.length) return existing;

    const findFromVehcileTypes = findFrom(vehicleTypes);
    const promises = [];

    // fetch bus departures with separate call
    if (findFromVehcileTypes('BUS')) {
        promises.push(fetchDepartures(location, { vehicleTypes: ['BUS'] }));
    }

    // fetch tram departures with separate call
    if (findFromVehcileTypes('TRAM')) {
        promises.push(fetchDepartures(location, { vehicleTypes: ['TRAM'] }));
    }

    // fetch departures other types with one call
    if (findFromVehcileTypes(['FERRY', 'RAIL', 'SUBWAY'])) {
        promises.push(fetchDepartures(location, { vehicleTypes: ['FERRY', 'RAIL', 'SUBWAY'] }));
    }

    // wait for promises and flatten results (each fetch returns an array)
    const departures = flatten(await Promise.all(promises));

    if (!departures.length) return existing;

    return mergeDepartures(departures, existing);
};