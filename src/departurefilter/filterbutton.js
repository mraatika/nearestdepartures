import VehicleIcon from '../vehicleicon';

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
            onClick={e => onFilterToggle(vehicleType, e.ctrlKey)}>
            <VehicleIcon iconName={`${vehicleType.toLocaleLowerCase()}-withoutBox`} />
        </button>
    );
}