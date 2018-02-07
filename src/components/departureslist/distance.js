/**
* A component for displaying distance in human readable form
* @constructs Distance
* @param {Object} props
* @param {number} props.distance distance in meters
* @returns {Distance}
*/
export default ({ distance }) => <span>{getDistanceinHumanReadableForm(distance)}</span>;

/**
 * @private
 * @param {number} distance
 * @return {number} rounded
 */
const roundToKm = distance => Math.round((distance / 1000) * 10) / 10;

/**
 * @private
 * @param {number} distance
 * @return {string}
 */
const getDistanceinHumanReadableForm = distance =>
  !distance
    ? ''
    : distance >= 1000
    ? `${roundToKm(distance)} km`
    : `${distance} m`;
