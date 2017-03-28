/**
 * Returns realtime departure time if available. Otherwise returns scheduled time.
 * @param {Object} d Departure object
 * @returns {Number}
 */
export const getDepartureTime = d => (d.realtime ? d.realtimeDeparture : d.scheduledDeparture);

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