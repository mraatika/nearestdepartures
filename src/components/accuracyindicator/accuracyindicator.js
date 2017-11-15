import './accuracyindicator.css';

/**
 * Choose color class based on accuracy
 * @private
 * @param {number} accuracy
 * @return {string} color class
 */
const chooseColorClass = (accuracy) => {
    if (accuracy > 500) return 'danger';
    if (accuracy > 100) return 'warning';
    return '';
}

/**
 * A component for displaying GPS location accuracy info. Will display
 * an excalamation mark and a color depending on accuracy
 * @param {object} props
 * @param {number} props.accuracy GPS location accuracy in meters
 */
const AccuracyIndicator = ({ accuracy }) => (
    <div class={`location-accuracy ${chooseColorClass(accuracy)}`}>
        <span class="location-accuracy-attention">!</span>
        {`Paikannuksen tarkkuus: ${Math.round(+accuracy || 0)}m`}
    </div>
);

export default AccuracyIndicator;
