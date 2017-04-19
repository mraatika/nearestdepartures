import * as oneliners from '1-liners';

/** @module fputils */

/**
 * All functions that should not be auto curried
 * @type {string[]}
 */
const unCurried = ['curry', 'compose', 'composeAll', 'values'];

/**
 * Proxy for 1-liners utility functions. Auto curries all functions except ones
 * defined in unCurried list.
 * @type {Proxy}
 */
export default new Proxy(oneliners, {
    /**
     * Getter for utility functions
     * @param {Object} obj
     * @param {string} prop Fn name
     * @returns {Function} Curried function
     */
    get(obj, prop) {
        if (!obj[prop]) throw new Error(`IllegalArgumentException: No such function found ${prop}`);
        if (unCurried.indexOf(prop) > -1) return obj[prop];
        return oneliners.curry(obj[prop]);
    }
});