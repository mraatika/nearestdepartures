/**
 * Returns realtime departure time if available. Otherwise returns scheduled time.
 * @param {Object} d Departure object
 * @returns {Number}
 */
export const getDepartureTime = d => (d.realtime ? d.realtimeDeparture : d.scheduledDeparture);