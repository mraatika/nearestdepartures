import ExternalLink from '../externallink';

/**
 * A component for displaying effective disruptions for a route
 * @constructs DisruptionAlert
 * @param {object} props
 * @param {object[]} props.disruptions
 */
export default ({ disruptions }) => (
  <div class="alert-info color-alert align-left full-width bg-light-red space-s space-clear-tb">
    {disruptions.map(disruption => (
      <p class="space-xs space-clear-rl">
        {disruption.alertHeaderText && <h3>{disruption.alertHeaderText}</h3>}
        <p class="alert-info-body">{disruption.alertDescriptionText}</p>
        {disruption.alertUrl &&
          <p class="alert-info-duration space-xs space-keep-t">
            <ExternalLink
              class="disruption-alert-additional-info underline"
              href={disruption.alertUrl}
              text="Lisätietoja"
            />
          </p>}
      </p>
    ))}
  </div>
);
