import Component from 'inferno-component';
import fputils from './utils/fputils';
import { getNowInSeconds } from './utils/utils';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import DeparturesList from './components/departureslist/departureslist';
import DepartureFilter from './components/departurefilter/departurefilter';
import ErrorMessage from './components/common/errormessage';
import AddressSearch from './components/addresssearch/addresssearch';
import { fetchDepartures, batchDepartures } from './utils/departurefetchmerge';
import { findGPSLocation, stopLocating } from './services/locationservice';
import { lookupAddress, searchAddress } from './services/addresssearchservice';
import formatError, { POSITION_ERROR } from './utils/formaterror';
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
      .catch(err => this.onError(formatError(POSITION_ERROR, err)));
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
    const { filters } = this.state;
    const { vehicleTypes: current } = filters;
    const currentToggled = current.indexOf(type) > -1;

    const activeFilters = fputils.ifThenElse(
      () => !!multiselect,
      // if pressed with ctrl key
      fputils.ifThenElse(
        () => currentToggled,
        // remove filter from actives
        fputils.filter(f => f !== type),
        // add filter to actives
        fputils.concat(type),
      ),
      // if pressed without ctrl key
      fputils.ifThenElse(
        () => current.length > 1 || !currentToggled,
        // if filter is not toggled then select only that
        () => [type],
        // else select all filters
        () => allVehicleTypes.slice(0),
      )
    )(current);

    // update filter props on state and then filter departures
    this.setState(
      { filters: Object.assign({}, filters, { vehicleTypes: activeFilters }) },
      this.filterDeparturesToState.bind(this),
    );
  }

  /**
   * Callback for range filter change
   * @param {number} range
   */
  onRangeChange(range) {
    this.setState(
      { filters: Object.assign({}, this.state.filters, { range }) },
      this.filterDeparturesToState.bind(this),
    );
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
    this.setState({ loading: true, addressSearchTerm: searchTerm });

    // stop location search if still running
    stopLocating();

    fputils.ifThenElse(
      fputils.isTruthy,
      // if location is given then search departures by location
      this.fetchDeparturesToState.bind(this),
      fputils.ifThenElse(
        () => searchTerm && searchTerm.toLocaleLowerCase() !== LOCATION_MAGIC_WORD,
        // search address by search term
        () => {
          searchAddress(searchTerm)
            .then((result) => {
              const { location, label } = result[0];
              this.setState({ addressSearchTerm: label, location: location });
              this.fetchDeparturesToState(location);
            })
            .catch(err => this.onError(`Osoitteen haku epäonnistui: ${err.message}!`));
        },
        // if location and search term is empty then search by client location
        this.findDeparturesByCurrentLocation.bind(this),
      )
    )(location);
  }

  clearAddressSearchTerm() {
    this.setState({ addressSearchTerm: '' });
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
    this.setState({ error: null });
  }

  /**
   * Renders App
   * @returns {string} markup
   */
  render() {
    const { filtered, filters, error, addressSearchTerm, loading, departureUpdateTime } = this.state;

    return (
      <div class="app-content">
        <Header />

        <main>
          <ErrorMessage message={error} onClick={this.hideError.bind(this)} />

          <AddressSearch
            address={addressSearchTerm}
            onSearch={this.searchForAddress.bind(this)}
            clearAddressSearchTerm={this.clearAddressSearchTerm.bind(this)} />

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

        <Footer departureUpdateTime={departureUpdateTime} />
      </div>
    );
  }
}

export default App;
