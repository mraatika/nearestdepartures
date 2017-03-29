/**
 * A component for displaying distance in human readable form
 * @constructs Distance
 * @param {Object} props
 * @param {number} props.distance distance in meters
 * @returns {Distance}
 */
export default ({ distance }) => {
    let displayedDistance = '';

    if (distance) {
        // if distance is more than km then display kilometers with single decimal
        if (distance >= 1000) {
            const rounded = Math.round((distance / 1000) * 10) / 10;
            displayedDistance = `${rounded} km`;
        } else {
            displayedDistance = `${distance} m`;
        }
    }

    return <span>{displayedDistance}</span>;
};