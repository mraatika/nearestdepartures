import Component from 'inferno-component';
import filter from 'lodash/fp/filter';
import without from 'lodash/fp/without';
import DeparturesList from './departureslist/departureslist';
import DepartureFilter from './departurefilter/departurefilter';
import fetchDepartures from './services/departuresservice';
import findGPSLocation from './services/locationservice';
import sortDepartures from './utils/departuresorter';
import './app.css';

/**
 * All possible filters
 */
const allFilters = ['BUS', 'TRAM', 'RAIL', 'SUBWAY', 'FERRY'];

/**
 * Function for filtering departures by type
 * @param {string[]} filters
 * @return {Function}
 */
const filterDepartures = filters => filter(d => filters.indexOf(d.vehicleType) > -1);

/**
 * @class App
 * @extends {Inferno.Component}
 */
class App extends Component {
    /**
     * Creates an instance of App.
     * @constructs App
     */
    constructor() {
        super();

        // default state
        this.state = {
            // sort default by departure time
            sortProp: 'time',
            sortDir: 1,
            filters: allFilters,
            error: null,
        };
    }

    /**
     * Fetches departures when componen has mounted
     */
    componentDidMount() {
        // find location
        findGPSLocation()
            // finde departures based on location
            .then(fetchDepartures, err => this.showError(`Location unavailable (${err})!`))
            .then((departures) => {
                this.setState({ initialDepartures: departures }, () => this.sortStateDepartures());
                return departures;
            }, err => this.showError(`Fetching depatures failed (${err})!`));
    }

    /**
     * Adds error to the state
     * @param {string} error Error message
     */
    showError(error) {
        this.setState({ error });
    }

    /**
     * Sorts departures by prop and set to state
     * @param {string} propName Name of the prop to sort by
     * @param {Object[]} [list] List of departures to sort, defaults to state.departures
     */
    updateSortPropsAndDepartures(propName, list) {
        // if sorted with same prop as before then switch sort mode asc <--> desc
        const sortDir = this.state.sortProp === propName ? (this.state.sortDir * -1 ): 1;
        // set sort props to state and then sort departures
        this.setState({ sortProp: propName, sortDir }, () => this.sortStateDepartures());
    }

    /**
     * Sort departures and update state
     */
    sortStateDepartures() {
        const { sortProp, sortDir, departures, initialDepartures } = this.state;
        let sorted = sortDepartures(sortProp)(departures || initialDepartures);
        // if sort dir is descending then reverse the array
        if (sortDir === -1) sorted.reverse();
        this.setState({ departures: sorted });
    }

    /**
     * Callback for filter button. Toggles filter state.
     * @param {string} type
     * @param {boolean} multiselect
     */
    onFilterToggle(type, multiselect) {
        const current = this.state.filters;
        const currentToggled = current.indexOf(type) > -1;
        const multipleToggled = current.length > 1;
        let updatedFilters = [];

        if (multiselect) {
            updatedFilters = currentToggled ? without([type], current) : [].concat(current, type);
        } else {
            updatedFilters = (multipleToggled || !currentToggled) ? [type] : allFilters.slice(0);
        }

        // update filter props on state and then filter departures
        this.setState({ filters: updatedFilters }, () => this.filterStateDepartures());
    }

    /**
     * Filter departures based on filters set on state
     */
    filterStateDepartures() {
        const { initialDepartures, filters } = this.state;
        const filtered = filterDepartures(filters)(initialDepartures);
        // filter departures and then sort
        this.setState({ departures: filtered }, () => this.sortStateDepartures());
    }

    /**
     * Renders App
     */
    render() {
        const { departures, filters, error } = this.state;

        return (
            <div className="app">
                <header>
                    <h2>{`Nearest Departures ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}</h2>
                </header>

                <main>
                    <div class="alert" style={{ display: error ? 'block' : 'none' }}>{ error }</div>
                    <DepartureFilter
                        filters={allFilters}
                        onFilterToggle={this.onFilterToggle.bind(this)}
                        activeFilters={filters} />
                    <DeparturesList
                        departures={departures}
                        sort={this.updateSortPropsAndDepartures.bind(this) }/>
                </main>
            </div>
        );
    }
}

export default App;
