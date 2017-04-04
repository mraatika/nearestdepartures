import VehicleIcon from '../vehicleicon';
import { VEHICLE_TYPE_TRANSLATIONS } from '../constants/constants';

/**
 * Filter button component
 * @constructs {FilterButton}
 * @param {string} vehicleType
 * @param {boolean} isToggled Button's toggle state
 * @param {Function} onFilterToggle Callback for button
 */
export default ({
    vehicleType = '',
    isToggled,
    onFilterToggle,
} = {}) => {
    let className = `filter-button bg ${vehicleType.toLocaleLowerCase()}${isToggled ? ' toggled' : ''}`;

    return (
        <button
            className={className}
            aria-label={`Suodatin ${ VEHICLE_TYPE_TRANSLATIONS[vehicleType]}`}
            aria-pressed={isToggled}
            onClick={e => onFilterToggle(vehicleType, e.ctrlKey)}>
            <VehicleIcon aria-hidden={true} iconName={`${vehicleType.toLocaleLowerCase()}-withoutBox`} />
        </button>
    );
}