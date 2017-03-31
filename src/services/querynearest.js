/**
 * Graphql query for nearest departures
 * @type {string}
 */
export default `
    query Nearest($latitude: Float!, $longitude: Float!, $maxResults: Int, $timeRange:Int, $departuresCount:Int, $vehicleTypes:[Mode]!) {
        nearest(lat: $latitude, lon: $longitude, maxResults: $maxResults, filterByPlaceTypes: DEPARTURE_ROW, filterByModes: $vehicleTypes) {
            edges {
                node {
                    id
                    distance
                    place {
                        id
                        ... on DepartureRow {
                            stoptimes(timeRange: $timeRange, numberOfDepartures: $departuresCount) {
                                serviceDay
                                scheduledDeparture
                                realtimeDeparture
                                realtimeState
                                realtime
                                headsign
                                trip {
                                    id
                                }
                            }
                            pattern {
                                route {
                                    gtfsId
                                    shortName
                                    longName
                                    mode
                                }
                                code
                            }
                        }
                    }
                }
            }
        }
    }
}`;