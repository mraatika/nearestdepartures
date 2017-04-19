import fputils from './fputils';
import { uniq } from './utils';
import { VEHICLE_TYPE } from '../constants/constants';
import * as departuresService from '../services/departuresservice';
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
export async function fetchDepartures(location, vehicleTypes = [], existing = []) {
    // no need to fetch if vehicle types is empty
    if (!vehicleTypes.length) return existing;

    const findFromVehcileTypes = findFrom(vehicleTypes);
    const promises = [];

    // fetch bus departures with separate call
    if (findFromVehcileTypes(VEHICLE_TYPE.BUS)) {
        promises.push(departuresService.fetchDepartures(location, { vehicleTypes: [VEHICLE_TYPE.BUS] }));
    }

    // fetch tram departures with separate call
    if (findFromVehcileTypes(VEHICLE_TYPE.TRAM)) {
        promises.push(departuresService.fetchDepartures(location, { vehicleTypes: [VEHICLE_TYPE.TRAM] }));
    }

    // fetch departures other types with one call
    if (findFromVehcileTypes([VEHICLE_TYPE.FERRY, VEHICLE_TYPE.RAIL, VEHICLE_TYPE.SUBWAY])) {
        promises.push(departuresService.fetchDepartures(location, {
            vehicleTypes: [VEHICLE_TYPE.FERRY, VEHICLE_TYPE.RAIL, VEHICLE_TYPE.SUBWAY],
        }));
    }

    // wait for promises and flatten results (each fetch returns an array)
    const departures = fputils.flatMap(p => p)(await Promise.all(promises));

    if (!departures.length) return existing;

    return mergeDepartures(departures, existing);
};

/**
 * Merge batch data with existing departures
 * @param {Object[]} existing
 * @param {Object[]} batch
 */
const mergeBatchData = (existing, batch) => {
    return existing.map((d) => {
        const update = batch.find(b => b.nodeId === d.nodeId && b.id === d.id);
        return Object.assign({}, d, update);
    });
};

/**
 * Select all realtime departures, one for each node
 * @type {Function}
 * @param {Object[]} departures
 * @returns {Object[]}
 */
const filterUniqueRealtimeDepartures = fputils.compose(
    uniq(d => d.nodeId),
    fputils.filter(d => d.realtime)
);

/**
 * Update given realtime departures by fetching a batch from api
 * @param {Object[]} [departures=[]]
 * @returns {Object[]}
 */
export async function batchDepartures(departures = []) {
    const realtimeDepartures = filterUniqueRealtimeDepartures(departures);

    if (!realtimeDepartures.length) return departures;

    const data = await departuresService.batchDepartures(realtimeDepartures);

    return mergeBatchData(departures, data);
}