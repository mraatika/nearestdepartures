import Inferno from 'inferno';
import Component from 'inferno-component';
import createDeparturesList from './departureslist/departureslist';
import fetchDepartures from './services/departuresservice';
import './app.css';

const DeparturesList = createDeparturesList(Inferno);

class App extends Component {
    componentDidMount() {
        fetchDepartures()
            .then(departures => this.setState({ departures }))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="app">
                <div className="app-header text-center">
                    <h2>{`Nearest Departures ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`}</h2>
                </div>

                <p className="App-intro">
                    <DeparturesList departures={this.state.departures} />
                </p>
            </div>
        );
    }
}

export default App;
