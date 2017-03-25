/**
 * Pad number with leading zero if necessary
 * @private
 * @param {number} num
 */
const padNumber = num => (('' + num).length < 2 ? '0' + num : num);

/**
 * Factory function for Time component
 * @param {Object} Inferno
 * @returns {Function}
 */
export default Inferno =>
/**
 * Component for displaying time in human readable form
 * @constructs Time
 * @param {Object} props
 * @param {number} props.time
 * @return {Time}
 */
({ time }) => {
    const date = new Date(time * 1000);
    const hours = padNumber(date.getHours());
    const minutes = padNumber(date.getMinutes());

    return <span>{`${hours}:${minutes}`}</span>;
};