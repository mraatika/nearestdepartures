import createDepartureRow from './departurerow';
import './departureslist.css';

/**
 * Factory function for DeparturesList
 * @param {Object} Inferno
 * @returns {Function}
 */
export default Inferno =>
/**
 * @constructs DeparturesList
 * @param {Object[]} [departures] List of departure objects
 * @param {Function} [sort] Callback for sorting
 * @returns {DeparturesList}
 */
({
    departures = [],
    sort = () => {},
}) => {
    const DepartureRow = createDepartureRow(Inferno);

    return (
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
};
