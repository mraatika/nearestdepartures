import VehicleIcon from '../vehicleicon';

export default ({
    routeName = '',
    vehicleType = '',
} = {}) => (
    <span className={ vehicleType.toLowerCase() }>
        <VehicleIcon iconName={vehicleType.toLocaleLowerCase()} />
        <span className="route-identifier">{ routeName }</span>
    </span>
);
