import createDepartureRow from './departurerow';

export default Inferno => ({
    departures = []
}) => {
    const DepartureRow = createDepartureRow(Inferno);
    const sorted = departures.sort((a, b) =>
        new Date(a.scheduledDeparture).getTime() - new Date(b.scheduledDeparture).getTime()
    );

    return (
        <table>
            <thead>
                <tr>
                    <th>Departure</th>
                    <th>Route</th>
                    <th>Destination</th>
                    <th>Distance</th>
                </tr>
            </thead>
            <tbody>
                { sorted.map(departure => <DepartureRow key={ departure.id } {...departure} />) }
            </tbody>
        </table>
    );
};
