/** @module QueryDisruptions */

/**
 * Graphql query for disruptions
 * @type {string}
 */
export default `
  {
    alerts {
      alertHeaderText
      alertDescriptionText
      alertUrl
      effectiveStartDate
      effectiveEndDate
      route {
        gtfsId
        shortName
      }
    }
  }
`;
