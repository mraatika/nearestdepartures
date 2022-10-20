import type { Filters, Departure } from '@/types';
import { getNowInSeconds } from '@/util';
import { curry } from 'ramda';

const roundToKm = (distance: number) => Math.round((distance / 1000) * 10) / 10;

export function getDistanceinHumanReadableForm(distance: number) {
  return !Number.isFinite(distance)
    ? ''
    : Math.round(distance) >= 1000
    ? `${roundToKm(distance)} km`
    : `${Math.round(distance)} m`;
}

/**
 * Matcher function for departure filtering
 */
const filterMatcher = curry(
  (filters: Filters, departure: Departure) =>
    departure.distance <= filters.range &&
    departure.realtimeDeparture >= getNowInSeconds() &&
    filters.vehicleTypes.includes(departure.vehicleType),
);

export const filterDepartures = (
  filters: Filters,
  departures: Departure[] = [],
) => departures.filter(filterMatcher(filters));
