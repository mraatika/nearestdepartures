/**
 * Form a graphql query for nearest departures
 * @param {number} lat Latitude of current position
 * @param {number} lon Longitude of current position
 * @param {number} time Current time in seconds
 * @param {number} distance Maximum distance
 */
export default ({ latitude, longitude, time, distance = 500 }) => {
    return `{
        nearest(lat: ${latitude}, lon: ${longitude}, maxDistance: ${distance}, filterByPlaceTypes: DEPARTURE_ROW) {
            edges {
                node {
                    id
                    distance
                    place {
                        id
                        ... on DepartureRow {
                            stoptimes(startTime: ${time}, numberOfDepartures: 2) {
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