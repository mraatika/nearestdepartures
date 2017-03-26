import VehicleIcon from '../vehicleicon';

export default ({
    routeName = '',
    vehicleType = '',
} = {}) => (
    <div className={ vehicleType.toLowerCase() }>
        <VehicleIcon vehicleType={vehicleType} />
        <span className="route-identifier">{ routeName }</span>
    </div>
);
