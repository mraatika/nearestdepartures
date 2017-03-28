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