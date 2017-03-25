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
 * @param {string} routeDestination
 * @param {string} nextScheduledDeparture
 * @returns {Inferno.Component}
 */
({
    scheduledDeparture,
    routeName,
    routeDestination,
    nextScheduledDeparture,
    distance,
}) => {
    const Time = createTime(Inferno);
    return (
        <tr>
            <td><Time time={ scheduledDeparture } /></td>
            <td>{ routeName }</td>
            <td>{ routeDestination }</td>
            <td>{ distance }m</td>
        </tr>
    );
};