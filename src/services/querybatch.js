/**
 * Graphql query for nearest departures
 * @type {string}
 */
export default `
    query BatchNearest($id: ID!, $startTime: Long!, $departuresCount: Int) {
        node(id: $id) {
            id
            ...on DepartureRow {
                stoptimes(startTime: $startTime, timeRange: 7200, numberOfDepartures: $departuresCount) {
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
            }
        }
    }
`;