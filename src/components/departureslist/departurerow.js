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
    <div class="departures-list-row">
        <a href={url} target="_blank">
            <span class={`time${realtime ? ' realtime' : ''}`}>
                <Time time={ realtimeDeparture } />
            </span>
            <span class="route">
                <RouteIdentifier vehicleType={vehicleType} routeName={routeName} />
            </span>
            <span class="destination">{ destination }</span>
            <span class="distance">
                <Distance distance={distance} />
            </span>
        </a>
    </div>
);