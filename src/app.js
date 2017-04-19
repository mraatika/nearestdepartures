import Component from 'inferno-component';
import fputils from './utils/fputils';
import packageJSON from '../package.json';
import { getNowInSeconds, toTimeString } from './utils/utils';
import DeparturesList from './departureslist/departureslist';
import DepartureFilter from './departurefilter/departurefilter';
import ErrorMessage from './errormessage';
import VehicleIcon from './vehicleicon';
import AddressSearch from './addresssearch/addresssearch';
import { fetchDepartures, batchDepartures } from './utils/departurefetchmerge';
import { findGPSLocation, stopLocating } from './services/locationservice';
import { lookupAddress, searchAddress } from './services/addresssearchservice';
import formatError, { POSITION_ERROR } from './utils/formaterror';
import { VEHICLE_TYPE, LOCATION_MAGIC_WORD, DEFAULT_RANGE, BATCH_INTERVAL } from './constants/constants';
import './app.css';

/**
 * All possible filters
 */
const allVehicleTypes = fputils.values(VEHICLE_TYPE);

/**
 * Default app state
 * @type {Object}
 */
const DEFAULT_STATE = {
    loading: true,
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
const filterDepartures = filters => fputils.filter((d) => {
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
        this.findDeparturesByCurrentLocation();
        // batch departures in every x seconds
        setInterval(() => this.batchDeparturesToState(), BATCH_INTERVAL);
    }

    /**
     * Find location and then departures by location found
     */
    findDeparturesByCurrentLocation() {
        // find location
        findGPSLocation()
            .then((location) => {
                // do a reverse geocoding
                lookupAddress(location)
                    .then((address) => {
                        this.setState({ location, addressSearchTerm: address });
                        // and finally fetch all departures
                        this.fetchDeparturesToState(location);
                    })
                    .catch(err => {
                        this.onError(`Osoitteen haku epäonnistui: ${err.message}!`);
                    });
            })
            .catch(err =>  this.onError(formatError(POSITION_ERROR, err)));
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
            .then(this.afterDeparturesFetched.bind(this))
            .catch(err => {
                console.error(err);
                this.onError(`Lähtöjen haku epäonnistui: ${err.message}!`);
            });
    }

    /**
     * Batch departures and add them to state. Apply filters and also set filtered result to state.
     */
    batchDeparturesToState() {
        batchDepartures(this.state.departures)
            .then(this.afterDeparturesFetched.bind(this))
            .catch(err => console.error(err));
    }

    /**
     * Set state after departures has been fetched/batched
     * @param {Object[]} departures
     */
    afterDeparturesFetched(departures) {
        this.setState({
            loading: false,
            departures: departures,
            filtered: filterDepartures(this.state.filters)(departures),
            departureUpdateTime: new Date(),
        });
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
        const withoutCurrent = fputils.filter(f => f !== type);

        if (multiselect) {
            updatedFilters = currentToggled ? withoutCurrent(current) : [].concat(current, type);
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
     * @param {string} [address]
     */
    searchForAddress({ searchTerm = '', location = null }) {
        this.setState({ loading: true, addressSearchTerm: searchTerm });

        // stop location search if still running
        stopLocating();

        if (location) {
            this.fetchDeparturesToState(location);
        } else if (searchTerm && searchTerm.toLocaleLowerCase() !== LOCATION_MAGIC_WORD) {
            // if location is not provided then search address first
            searchAddress(searchTerm)
                .then((result) => {
                    const { location, label } = result[0];
                    this.setState({ addressSearchTerm: label, location: location });
                    this.fetchDeparturesToState(location);
                })
                .catch(err => this.onError(`Osoitteen haku epäonnistui: ${err.message}!`));
        } else {
            // if address is empty or equals magic locate string then do a search
            // using current location
            this.findDeparturesByCurrentLocation();
        }
    }

    /**
     * Adds error to the state and clears departures
     * @param {string} error Error message
     */
    onError(error) {
        this.setState({
            error,
            loading: false,
            departures: [],
            filtered: [],
        });
    }

    /**
     * Hides the error message
     * @param {string} error Error message
     */
    hideError() {
        this.setState({ error: null });
    }

    /**
     * Renders App
     * @returns {string} markup
     */
    render() {
        const { filtered, filters, error, addressSearchTerm, loading, departureUpdateTime } = this.state;

        return (
            <div class="app-content">
                <header>
                    <h1>
                        <VehicleIcon iconName="bus" />
                        <span class="app-name">julkisilla.info</span>
                    </h1>
                    <p class="description">löydä lähimmät julkisen liikenteen lähdöt helposti</p>
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
                    <DeparturesList
                        isLoading={loading}
                        departures={filtered} />
                </main>

                <footer>
                    <div class="footer-content">
                        <div class="pull-left">{`Lähdöt päivitetty ${departureUpdateTime ? toTimeString(departureUpdateTime) : '-'}`}</div>
                        <div class="pull-right">{`julkisilla v${packageJSON.version}`}</div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
