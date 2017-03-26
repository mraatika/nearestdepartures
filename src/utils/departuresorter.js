import sortBy from 'lodash/fp/sortBy';
import prop from 'lodash/fp/prop';
import { getDepartureTime } from '../utils/utils';

/**
 * Return sorter function for departures
 * @param {string} propName Property to sort by
 * @returns {Object[]} Sorted departures
 */
export default function sort(propName) {
    const iteratee = propName === 'time' ? getDepartureTime : prop(propName);
    return sortBy(iteratee);
}