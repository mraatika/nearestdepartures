import createDepartureRow from './departurerow';

export default Inferno => ({
    departures = []
}) => {
    const DepartureRow = createDepartureRow(Inferno);

    return (
        <table>
            <thead>
                <tr>
                    <th>Departure</th>
                    <th>Route</th>
                    <th>Destination</th>
                    <th>Next</th>
                </tr>
            </thead>
            <tbody>
                { departures.map(departure => <DepartureRow key={ departure.id } {...departure} />) }
            </tbody>
        </table>
    );
};
