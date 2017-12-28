import Component from 'inferno-component';
import DeparturesList from '../departureslist/departureslist';
import DepartureFilter from '../departurefilter/departurefilter';
import ErrorMessage from '../errormessage/errormessage';
import AddressSearch from '../addresssearch';
import { DEFAULT_RANGE, BATCH_INTERVAL } from '../../constants/constants';
import * as model from './model';
import Header from '../header/header';
import Footer from '../footer/footer';
import AccuracyIndicator from '../accuracyindicator/accuracyindicator';
import './app.css';

/**
 * Default app state
 * @type {Object}
 */
const DEFAULT_STATE = {
  loading: true,
  address: undefined,
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
    this.state = { ...DEFAULT_STATE };
  }

  /**
   * Find location and fetch departures when component has mounted
   */
  componentDidMount() {
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
   * Remove address from the state
   */
  clearAddress() {
    this.setState({ address: undefined });
  }

  /**
   * Search coordinates for given address/poi/etc.
   * @param {string} [address]
   */
  searchForDepartures(address) {
    this.setState({ address, loading: true, error: undefined });

    model.findDepartures(this.state, address.location)
      .then(this.setState.bind(this))
      .catch(this.onError.bind(this));
  }

  /**
   * Adds error to the state and clears departures
   * @param {string} error Error message
   */
  onError(error) {
    process.env.NODE_ENV !== 'production' && console.error(error);
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
    const { filtered, filters, error, address, loading, departureUpdateTime } = this.state;

    return (
      <div class="app-content">
        <Header
          address={address}
          selectLocation={this.searchForDepartures.bind(this)}
        />

        <main>
          {error && <ErrorMessage message={error.message} onClick={this.hideError.bind(this)} />}

          <AddressSearch
            address={address}
            onSearch={this.searchForDepartures.bind(this)}
            onError={this.onError.bind(this)}
            clearAddress={this.clearAddress.bind(this)}
          />

          {address && address.location && <AccuracyIndicator accuracy={address.location.accuracy} />}

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
