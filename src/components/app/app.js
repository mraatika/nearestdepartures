import Component from 'inferno-component';
import DeparturesList from '../departureslist/departureslist';
import DepartureFilter from '../departurefilter/departurefilter';
import ErrorMessage from '../errormessage/errormessage';
import AddressSearch from '../addresssearch/addresssearch';
import { DEFAULT_RANGE, BATCH_INTERVAL } from '../../constants/constants';
import * as model from './model';
import Header from '../header/header';
import Footer from '../footer/footer';
import AccuracyIndicator from '../common/accuracyindicator';
import './app.css';

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
    vehicleTypes: model.allVehicleTypes,
  }
};

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
    this.searchForDepartures(this.state);
    // batch departures in every x seconds
    setInterval(() => this.batchDeparturesToState(), BATCH_INTERVAL);
  }

  /**
   * Batch departures and add them to state. Apply filters and also set filtered result to state.
   */
  batchDeparturesToState() {
    model.batchDeparturesToState(this.state)
      .then(this.setState.bind(this))
      .catch(this.onError.bind(this));
  }

  onFilterToggle(type, multiselect) {
    this.onFilterChange(model.updateVehicleFilters(type, multiselect, this.state));
  }

  /**
   * Callback for range filter change
   * @param {number} range
   */
  onRangeChange(range) {
    this.onFilterChange({ ...this.state.filters, range });
  }

  /**
   * Filter departures and set them and updated filters to the state
   * @param {object} filters
   */
  onFilterChange(filters) {
    this.setState({ filters, filtered: model.filterDepartures(filters, this.state.departures) });
  }

  /**
   * Search coordinates for given address/poi/etc.
   * @param {string} [address]
   */
  searchForDepartures({ searchTerm = '', location }) {
    this.setState({ location: undefined, loading: true, addressSearchTerm: searchTerm });

    model.findDepartures(this.state, searchTerm, location)
      .then(this.setState.bind(this))
      .catch(this.onError.bind(this))
  }

  /**
   * Empty the address search bar
   */
  clearAddressSearchTerm() {
    this.setState({ addressSearchTerm: '' });
  }

  /**
   * Adds error to the state and clears departures
   * @param {string} error Error message
   */
  onError(error) {
    console.error(error);
    this.setState({ error, loading: false, departures: [], filtered: [] });
  }

  /**
   * Hides the error message
   * @param {string} error Error message
   */
  hideError() {
    this.setState({ error: undefined });
  }

  /**
   * Renders App
   * @returns {string} markup
   */
  render() {
    const { filtered, filters, error, location, addressSearchTerm, loading, departureUpdateTime } = this.state;

    return (
      <div class="app-content">
        <Header />

        <main>
          {error && <ErrorMessage message={error.message} onClick={this.hideError.bind(this)} />}

          <AddressSearch
            address={addressSearchTerm}
            onSearch={this.searchForDepartures.bind(this)}
            clearAddressSearchTerm={this.clearAddressSearchTerm.bind(this)} />

          {location && <AccuracyIndicator accuracy={location.accuracy} />}

          <DepartureFilter
            filters={model.allVehicleTypes}
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
