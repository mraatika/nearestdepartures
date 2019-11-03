/** @module Utils */

export const noop = () => {};

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
    return list.find(comparator(subjectValue));
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
* Create a handler for enter and space keypresses
* @param {Function} callback
* @param {...*} params
* @return {Function}
*/
export const okKeyPressHandler = (callback, ...params) =>
  keyPressHandler([13, 32], callback, ...params);

/**
 * Create a handler function that will call given calback
 * only when event's keyCode is one of the given codes
 * @param {number[]} keyCodes List of keys to handle
 * @param {Function} callback Callback called when keyCode matches
 * @param {...*} params 0 to n params passed to the callback
 * @return {Function}
 */
export const keyPressHandler = (keyCodes, callback, ...params) =>
  /**
   * Call the callback function with given parameters
   * when the key pressed was space of enter
   * @param {Event} e
   */
  (e) => {
    if (keyCodes.indexOf(e.keyCode) > -1) {
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
 * @return {*}
 */
export const propOr = (prop, otherwise, obj = {}) => obj[prop] == null ? otherwise : obj[prop];

/**
 * Get props of given objects and compare them
 * @param {string} propName
 * @param {object} o1
 * @param {object} o2
 * @return {Boolean}
 */
export const propEqual = propName => (o1, o2) =>
  prop(propName)(o1) === prop(propName)(o2);

/**
 * Request focus on given element
 * @param {DOMNode} domNode
 */
export const requestFocus = domNode => domNode.focus();

/**
 * @private
 * @param {DOMNode} focusOn
 * @param {Boolean} shiftKey
 */
const handleTab = (focusOn, shiftKey) =>
  e => {
    if (e.keyCode === 9 && e.shiftKey === shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      focusOn.focus();
    }
  };

/**
 * Init a focus trap to keep focus in a loop
 * @param {DOMNode} firstElement
 * @param {DOMNode} lastElement
 * @param {Boolean} focusFirstElement
 * @return {Function} Returns a function for clearing the callbacks
 */
export const initFocusTrap = (firstElement, lastElement, focusFirstElement) => {
  if (!firstElement) return noop;

  const lastOrFirstElement = lastElement || firstElement;
  const startHandler = handleTab(lastOrFirstElement, true);
  const endHandler = handleTab(firstElement, false);
  const currentActiveElement = document.activeElement;

  firstElement.addEventListener('keydown', startHandler);
  lastOrFirstElement.addEventListener('keydown', endHandler);

  focusFirstElement && setTimeout(() => requestFocus(firstElement), 100);

  return () => {
    firstElement.removeEventListener('keydown', startHandler);
    lastOrFirstElement.removeEventListener('keydown', endHandler);
    currentActiveElement.focus();
  };
};

/**
 * Check if two addresses have equal ids
 * @param {object} a
 * @param {object} b
 * @return {boolean}
 */
export const areLocationsEqual = propEqual('label');
