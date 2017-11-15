import VehicleIcon from '../vehicleicon/vehicleicon';
import {  VEHICLE_TYPE_TRANSLATIONS } from '../../constants/constants';

/**
* Filter button component
* @constructs {FilterButton}
* @param {Object} props
* @param {Function} props.onFilterToggle Callback for button
* @param {string} [props.vehicleType=""]
* @param {boolean} [props.isToggled] Button's toggle state
*/
export default ({ vehicleType = '', isToggled,  onFilterToggle }) => {
  const className = `filter-button bg ${vehicleType.toLocaleLowerCase()}${isToggled ? ' toggled' : ''}`;

  return (
    <button
      class={className}
      aria-label={`Suodatin ${VEHICLE_TYPE_TRANSLATIONS[vehicleType]}`}
      aria-pressed={!!isToggled}
      onClick={e => onFilterToggle(vehicleType, e.ctrlKey)}
    >
      <VehicleIcon aria-hidden={true} iconName={`${vehicleType.toLocaleLowerCase()}-withoutBox`} />
      <div className="bottom-border" />
    </button>
  );
}
