/**
 * Graphql query for nearest departures
 */
export default `
query BatchNearest($id: ID!, $startTime: Long!, $departuresCount: Int, $timeRange:Int) {
  node(id: $id) {
    id
    ...on DepartureRow {
      stoptimes(startTime: $startTime, timeRange: $timeRange, numberOfDepartures: $departuresCount) {
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
