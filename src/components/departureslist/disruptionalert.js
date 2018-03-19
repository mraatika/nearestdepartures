import ExternalLink from '../externallink';

/**
 * A component for displaying effective disruptions for a route
 * @constructs DisruptionAlert
 * @param {object} props
 * @param {object[]} props.disruptions
 */
export default ({ disruptions }) => (
  <div class="alert alert-info full-width">
    {disruptions.map(disruption => (
      <p>
        {disruption.alertHeaderText && <h3>{disruption.alertHeaderText}</h3>}
        <p class="alert-info-body">{disruption.alertDescriptionText}</p>
        {disruption.alertUrl &&
          <p class="alert-info-duration">
            <ExternalLink
              class="disruption-alert-additional-info"
              href={disruption.alertUrl}
              text="Lisätietoja"
            />
          </p>}
      </p>
    ))}
  </div>
);
