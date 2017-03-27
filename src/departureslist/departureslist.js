import Component from 'inferno-component';
import DepartureRow from './departurerow';
import sortDepartures from '../utils/departuresorter';
import './departureslist.css';

/**
 * Generate a row for each departure
 * @private
 * @param {Object[]} departures
 * @returns {Function[]}
 */
const generateDepartureRows = departures => departures.map(departure => <DepartureRow key={ JSON.stringify(departure) } {...departure} />);
/**
 * Generate a placeholder row
 * @private
 * @returns {Function}
 */
const generateEmptyRow = () => <tr class="no-results"><td colspan="4">No departures found with current filters</td></tr>;


/**
 * A component for displaying a list of departures
 * @class DeparturesList
 * @extends {Inferno.Component}
 */
export default class DeparturesList extends Component {
    /**
     * Creates an instance of DeparturesList.
     * @param {Object} props
     * @param {Object[]} props.departures
     */
    constructor(props = {}) {
        super(props);
        this.state = { sortProp: 'time', sortDir: 1 };
    }

    /**
     * Sorts departures by prop and set to state
     * @param {string} propName Name of the prop to sort by
     * @param {Object[]} [list] List of departures to sort, defaults to state.departures
     */
    updateSortProps(propName, list) {
        // if sorted with same prop as before then switch sort mode asc <--> desc
        const sortDir = this.state.sortProp === propName ? (this.state.sortDir * -1 ): 1;
        // set sort props to state and then sort departures
        this.setState({ sortProp: propName, sortDir });
    }

    render() {
        const { sortProp, sortDir } = this.state;
        // sort departures using sort props from state
        const sorted = sortDepartures(this.props.departures, sortProp, sortDir);
        // display rows or a placeholder row when there are no departures to display
        let rows = sorted.length ? generateDepartureRows(sorted) : generateEmptyRow();

        return (
            <table className="departures-list">
                <thead>
                    <tr>
                        <th onClick={() => this.updateSortProps('time')}>Departure</th>
                        <th onClick={() => this.updateSortProps('routeName')}>Route</th>
                        <th onClick={() => this.updateSortProps('destination')}>Destination</th>
                        <th onClick={() => this.updateSortProps('distance')}>Distance</th>
                    </tr>
                </thead>
                <tbody>{ rows }</tbody>
            </table>
        );
    }
};