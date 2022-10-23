/**
 * Graphql query for nearest departures
 */
export default `
 query Nearest($latitude: Float!, $longitude: Float!, $maxResults: Int, $timeRange:Int, $departuresCount:Int, $maxDistance:Int) {
    nearest(lat: $latitude, lon: $longitude, maxResults: $maxResults, maxDistance: $maxDistance, filterByPlaceTypes: DEPARTURE_ROW) {
      edges {
        node {
          id
          distance
          place {
            id
            ... on DepartureRow {
              stop {
                gtfsId
                code
                name
                desc
              }
              stoptimes(timeRange: $timeRange, numberOfDepartures: $departuresCount, omitNonPickups: true) {
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
                headsign
              }
            }
          }
        }
      }
    }
  }
`;
