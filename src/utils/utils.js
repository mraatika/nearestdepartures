/** @module Utils */

/**
* Find polyfill
* @param {Function} fn Iteratee
* @return {Function}
*/
const findPolyfill = fn =>
  /**
  * @private
  * @param {Array} list
  * @returns {*|undefined}
  */
  (list) => {
    for (let i = 0; i < list.length; i++) {
      if (fn(list[i])) return list[i];
    }

    return undefined;
  };

/**
* Curried native Array.prototype.find
* @private
* @param {Function} fn Iteratee
* @returns {Function}
*/
const nativeFind = (fn) =>
  /**
  * @param {Array} list
  * @returns {*|undefined}
  */
  (list) => list.find(fn);

/**
* Find element from array running values through an iteratee function
*/
export const find = typeof Array.prototype.find === 'function' ? nativeFind : findPolyfill;

/**
* Get current time in seconds
* @returns {number}
*/
export const getNowInSeconds = () => Math.floor(new Date().getTime() / 1000);

/**
* Find a value or some of values from list
* @param {Array} list
* @param {string} [prop] If defined will compare subject[prop] with entry[prop]
* @returns {Function}
*/
export const findFrom = (list = [], prop) => {
  // get entity[prop] if prop defined else return entity
  const getProp = prop ? e => e[prop] : e => e;
  // array comparator
  const compareArray = subject => e => subject.indexOf(getProp(e)) > -1;
  // single comparator
  const compareProp = subject => e => getProp(e) === subject;
  /**
  * @param {*} subject
  * @returns {*}
  */
  return subject => {
    const subjectValue = getProp(subject);
    const comparator = Array.isArray(subject) ? compareArray : compareProp;
    return find(comparator(subjectValue))(list);
  };
};

/**
* Pad number with leading zero if necessary
* @private
* @param {number} num
*/
export const padNumber = num => (('' + num).length < 2 ? '0' + num : num);

/**
* Format date to time string
* @param {Date} time
* @returns {String}
*/
export const toTimeString = (time = new Date()) => `${padNumber(time.getHours())}:${padNumber(time.getMinutes())}:${padNumber(time.getSeconds())}`;

/**
 * @private
 * @param {*} val
 * @param {*[]} uniques
 * @param {function} fn
 * @returns {*}
 */
const findFromUniques = (val, uniques, fn) => find(u => fn(u) === fn(val))(uniques);

/**
* Select unique values from an array
* @param {Function} [fn]
* @returns {Function}
*/
export const uniq = (fn = val => val) =>
/**
* @param {Array} list
* @returns {Array} Unique values
*/
  (list = []) => list.reduce((uniques, val) =>
    findFromUniques(val, uniques, fn) ? uniques : [...uniques, val], []);

/**
* Sort list in ascending order by results of running each value thru iteratee fn
* @param {Function} iteratee
* @returns {Function}
*/
export const sortBy = (iteratee = val => val) =>
  /**
  * @param {Array} list
  * @returns {Array} Sorted list
  */
  (list = []) => {
    const copy = [...list];
    return copy.sort((a, b) => {
      if (iteratee(a) < iteratee(b)) return -1;
      if (iteratee(a) > iteratee(b)) return 1;
      return 0;
    });
  };

/**
* Creates a handler for keypress event
* @param {Function} callback
* @param {...*} params
* @return {Function}
*/
export const keyPressHandler = (callback, ...params) =>
  /**
   * Call the callback function with given parameters
   * when the key pressed was space of enter
   * @param {Event} e
   */
  (e) => {
    if ([13, 32].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      callback(...params);
    }
  };

export const stopPropagation = e => e.stopPropagation();

/**
 * Delay execution of a function by given time (in milliseconds)
 * @param {function} fn
 * @param {number} [delay=0]
 */
export const delay = (fn, delay = 0) => setTimeout(fn, delay);

/**
 * Get a property of an object
 * @param {string} propName
 * @return {function}
 */
export const prop = propName =>
  /**
   * @param {object}
   * @return {*} object[propName]
   */
  (obj = {}) => obj[propName];

/**
 * Returns the second argument if object's property {prop} is null or undefined
 * otherwise the {prop} is returned
 * @param {string} prop Property's name
 * @param {*} otherwise Default return value
 * @param {object} obj The object to get the prop from
 * @return {*} The value of given property of the supplied object or the default value
 */
export const propOr = (prop, otherwise, obj = {}) => obj[prop] == null ? otherwise : obj[prop];

/**
 * @class NetworkError
 * @extends Error
 */
export function NetworkError(message) {
  this.name = 'NetworkError';
  this.message = message;
}

NetworkError.prototype = new Error();

/**
 * Request focus on given element
 * @param {DOMNode} domNode
 */
export const requestFocus = domNode => domNode.focus();
