import createDepartureRow from './departurerow';
import { getDepartureTime } from '../utils/utils';
import './departureslist.css';

const sortByRealDeparture = (a, b) => {
    const departureA = getDepartureTime(a);
    const departureB = getDepartureTime(b);
    return new Date(departureA).getTime() - new Date(departureB).getTime();
};

export default Inferno => ({
    departures = []
}) => {
    const DepartureRow = createDepartureRow(Inferno);
    const sorted = departures.sort(sortByRealDeparture);

    return (
        <table className="departures-list">
            <thead>
                <tr>
                    <th>Departure</th>
                    <th>Route</th>
                    <th>Destination</th>
                    <th>Distance</th>
                </tr>
            </thead>
            <tbody>
                { sorted.map(departure => <DepartureRow key={ JSON.stringify(departure) } {...departure} />) }
            </tbody>
        </table>
    );
};
