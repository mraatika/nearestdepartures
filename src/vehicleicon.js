import icons from '../public/icons.svg';

/**
 * Vehicle type icon component
 * @constructs VehicleIcon
 * @param {string} iconName
 * @returns {VehicleIcon}
 */
export default ({ iconName }) => (
    <svg viewBox="0 0 100 100" class="icon">
        <use xlink:href={ icons + `#icon-icon_${iconName}` } style={{ fill: 'currentColor' }}/>
    </svg>
);