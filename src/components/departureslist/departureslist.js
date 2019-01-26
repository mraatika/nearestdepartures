import { Component } from 'inferno';
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
 * @param {object} props.disruptions
 * @returns {DepartureRow[]}
 */
const generateDepartureRows = ({ departures, toggledRowId, onRowToggle, disruptions = {} }) =>
  departures.map(departure =>
    <DepartureRow
      key={departure.id}
      isToggled={toggledRowId === departure.id}
      onRowToggle={onRowToggle}
      disruptions={disruptions[departure.routeId]}
      {...departure}
    />
  );

/**
 * Generate a placeholder row
 * @private
 * @returns {Function}
 */
const generateEmptyRow = () =>
  <div class="departures-list-row no-results italic align-center space-m space-clear-rl">
    Lähtöjä ei löytynyt annetuilla hakukriteereillä tai suodattimilla.
  </div>;

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
   * @private
   * @param {string} propName Name of the prop to sort by
   */
  updateSortProps(propName) {
    // if sorted with same prop as before then switch sort mode asc <--> desc
    const sortDir = this.state.sortProp === propName ? (this.state.sortDir * -1) : 1;
    // set sort props to state and then sort departures
    this.setState({ sortProp: propName, sortDir });
  }

  /**
   * Toggle departure row's extra content section and close others'
   * @private
   * @param {string} id The target row's id
   */
  onRowToggle(id) {
    const current = this.state.toggledRowId;
    this.setState({ toggledRowId: id === current ? undefined : id });
  }

  render() {
    const { departures, disruptions, isLoading } = this.props;
    const { sortProp, sortDir, toggledRowId } = this.state;
    // sort departures using sort props from state
    const sorted = sortDepartures(departures, sortProp, sortDir);
    // display rows or a placeholder row when there are no departures to display
    const rows = sorted.length
      ? generateDepartureRows({ departures: sorted, toggledRowId, onRowToggle: this.onRowToggle, disruptions })
      : generateEmptyRow();

    return (
      <div class="departures-list position-relative centering-margin">
        <LoadingOverlay show={isLoading} />

        <div class="departures-list-header flex-row no-wrap space-s space-keep-b">
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
        <ul id="departures-list-results" class="departures-list-body">{rows}</ul>
      </div>
    );
  }
};
