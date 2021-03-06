import uniqBy from '1-liners/uniqBy';
import flatMap from '1-liners/flatMap';
import { VEHICLE_TYPE } from '../constants/constants';
import * as departuresService from '../services/departuresservice';
import { findFrom } from '../utils/utils';

/** @module DepartureFetchMerge */

/**
* Merge two departure arrays, discard doubles preferring fetched
* @private
* @param {Object[]} fetched
* @param {Object[]} existing
* @returns {Object[]}
*/
const mergeDepartures = (fetched, existing) => {
  const isFetched = findFrom(fetched, 'id');
  const existingWithoutNew = existing.filter(d => !isFetched(d));
  return [...existingWithoutNew, ...fetched];
};

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
  const departures = flatMap(p => p, await Promise.all(promises));

  if (!departures.length) return existing;

  return mergeDepartures(departures, existing);
};

/**
* Merge batch data with existing departures
* @private
* @param {Object[]} existing
* @param {Object[]} batch
*/
const mergeBatchData = (existing, batch) =>
  existing.map((d) => {
    const update = batch.find(b => b.nodeId === d.nodeId && b.id === d.id);
    return { ...d, ...update };
  });

/**
* Select all realtime departures, one for each node
* @private
* @type {Function}
* @param {Object[]} departures
* @returns {Object[]}
*/
const filterUniqueRealtimeDepartures = departures =>
  uniqBy(departures.filter(d => d.realtime), d => d.nodeId);

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
