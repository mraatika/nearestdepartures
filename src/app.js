import Component from 'inferno-component';
import filter from 'lodash/fp/filter';
import without from 'lodash/fp/without';
import DeparturesList from './departureslist/departureslist';
import DepartureFilter from './departurefilter/departurefilter';
import fetchDepartures from './services/departuresservice';
import findGPSLocation from './services/locationservice';
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
        this.state = { filters: allFilters, error: null };
    }

    /**
     * Fetches departures when componen has mounted
     */
    componentDidMount() {
        // find location
        findGPSLocation()
            // finde departures based on location
            .then(fetchDepartures, err => this.showError(`Location unavailable (${err})!`))
            .then(
                departures => this.setState({ initialDepartures: departures, departures }),
                err => this.showError(`Fetching depatures failed (${err})!`)
            );
    }

    /**
     * Adds error to the state
     * @param {string} error Error message
     */
    showError(error) {
        this.setState({ error });
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
        this.setState({ departures: filtered });
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
                    <DeparturesList departures={departures} />
                </main>
            </div>
        );
    }
}

export default App;
