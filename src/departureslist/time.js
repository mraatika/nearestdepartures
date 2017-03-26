/**
 * Pad number with leading zero if necessary
 * @private
 * @param {number} num
 */
const padNumber = num => (('' + num).length < 2 ? '0' + num : num);
/**
 * Get time as string containing hours and minutes separated by a colon
 * @private
 * @param {Date} date
 * @returns {string}
 */
const getTimeAsText = date => `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`;

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
 * @param {number} props.time Time in seconds
 * @return {Time}
 */
({ time }) => {
    const now = Date.now();
    const date = new Date(time * 1000);
    const timeLeftInMins = Math.floor(((date - now) / 1000) / 60);
    let timeText = '';

    if (date > now && timeLeftInMins < 10) {
        timeText = timeLeftInMins < 1 ? 'Now' : `${timeLeftInMins} min`;
    } else {
        timeText = getTimeAsText(date);
    }

    return <span>{timeText}</span>;
};