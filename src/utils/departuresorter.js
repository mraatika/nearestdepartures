import fputils from './fputils';
import { sortBy } from './utils'

/** @module DepartureSorter */

/**
 * Return sorter function for departures
 * @private
 * @param {Object[]} list List of departures
 * @param {string} propName Property to sort by
 * @param {number} sortDir 1=ascending, -1=descending
 * @returns {Object[]} Sorted departures
 */
export default function sort(list, propName, sortDir) {
    const iteratee = propName === 'time' ? fputils.property('realtimeDeparture') : fputils.property(propName);
    const sorted = sortBy(iteratee)(list);
    return sortDir === -1 ? sorted.reverse() : sorted;
}