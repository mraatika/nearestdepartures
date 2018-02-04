import DateTime from './datetime';

/**
 * A component for displaying effective disruptions for a route
 * @constructs DisruptionAlert
 * @param {object} props
 * @param {object[]} props.disruptions
 */
export default ({ disruptions }) => (
  <div class="alert alert-info">
    {disruptions.map(disruption => (
      <p>
        {disruption.alertHeaderText && <h3>{disruption.alertHeaderText}</h3>}
        <p class="alert-info-body">{disruption.alertDescriptionText}</p>
        <p class="alert-info-duration">
          Voimassa:&nbsp;
          <b>
            <DateTime time={disruption.effectiveStartDate} actualTime={true} />&nbsp;-&nbsp;
            <DateTime time={disruption.effectiveEndDate} actualTime={true} />
          </b>
          .&nbsp;
          {disruption.alertUrl &&
            <a class="disruption-alert-additional-info" href={disruption.alertUrl} target="_blank" rel="noopener">Lisätietoja</a>
          }
        </p>
      </p>
    ))}
  </div>
);
