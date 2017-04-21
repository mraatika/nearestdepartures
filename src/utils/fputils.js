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
 * @type {Object}
 */
export default Object.keys(oneliners).reduce((obj, key) => {
    const orig = oneliners[key];
    const arity = orig.length;
    let fn;

    if (unCurried.indexOf(key) > -1 || arity < 2) {
        fn = orig;
    // some fn should be curried right (such as assign)
    } else if (rightCurried.indexOf(key) > -1) {
        fn = oneliners.curryRight(orig);
    } else {
        // do not curry if fn's arity is one or less
        const curry = oneliners.reduce(oneliners.compose, [new Array(arity).map(() => curry)]);
        fn = oneliners.curry(orig);
    }
    obj[key] = fn;
    return obj;
}, {});
