import Time from './time';
import RouteIdentifier from './routeidentifier';
import Distance from './distance';

/**
 * Displays a single departure in the departures table
 * @constructs DepartureRow
 * @param {Object} props
 * @param {boolean} props.realtime
 * @param {number} props.realtimeDeparture
 * @param {string} props.routeName
 * @param {number} props.distance
 * @param {string} props.destination
 * @param {string} props.vehicleType
 * @returns {DepartureRow}
 */
export default ({
    realtime,
    realtimeDeparture,
    routeName,
    distance,
    destination,
    vehicleType,
} = {}) => (
    <tr>
        <td className={ realtime ? 'realtime' : '' }>
            <Time time={ realtimeDeparture } />
        </td>
        <td>
            <RouteIdentifier vehicleType={vehicleType} routeName={routeName} />
        </td>
        <td>{ destination }</td>
        <td>
            <Distance distance={distance} />
        </td>
    </tr>
);