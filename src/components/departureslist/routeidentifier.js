import VehicleIcon from '../common/vehicleicon';

/**
 * Component for displaying a vehicle icon and route number
 * @constructs RouteIdentifier
 * @param {Object} props
 * @param {string} [routeName=""]
 * @param {string} [vehicleType=""]
 * @returns {RouteIdentifier}
 */
export default ({ routeName = '', vehicleType = '' }) => (
  <span class={vehicleType.toLowerCase()}>
    <VehicleIcon iconName={vehicleType.toLocaleLowerCase()} />
    <span class="route-identifier">{routeName}</span>
  </span>
);
