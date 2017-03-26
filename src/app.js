import Inferno from 'inferno';
import Component from 'inferno-component';
import DeparturesList from './departureslist/departureslist';
import fetchDepartures from './services/departuresservice';
import findGPSLocation from './services/locationservice';
import sortDepartures from './utils/departuresorter';
import './app.css';

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
            sortDir: -1,
        };
    }

    /**
     * Fetches departures when componen has mounted
     */
    componentDidMount() {
        // find location
        findGPSLocation()
            // finde departures based on location
            .then(fetchDepartures)
            .then(departures => this.sortDeparturesToState('time', departures))
            .catch(err => console.error(err));
    }

    /**
     * Sorts departures by prop and set to state
     * @param {string} propName Name of the prop to sort by
     * @param {Object[]} [list] List of departures to sort, defaults to state.departures
     */
    sortDeparturesToState(propName, list) {
        // if sorted with same prop as before then switch sort mode asc <--> desc
        const sortDir = this.state.sortProp === propName ? this.state.sortDir * -1 : 1;
        let sorted = sortDepartures(propName)(list || this.state.departures);
        // if sort dir is descending then reverse the array
        if (sortDir === -1) sorted.reverse();
        this.setState({ departures: sorted, sortProp: propName, sortDir });
    }

    /**
     * Renders App
     */
    render() {
        return (
            <div className="app">
                <div className="app-header text-center">
                    <h2>{`Nearest Departures ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}</h2>
                </div>

                <p className="App-intro">
                    <DeparturesList departures={this.state.departures} sort={this.sortDeparturesToState.bind(this)}/>
                </p>
            </div>
        );
    }
}

export default App;
