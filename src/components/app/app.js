import { Component } from 'inferno';
import DeparturesList from '../departureslist/departureslist';
import DepartureFilter from '../departurefilter/departurefilter';
import ErrorMessage from '../errormessage/errormessage';
import AddressSearch from '../addresssearch';
import { DEFAULT_RANGE, BATCH_INTERVAL } from '../../constants/constants';
import * as model from './model';
import { getFilter, saveFilter } from '../../services/storageservice';
import Header from '../header/header';
import Footer from '../footer/footer';
import AccuracyIndicator from '../accuracyindicator';
import { delay, okKeyPressHandler, requestFocus } from '../../utils/utils';
import { PositionError } from '../../utils/errors';
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
    range: getFilter('range') || DEFAULT_RANGE,
    vehicleTypes: getFilter('vehicleTypes') || model.allVehicleTypes,
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

    this.searchForDepartures = this.searchForDepartures.bind(this);
    this.hideError = this.hideError.bind(this);
    this.searchForDepartures = this.searchForDepartures.bind(this);
    this.onError = this.onError.bind(this);
    this.onFilterToggle = this.onFilterToggle.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.clearAddress = this.clearAddress.bind(this);
  }

  /**
   * Find location and fetch departures when component has mounted
   */
  componentDidMount() {
    // batch departures in every x seconds
    setInterval(() => this.batchDeparturesToState(), BATCH_INTERVAL);
    // defer fetch so that the departure fetches are initiated first
    delay(() =>
      model.fetchDisruptionsToState(this.state)
        .then(this.setState.bind(this))
    );
  }

  /**
   * Batch departures and add them to state. Apply filters and also set filtered result to state.
   */
  batchDeparturesToState() {
    model.batchDeparturesToState(this.state)
      .then(this.setState.bind(this))
      .catch(this.onError.bind(this));
  }

  /**
   * Update vehicle filters
   * @param {string} type
   * @param {boolean} multiselect
   */
  onFilterToggle(type, multiselect) {
    const filters = model.updateVehicleFilters(type, multiselect, this.state);
    saveFilter('vehicleTypes', filters.vehicleTypes);
    this.onFilterChange(filters);
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
   * Move focus to the first item in the departures list
   */
  scrollToDepartures() {
    const firstListItem = document.getElementsByClassName('departures-list-row')[0];
    firstListItem && requestFocus(firstListItem);
  }

  /**
   * Move focus to the search box
   */
  scrollToSearch() {
    const searchBox = document.getElementById('address-search-textbox');
    requestFocus(searchBox);
  }

  /**
   * Renders App
   * @returns {string} markup
   */
  render() {
    const { filtered, filters, error, address, loading, departureUpdateTime, disruptions } = this.state;
    const accuracy = address && address.location && address.location.accuracy;
    const isPositionError = error && error instanceof PositionError;

    return (
      <div class="app-content flex-column">
        <div class="space-m space-keep-b">
          <Header
            address={address}
            selectLocation={this.searchForDepartures}
          />
        </div>

        <main class="flex-full full-width centering-margin max-content-width space-xs space-clear-t">
          {error && !isPositionError &&
            <div class="space-s space-keep-b">
              <ErrorMessage
                error={error}
                onClick={this.hideError}
                onComponentDidMount={requestFocus}
              />
            </div>}

          <AddressSearch
            address={address}
            onSearch={this.searchForDepartures}
            onError={this.onError}
            clearAddress={this.clearAddress}
          />

          <button
            class="skip-to-list sr-only sr-only-focusable"
            onkeyup={okKeyPressHandler(this.scrollToDepartures)}>
            Siirry hakutuloksiin
          </button>

          <div role="status" aria-live="polite" class="space-xs space-keep-t">
            {(accuracy || isPositionError) &&
              <AccuracyIndicator accuracy={accuracy} error={isPositionError && error} />}
          </div>

          <DepartureFilter
            filters={model.allVehicleTypes}
            activeFilters={filters.vehicleTypes}
            range={filters.range}
            onFilterToggle={this.onFilterToggle}
            onRangeChange={this.onRangeChange} />

          <DeparturesList
            isLoading={loading}
            departures={filtered}
            disruptions={disruptions} />

          <button
            class="back-to-search sr-only sr-only-focusable"
            onkeyup={okKeyPressHandler(this.scrollToSearch)}>
            Takaisin hakuun
          </button>
        </main>

        <Footer departureUpdateTime={departureUpdateTime} />
      </div>
    );
  }
}

export default App;
