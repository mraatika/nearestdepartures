/**
 * Graphql query for nearest departures
 * @type {string}
 */
export default `
    query Nearest($latitude: Float!, $longitude: Float!, $range: Int!, $maxResults: Int, $startTime:Long, $timeRange:Int, $departuresCount:Int, $vehicleTypes:[Mode]!) {
        nearest(lat: $latitude, lon: $longitude, maxResults: $maxResults, maxDistance: $range, filterByPlaceTypes: DEPARTURE_ROW, filterByModes: $vehicleTypes) {
            edges {
                node {
                    id
                    distance
                    place {
                        id
                        ... on DepartureRow {
                            stoptimes(startTime: $startTime, timeRange: $timeRange, numberOfDepartures: $departuresCount) {
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
    }
}`;