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
    url,
} = {}) => (
    <a class="departures-list-row" href={url} target="_blank" rel="noopener">
        <div class={`time${realtime ? ' realtime' : ''}`}>
            <Time time={ realtimeDeparture } />
        </div>
        <div class="routename">
            <RouteIdentifier vehicleType={vehicleType} routeName={routeName} />
        </div>
        <div class="destination">{ destination }</div>
        <div class="distance">
            <Distance distance={distance} />
        </div>
    </a>
);
