import VehicleIcon from '../vehicleicon';

export default ({
    routeName = '',
    vehicleType = '',
} = {}) => (
    <span class={ vehicleType.toLowerCase() }>
        <VehicleIcon iconName={vehicleType.toLocaleLowerCase()} />
        <span class="route-identifier">{ routeName }</span>
    </span>
);
