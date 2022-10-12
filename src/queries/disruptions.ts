export default `
 {
   alerts(severityLevel: [WARNING, SEVERE], feeds: ["HSL"]) {
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
