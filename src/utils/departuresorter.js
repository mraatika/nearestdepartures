import sortBy from 'lodash/fp/sortBy';
import prop from 'lodash/fp/prop';
import { getDepartureTime } from '../utils/utils';

/**
 * Return sorter function for departures
 * @param {string} propName Property to sort by
 * @returns {Object[]} Sorted departures
 */
export default function sort(list, propName, sortDir) {
    const iteratee = propName === 'time' ? getDepartureTime : prop(propName);
    const sorted = sortBy(iteratee)(list);
    return sortDir === -1 ? sorted.reverse() : sorted;
}