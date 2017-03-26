import VehicleIcon from '../vehicleicon';

export default ({
    routeName = '',
    vehicleType = '',
} = {}) => (
    <div className={ vehicleType.toLowerCase() }>
        <VehicleIcon iconName={vehicleType.toLocaleLowerCase()} />
        <span className="route-identifier">{ routeName }</span>
    </div>
);
