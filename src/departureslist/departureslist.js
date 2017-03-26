import createDepartureRow from './departurerow';
import './departureslist.css';

export default Inferno => ({
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
