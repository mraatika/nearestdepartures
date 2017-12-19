import { linkEvent } from 'inferno';
import Time from './time';
import RouteIdentifier from './routeidentifier';
import Distance from './distance';
import { keyPressHandler } from '../../utils/utils';

/**
* Displays a single departure in the departures table
* @constructs DepartureRow
* @param {Object} props
* @param {boolean} props.isToggled
* @param {function} props.onRowClick
* @param {string} props.id
* @param {boolean} props.realtime
* @param {number} props.realtimeDeparture
* @param {string} props.routeName
* @param {number} props.distance
* @param {string} props.destination
* @param {string} props.vehicleType
* @returns {DepartureRow}
*/
const DepartureRow = ({
  isToggled,
  onRowToggle,
  id,
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
}) =>
  <li
    class="departures-list-row-container"
    aria-expanded={!!isToggled}
  >
    <div
      class="departures-list-row"
      role="presentation"
      onClick={linkEvent(id, onRowToggle)}
      onKeyPress={keyPressHandler(onRowToggle, id)}
      tabIndex={0}
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
      class={`departures-list-row-additional-info${isToggled ? ' visible' : ''}`}
      aria-hidden={!isToggled}
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

export default DepartureRow;
