import Component from 'inferno-component';
import filter from 'lodash/fp/filter';
import without from 'lodash/fp/without';
import { getNowInSeconds } from './utils/utils';
import DeparturesList from './departureslist/departureslist';
import DepartureFilter from './departurefilter/departurefilter';
import ErrorMessage from './errormessage';
import AddressSearch from './addresssearch/addresssearch';
import fetchDepartures from './utils/departurefetchmerge';
import findGPSLocation from './services/locationservice';
import { lookupAddress, searchAddress } from './services/addresssearchservice';
import formatError, { POSITION_ERROR } from './utils/formaterror';
import './app.css';

/**
 * All possible filters
 */
const allVehicleTypes = ['BUS', 'TRAM', 'RAIL', 'SUBWAY', 'FERRY'];

/**
 * Default range filter value
 * @type {number}
 */
const DEFAULT_RANGE = 400;

/**
 * Default app state
 * @type {Object}
 */
const DEFAULT_STATE = {
    addressSearchTerm: '',
    error: null,
    filters: {
        range: DEFAULT_RANGE,
        vehicleTypes: allVehicleTypes,
    }
};

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
        this.state = Object.assign({}, DEFAULT_STATE);
    }

    /**
     * Find location and fetch departures when component has mounted
     */
    componentDidMount() {
        // find location
        findGPSLocation()
            .then((location) => {
                lookupAddress(location)
                    .then((address) => {
                        this.setState({ location, addressSearchTerm: address });
                        this.fetchDeparturesToState(location);
                    })
                    .catch(err => {
                        this.showError(`Address lookup failed: ${err.message}!`);
                    });
            })
            .catch(err =>  this.showError(formatError(POSITION_ERROR, err)));
    }

    /**
     * Fetch departures and add them to state. Apply filters and also set filtered result to state.
     * @param {Object} location
     * @param {number} location.latitude
     * @param {number} location.longitude
     */
    fetchDeparturesToState(location) {
        const { filters } = this.state;

        fetchDepartures(location, filters.vehicleTypes)
            .then((allDepartures) => {
                this.setState({
                    departures: allDepartures,
                    filtered: filterDepartures(filters)(allDepartures)
                });
            })
            .catch(err => this.showError(`Departure fetching failed: ${err.message}!`));
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
            updatedFilters = (multipleToggled || !currentToggled) ? [type] : allVehicleTypes.slice(0);
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
     * Search coordinates for given address/poi/etc.
     * @param {string} address
     */
    searchForAddress(address) {
       searchAddress(address)
        .then((result) => {
            const { location, label } = result;
            this.setState({ addressSearchTerm: label, location: location });
            this.fetchDeparturesToState(location);
        })
        .catch(err => this.showError(`Address search failed: ${err.message}!`));
    }

    /**
     * Adds error to the state
     * @param {string} error Error message
     */
    showError(error) {
        this.setState({ error });
    }

    /**
     * Hides the error message
     * @param {string} error Error message
     */
    hideError() {
        this.showError(null);
    }

    /**
     * Renders App
     * @returns {string} markup
     */
    render() {
        const { filtered, filters, error, addressSearchTerm } = this.state;

        return (
            <div className="content">
                <header>
                    <h2>{`Nearest Departures ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}</h2>
                </header>

                <main>
                    <ErrorMessage message={error} onClick={this.hideError.bind(this)} />
                    <AddressSearch
                        address={addressSearchTerm}
                        onSearch={this.searchForAddress.bind(this)} />
                    <DepartureFilter
                        filters={allVehicleTypes}
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
