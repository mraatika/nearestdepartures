import './accuracyindicator.css';

/**
 * A component for displaying GPS location accuracy info. Will display
 * an excalamation mark and a color depending on accuracy
 * @constructs AccuracyIndicator
 * @param {object} props
 * @param {number} props.accuracy GPS location accuracy in meters
 */
export default ({ accuracy }) => (
  <div class={`location-accuracy ${chooseColorClass(accuracy)}`}>
    <span class="location-accuracy-attention">!</span>
    {`Paikannuksen tarkkuus: ${Math.round(+accuracy || 0)}m`}
  </div>
);

/**
 * Choose color class based on accuracy
 * @private
 * @param {number} accuracy
 * @return {string} color class
 */
const chooseColorClass = accuracy =>
  accuracy > 500
  ? 'danger'
  : accuracy > 100
  ? 'warning'
  : '';
