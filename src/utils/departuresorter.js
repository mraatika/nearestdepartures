/** @module DepartureSorter */

/**
 * Get sort direction for a prop
 * @private
 * @param {string} propName
 * @param {Object} a
 * @param {Object} b
 * @returns {number}
 */
const getSortByProp = (propName, a, b) => {
  if (a[propName] < b[propName]) return -1;
  if (a[propName] > b[propName]) return 1;
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
