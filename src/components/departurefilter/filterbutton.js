import { linkEvent } from 'inferno';
import VehicleIcon from '../vehicleicon/vehicleicon';
import { VEHICLE_TYPE_TRANSLATIONS } from '../../constants/constants';

/**
 * Callback for filter button click
 * @param {object} props
 * @param {string} props.vehicleType
 * @param {Function} props.onFilterToggle
 * @param {Event} e
 */
const propagateFilterToggle = ({ vehicleType, onFilterToggle }, e) =>
  onFilterToggle(vehicleType, e.ctrlKey);

/**
* Filter button component
* @constructs {FilterButton}
* @param {Object} props
* @param {Function} props.onFilterToggle Callback for button
* @param {string} [props.vehicleType=""]
* @param {boolean} [props.isToggled] Button's toggle state
*/
export default ({ vehicleType = '', isToggled,  onFilterToggle }) => {
  const classNames = [
    'filter-button flex-full bottom-heavy-border',
    isToggled
      ? `toggled color-white bg-${vehicleType.toLocaleLowerCase()}`
      : 'bg-white color-gray-light',
  ];

  return (
    <button
      class={classNames.join(' ')}
      aria-label={`Suodatin ${VEHICLE_TYPE_TRANSLATIONS[vehicleType]}`}
      aria-pressed={!!isToggled}
      onClick={linkEvent({vehicleType, onFilterToggle}, propagateFilterToggle)}
    >
      <div class="space-xs space-clear-rl">
        <VehicleIcon
          class="vertical-middle"
          aria-hidden={true}
          iconName={`${vehicleType.toLocaleLowerCase()}-withoutBox`}
        />
      </div>
    </button>
  );
};
