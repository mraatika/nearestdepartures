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
    <div className="departures-list-row">
        <a href={url} target="_blank">
            <span className={`time${realtime ? ' realtime' : ''}`}>
                <Time time={ realtimeDeparture } />
            </span>
            <span className="route">
                <RouteIdentifier vehicleType={vehicleType} routeName={routeName} />
            </span>
            <span className="destination">{ destination }</span>
            <span className="distance">
                <Distance distance={distance} />
            </span>
        </a>
    </div>
);