import * as oneliners from '1-liners';

/** @module fputils */

/**
 * All functions that should not be auto curried
 * @type {string[]}
 */
const unCurried = ['curry', 'compose', 'composeAll', 'ifThenElse', 'pipe', 'pipeAll'];
const rightCurried = ['assign', 'or'];

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
        const fn = obj[prop];
        if (!fn) throw new Error(`IllegalArgumentException: No such function found ${prop}`);
        if (unCurried.indexOf(prop) > -1) return fn;
        // some fns should be curried right (such as assign)
        if (rightCurried.indexOf(prop) > -1) return oneliners.curryRight(fn);
        const arity = fn.length;
        // do not curry if fn's arity is one or less
        if (arity < 2) return fn;
        const curry = oneliners.reduce(oneliners.compose, [new Array(arity).map(() => curry)]);
        return oneliners.curry(fn);
    }
});