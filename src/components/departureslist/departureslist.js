import Component from 'inferno-component';
import DepartureRow from './departurerow';
import LoadingOverlay from '../loadingoverlay/loadingoverlay';
import DeparturesListSortHeader from './departureslistsortheader';
import sortDepartures from '../../utils/departuresorter';
import './departureslist.css';

/**
 * Generate a row for each departure
 * @private
 * @param {Object[]} departures
 * @returns {Function[]}
 */
const generateDepartureRows = departures => departures.map(departure => <DepartureRow key={departure.id} {...departure} />);
/**
 * Generate a placeholder row
 * @private
 * @returns {Function}
 */
const generateEmptyRow = () => <div class="departures-list-row no-results">Lähtöjä ei löytynyt annetuilla hakukriteereillä tai suodattimilla.</div>;

/**
 * List's headers
 * @type {object[]}
 */
const sortHeaders = [
  { text: 'Lähtee', propName: 'time' },
  { text: 'Linja', propName: 'routeName' },
  { text: 'Määränpää', propName: 'destination' },
  { text: 'Pysäkille', propName: 'distance' },
];

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
    this.updateSortProps = this.updateSortProps.bind(this);
  }

  /**
   * Sorts departures by prop and set to state
   * @param {string} propName Name of the prop to sort by
   */
  updateSortProps(propName) {
    // if sorted with same prop as before then switch sort mode asc <--> desc
    const sortDir = this.state.sortProp === propName ? (this.state.sortDir * -1) : 1;
    // set sort props to state and then sort departures
    this.setState({ sortProp: propName, sortDir });
  }

  render() {
    const { sortProp, sortDir } = this.state;
    // sort departures using sort props from state
    const sorted = sortDepartures(this.props.departures, sortProp, sortDir);
    // display rows or a placeholder row when there are no departures to display
    const rows = sorted.length ? generateDepartureRows(sorted) : generateEmptyRow();

    return (
      <div class="departures-list">
        <LoadingOverlay show={this.props.isLoading} />

        <div class="departures-list-header">
          {sortHeaders.map(({ text, propName }) =>
            <DeparturesListSortHeader
              propName={propName}
              active={sortProp === propName}
              onClick={this.updateSortProps}
              text={text}
            />
          )}
        </div>

        <div class="departures-list-body">{rows}</div>
      </div>
    );
  }
};
