import fputils from './fputils';
import { sortBy } from './utils'

/**
 * Return sorter function for departures
 * @param {string} propName Property to sort by
 * @returns {Object[]} Sorted departures
 */
export default function sort(list, propName, sortDir) {
    const iteratee = propName === 'time' ? fputils.property('realtimeDeparture') : fputils.property(propName);
    const sorted = sortBy(iteratee)(list);
    return sortDir === -1 ? sorted.reverse() : sorted;
}