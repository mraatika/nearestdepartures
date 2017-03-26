import Time from './time';
import RouteIdentifier from './routeidentifier';

/**
 * Displays a single departure in the departures table
 * @constructs DepartureRow
 * @param {string} scheduledDeparture
 * @param {string} routeName
 * @param {string} destination
 * @param {string} nextScheduledDeparture
 * @returns {Inferno.Component}
 */
export default ({
    scheduledDeparture,
    realtime,
    realtimeDeparture,
    routeName,
    distance,
    destination,
    vehicleType,
} = {}) => {
    const departureTime = realtime ? realtimeDeparture : scheduledDeparture;

    return (
        <tr>
            <td className={ realtime ? 'realtime' : '' }>
                <Time time={ departureTime } />
            </td>
            <td>
                <RouteIdentifier vehicleType={vehicleType} routeName={routeName} />
            </td>
            <td>{ destination }</td>
            <td>{ distance } m</td>
        </tr>
    );
};