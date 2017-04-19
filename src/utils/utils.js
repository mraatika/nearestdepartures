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
    }
}

/**
 * Format date to time string
 * @param {Date} time
 * @returns {String}
 */
export const toTimeString = (time = new Date()) => `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

/**
 * Get object values as an array
 * @param {Object} subject
 * @returns {Array}
 */
export const values = subject => Object.keys(subject).map((key) => subject[key]);

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
    const findFromUniques = (val, uniques) => uniques.find(u => fn(u) === val);

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