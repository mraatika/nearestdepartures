import Component from 'inferno-component';
import DepartureRow from './departurerow';
import LoadingOverlay from '../loadingoverlay/loadingoverlay';
import DeparturesListSortHeader from './departureslistsortheader';
import sortDepartures from '../../utils/departuresorter';
import './departureslist.css';

/**
 * Generate a row for each departure
 * @private
 * @param {object} props
 * @param {object[]} props.departures
 * @param {boolean} props.toggledRowId
 * @param {function} props.onRowToggle
 * @returns {DepartureRow[]}
 */
const generateDepartureRows = ({ departures, toggledRowId, onRowToggle }) => departures.map(departure =>
  <DepartureRow
    key={departure.id}
    isToggled={toggledRowId === departure.id}
    onRowToggle={onRowToggle}
    {...departure}
  />
);

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
    this.state = { sortProp: 'time', sortDir: 1, toggledRowId: null };
    this.updateSortProps = this.updateSortProps.bind(this);
    this.onRowToggle = this.onRowToggle.bind(this);
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

  onRowToggle(id) {
    this.setState({ toggledRowId: id });
  }

  render() {
    const { sortProp, sortDir, toggledRowId } = this.state;
    // sort departures using sort props from state
    const sorted = sortDepartures(this.props.departures, sortProp, sortDir);
    // display rows or a placeholder row when there are no departures to display
    const rows = sorted.length
      ? generateDepartureRows({ departures: sorted, toggledRowId, onRowToggle: this.onRowToggle })
      : generateEmptyRow();

    return (
      <div class="departures-list">
        <LoadingOverlay show={this.props.isLoading} />

        <div class="departures-list-header">
          {sortHeaders.map(({ text, propName }) =>
            <DeparturesListSortHeader
              key={propName}
              propName={propName}
              active={sortProp === propName}
              onClick={this.updateSortProps}
              text={text}
            />
          )}
        </div>

        <ul class="departures-list-body">{rows}</ul>
      </div>
    );
  }
};
