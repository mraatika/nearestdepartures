import DepartureRow from './departurerow';
import './departureslist.css';
/**
 * A component for displaying a list of departures
 * @constructs DeparturesList
 * @param {Object[]} [departures] List of departure objects
 * @param {Function} [sort] Callback for sorting
 * @returns {DeparturesList}
 */
export default ({
    departures = [],
    sort = () => {},
}) => (
    <table className="departures-list">
        <thead>
            <tr>
                <th onClick={() => sort('time')}>Departure</th>
                <th onClick={() => sort('routeName')}>Route</th>
                <th onClick={() => sort('destination')}>Destination</th>
                <th onClick={() => sort('distance')}>Distance</th>
            </tr>
        </thead>
        <tbody>
            { departures.map(departure => <DepartureRow key={ JSON.stringify(departure) } {...departure} />) }
        </tbody>
    </table>
);