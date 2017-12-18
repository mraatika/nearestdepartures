import Component from 'inferno-component';
import Time from './time';
import RouteIdentifier from './routeidentifier';
import Distance from './distance';

/**
* Displays a single departure in the departures table
* @constructs DepartureRow
* @param {Object} props
* @param {boolean} props.realtime
* @param {number} props.realtimeDeparture
* @param {string} props.routeName
* @param {number} props.distance
* @param {string} props.destination
* @param {string} props.vehicleType
* @returns {DepartureRow}
*/
class DepartureRow extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggled: false };
    this.toggleContent = this.toggleContent.bind(this);
  }

  toggleContent() {
    this.setState({ isToggled: !this.state.isToggled });
  }

  render() {
    const {
      realtime,
      realtimeDeparture,
      routeName,
      distance,
      destination,
      vehicleType,
      routeUrl,
      stopName,
      stopCode,
      stopUrl,
      stopDescription,
      scheduledDeparture,
    } = this.props;

    return (
      <li
        class="departures-list-row-container"
        aria-expanded={!!this.state.isToggled}
      >
        <div
          class="departures-list-row"
          role="presentation"
          onClick={this.toggleContent}
        >
          <div class={`time${realtime ? ' realtime' : ''}`}>
            <Time time={realtimeDeparture} />
          </div>
          <div class="routename">
            <a href={routeUrl} target="_blank" rel="noopener">
              <RouteIdentifier vehicleType={vehicleType} routeName={routeName} />
            </a>
          </div>
          <div class="destination">{destination}</div>
          <div class="distance">
            <Distance distance={distance} />
          </div>
        </div>
        <div
          class={`departures-list-row-additional-info${this.state.isToggled ? ' visible' : ''}`}
          aria-hidden={!this.state.isToggled}
        >
          <div class="departures-list-row-additional-info-content">
            <div>
              <div class="title">Aikataulun mukainen lähtöaika:</div>
              <Time time={scheduledDeparture} actualTime={true} />
            </div>
            <div>
              <div class="title">Pysäkki:</div>
              <a href={stopUrl} target="_blank" rel="noopener">
                <h4>{stopName}</h4>
                <span class="departure-stop-code">{stopCode}</span>{stopDescription}
              </a>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default DepartureRow;
