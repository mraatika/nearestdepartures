/**
 * Limit results by time (2h in seconds)
 */
const TIME_RANGE = 3 * 60 * 60;

/**
 * Form a graphql query for nearest departures
 * @param {number} lat Latitude of current position
 * @param {number} lon Longitude of current position
 * @param {number} time Current time in seconds
 * @param {number} distance Maximum distance
 */
export default ({ latitude, longitude, time, distance = 500 }) => {
    return `{
        nearest(lat: ${latitude}, lon: ${longitude}, maxResults: 1000, maxDistance: ${distance}, filterByPlaceTypes: DEPARTURE_ROW) {
            edges {
                node {
                    id
                    distance
                    place {
                        id
                        ... on DepartureRow {
                            stoptimes(startTime: ${time}, timeRange: ${TIME_RANGE} numberOfDepartures: 2) {
                                serviceDay
                                scheduledDeparture
                                realtimeDeparture
                                realtimeState
                                realtime
                                headsign
                                stop {
                                    code
                                    platformCode
                                    id
                                }
                            }
                            pattern {
                                route {
                                    gtfsId
                                    shortName
                                    longName
                                    mode
                                    color
                                    agency {
                                        id
                                        name
                                    }
                                }
                                code
                            }
                        }
                    }
                }
            }
        }
    }`;
};