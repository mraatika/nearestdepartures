import createTime from './time';

/**
 * Factory for DepartureRow component. Displays a single
 * departure in the departures table
 * @constructs DepartureRow
 * @extends {Inferno.Component}
 * @param {Inferno} Inferno
 */
export default Inferno =>
/**
 * @param {string} scheduledDeparture
 * @param {string} routeName
 * @param {string} destination
 * @param {string} nextScheduledDeparture
 * @returns {Inferno.Component}
 */
({
    scheduledDeparture,
    realtime,
    realtimeDeparture,
    routeName,
    distance,
    destination,
}) => {
    const Time = createTime(Inferno);
    const departureTime = realtime ? realtimeDeparture : scheduledDeparture;

    return (
        <tr>
            <td className={ realtime ? 'realtime' : '' }>
                <Time time={ departureTime } />
            </td>
            <td>{ routeName }</td>
            <td>{ destination }</td>
            <td>{ distance } m</td>
        </tr>
    );
};