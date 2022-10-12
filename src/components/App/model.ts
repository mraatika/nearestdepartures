import { filter, pipe, prop, uniqBy } from 'ramda';
import { LOCATION_MAGIC_WORD } from '@/constants';
import {
  findAddressByCurrentLocation,
  getAddressBySearchTerm,
} from '@/services/addressService';
import * as departuresService from '@/services/departureService';
import { fetchDepartures } from '@/services/departureService';
import { stopLocating } from '@/services/locationService';
import { addressStore, departuresStore, locationStore } from '@/stores';
import type { Address, Departure, Filters } from '@/types';
import logger from '@/util/logger';

const filterUniqueRealtimeDepartures: (list: Departure[]) => Departure[] = pipe(
  filter<Departure>(prop('realtime')),
  uniqBy<Departure, string>(prop('nodeId')),
);

/**
 * Merge batch data with existing departures
 */
const mergeBatchData = (existing: Departure[], batch: Partial<Departure>[]) =>
  existing.map((d) => {
    const update = batch.find((b) => b.nodeId === d.nodeId && b.id === d.id);
    return { ...d, ...update };
  });

/**
 * Update given realtime departures by fetching a batch from api
 */
export async function batchDepartures(departures: Departure[] = []) {
  const realtimeDepartures = filterUniqueRealtimeDepartures(departures);

  try {
    if (realtimeDepartures.length) {
      const data = await departuresService.fetchDepartureBatch(
        realtimeDepartures,
      );

      const update = mergeBatchData(departures, data);
      departuresStore.set(update);
      return update;
    } else {
      logger.debug('Nothing to batch');
    }
  } catch (e) {
    logger.error(e);
  }
}

export async function findAddressBySearchTerm(searchTerm: string) {
  const searchByLocation =
    !searchTerm.length || searchTerm.toLowerCase() === LOCATION_MAGIC_WORD;

  const address = await (searchByLocation
    ? findAddressByCurrentLocation()
    : getAddressBySearchTerm(searchTerm));

  addressStore.set(address);
}

export async function getAddressByLocation() {
  stopLocating();
  const address = await findAddressByCurrentLocation();
  locationStore.set(address.location);
  addressStore.set(address);
}

export async function fetchDeparturesByAddress(
  address: Address,
  filters: Filters,
) {
  stopLocating();
  const departures = await fetchDepartures(address.location, filters);
  departuresStore.set(departures);
}
