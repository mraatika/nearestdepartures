import * as oneliners from '1-liners';

/** @module fputils */

/**
 * All functions that should not be auto curried
 * @type {string[]}
 */
const unCurried = ['curry', 'compose', 'composeAll', 'ifThenElse', 'pipe', 'pipeAll'];
const rightCurried = ['assign', 'or'];

/**
 * Compose a curry function to curry multiple times (e.g sum(1)(2)(3))
 * @param {number} arity
 */
const curryMany = (arity) => oneliners.reduce(oneliners.compose, [...new Array(arity - 1)].map(() => oneliners.curry));

/**
 * Proxy for 1-liners utility functions. Auto curries all functions except ones
 * defined in unCurried list.
 * @type {Object}
 */
export default Object.keys(oneliners).reduce((obj, key) => {
    const orig = oneliners[key];
    const arity = orig.length;
    let fn;

    // do not curry if
    // a) property is not a function
    // b) property is listed in list of fns that should not be curried
    // c) fn's arity is one or less
    if (typeof orig !== 'function' || unCurried.indexOf(key) > -1 || arity < 2) {
        fn = orig;
    // some fn should be curried right (such as assign)
    } else if (rightCurried.indexOf(key) > -1) {
        fn = oneliners.curryRight(orig);
    } else {
        fn = curryMany(arity)(orig);
    }
    obj[key] = fn;
    return obj;
}, {});
