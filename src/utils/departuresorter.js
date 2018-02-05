/** @module DepartureSorter */
import { prop } from '../utils/utils';

/**
 * Check if given value starts with one or more numbers
 * @param {string} prop
 * @returns {boolean}
 */
const startsWithNumbers = prop => /^\d+/.test(prop);

/**
 * Returns given function's output as number
 * if it starts with one or more numbers otherwise returns
 * the value as it is
 * @private
 * @param {function} fn
 * @param {object} obj
 * @returns {*}
 */
const parseNumber = (fn, obj) => {
  const prop = fn(obj);
  return startsWithNumbers(prop) ? parseInt(prop, 10) : prop;
};

/**
 * Get sort direction for a prop
 * @private
 * @param {string} propName
 * @param {Object} a
 * @param {Object} b
 * @returns {number}
 */
const getSortByProp = (propName, a, b) => {
  const getter = prop(propName);
  const propA = parseNumber(getter, a);
  const propB = parseNumber(getter, b);
  if (propA < propB) return -1;
  if (propA > propB) return 1;
  return 0;
};

/**
 * Sort list in ascending order by a prop and then by departure time
 * @private
 * @param {string} propName
 * @param {Array} list
 * @returns {Array} Sorted list
 */
const sortBy = (propName, list = []) =>
  [...list].sort((a, b) =>
    getSortByProp(propName, a, b)
      || getSortByProp('realtimeDeparture', a, b));

/**
 * Return sorter function for departures
 * @param {Object[]} list List of departures
 * @param {string} propName Property to sort by
 * @param {number} sortDir 1=ascending, -1=descending
 * @returns {Object[]} Sorted departures
 */
export default function sort(list, propName, sortDir) {
  const iteratee = propName === 'time' ? 'realtimeDeparture' : propName;
  const sorted = sortBy(iteratee, list);
  return sortDir === -1 ? sorted.reverse() : sorted;
}
