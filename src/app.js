import Component from 'inferno-component';
import filter from 'lodash/fp/filter';
import without from 'lodash/fp/without';
import { getNowInSeconds } from './utils/utils';
import DeparturesList from './departureslist/departureslist';
import DepartureFilter from './departurefilter/departurefilter';
import fetchDepartures from './utils/departurefetchmerge';
import findGPSLocation from './services/locationservice';
import './app.css';

/**
 * All possible filters
 */
const allFilters = ['BUS', 'TRAM', 'RAIL', 'SUBWAY', 'FERRY'];

const DEFAULT_RANGE = 400;

/**
 * Function for filtering departures by type
 * @param {string[]} filters
 * @return {Function}
 */
const filterDepartures = filters => filter((d) => {
    return filters.vehicleTypes.indexOf(d.vehicleType) > -1 &&
        d.distance < filters.range &&
        d.realtimeDeparture >= getNowInSeconds()
});

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
        this.state = { filters: { vehicleTypes: allFilters, range: DEFAULT_RANGE }, error: null };
    }

    /**
     * Find location and fetch departures when component has mounted
     */
    componentDidMount() {
        // find location
        findGPSLocation()
            .then(
                location => this.setState({ location }),
                err => this.showError(`Location unavailable (${err})!`)
            )
            // finde departures based on location
            .then(location => this.fetchDeparturesToState(location));
    }

    /**
     * Fetch departures and add them to state. Apply filters and also set filtered result to state.
     */
    fetchDeparturesToState() {
        const { location, departures, filters } = this.state;

        fetchDepartures(location, filters.vehicleTypes, departures)
            .then((allDepartures) => {
                this.setState({ departures: allDepartures, filtered: filterDepartures(filters)(allDepartures) });
            })
            .catch(err => this.showError(`Departure fetching failed (${err})`));
    }

    /**
     * Callback for filter button. Toggles filter state.
     * @param {string} type
     * @param {boolean} multiselect
     */
    onFilterToggle(type, multiselect) {
        const { range, vehicleTypes: current } = this.state.filters;
        const currentToggled = current.indexOf(type) > -1;
        const multipleToggled = current.length > 1;
        let updatedFilters = [];

        if (multiselect) {
            updatedFilters = currentToggled ? without([type], current) : [].concat(current, type);
        } else {
            updatedFilters = (multipleToggled || !currentToggled) ? [type] : allFilters.slice(0);
        }

        // update filter props on state and then filter departures
        this.setState({ filters: { vehicleTypes: updatedFilters, range } }, () => this.filterDeparturesToState());
    }

    /**
     * Callback for range filter change
     * @param {number} range
     */
    onRangeChange(range) {
        const { vehicleTypes } = this.state.filters;
        this.setState({ filters: { vehicleTypes, range } }, () => this.filterDeparturesToState());
    }

    /**
     * Filter departures based on filters set on state
     */
    filterDeparturesToState() {
        const { departures, filters } = this.state;
        const filtered = filterDepartures(filters)(departures);
        // filter departures and then sort
        this.setState({ filtered });
    }

    /**
     * Adds error to the state
     * @param {string} error Error message
     */
    showError(error) {
        this.setState({ error });
    }

    /**
     * Renders App
     */
    render() {
        const { filtered, filters, error } = this.state;

        return (
            <div className="app">
                <header>
                    <h2>{`Nearest Departures ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}</h2>
                </header>

                <main>
                    <div class="alert" style={{ display: error ? 'block' : 'none' }}>{ error }</div>
                    <DepartureFilter
                        filters={allFilters}
                        activeFilters={filters.vehicleTypes}
                        range={filters.range}
                        onFilterToggle={this.onFilterToggle.bind(this)}
                        onRangeChange={this.onRangeChange.bind(this)} />
                    <DeparturesList departures={filtered} />
                </main>
            </div>
        );
    }
}

export default App;
