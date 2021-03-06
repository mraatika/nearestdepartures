import './accuracyindicator.css';

/**
 * A component for displaying GPS location accuracy info. Will display
 * an excalamation mark and a color depending on accuracy
 * @constructs AccuracyIndicator
 * @param {object} props
 * @param {number} props.accuracy GPS location accuracy in meters
 * @param {PositionError} [props.error] An error in location fetching
 */
export default ({ accuracy, error }) => (
  <div
    class={`location-accuracy align-right text-s ${chooseColorClass(accuracy, error)}`}
    aria-live="assertive"
    aria-atomic="true"
  >
    <span class="location-accuracy-attention text-l space-xxs space-keep-r" aria-hidden="true">!</span>
      {error
        ? error.message
        : `Paikannuksen tarkkuus: ${Math.round(+accuracy || 0)}m`}
  </div>
);

/**
 * Choose color class based on accuracy
 * @private
 * @param {number} accuracy
 * @return {string} color class
 */
const chooseColorClass = (accuracy, error) =>
  error || accuracy > 500
  ? 'danger color-alert'
  : accuracy > 100
    ? 'warning color-warning'
    : '';
