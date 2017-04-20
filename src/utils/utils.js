/**
 * Find polyfill
 * @param {Function} fn Iteratee
 * @return {Function}
 */
const findPolyfill = fn =>
/**
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
    }
}

/**
 * Format date to time string
 * @param {Date} time
 * @returns {String}
 */
export const toTimeString = (time = new Date()) => `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

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
(list = []) => {
    const findFromUniques = (val, uniques) => find(u => fn(u) === val)(uniques);

    return list.reduce((uniques, val) => {
        if (!findFromUniques(fn(val), uniques)) uniques.push(val);
        return uniques;
    }, []);
};

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
}