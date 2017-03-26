import icons from '../public/icons.svg';

/**
 * Vehicle type icon component
 * @constructs VehicleIcon
 * @param {string} vehicleType
 * @returns {VehicleIcon}
 */
export default ({
    vehicleType = ''
}) => (
    <svg viewBox="0 0 100 100" className="icon">
        <use xlink:href={ icons + `#icon-icon_${vehicleType.toLocaleLowerCase()}` } />
    </svg>
);