import VehicleIcon from '../vehicleicon/vehicleicon';

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
    <span class={`route-identifier space-xxs space-keep-l color-${vehicleType.toLowerCase()}`}>{routeName}</span>
  </span>
);
