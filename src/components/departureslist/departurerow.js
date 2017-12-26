import { linkEvent } from 'inferno';
import Time from './time';
import RouteIdentifier from './routeidentifier';
import Distance from './distance';
import Icon from '../icon/icon';
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
  <li class="departures-list-row-container">
    <div
      class="departures-list-row"
      onClick={linkEvent(id, onRowToggle)}
      onKeyPress={keyPressHandler(onRowToggle, id)}
      tabIndex={0}
      aria-expanded={!!isToggled}
      aria-controls={`departure-${id}`}
    >
      <div class={`time${realtime ? ' realtime' : ''}`}><Time time={realtimeDeparture} /></div>
      <div class="routename">
        <a href={routeUrl} target="_blank" rel="noopener">
          <RouteIdentifier vehicleType={vehicleType} routeName={routeName} />
        </a>
      </div>
      <div class="destination">{destination}</div>
      <div class="distance"><Distance distance={distance} /></div>
    </div>
    <div
      id={`departure-${id}`}
      class={`departures-list-row-additional-info${isToggled ? ' visible' : ''}`}
      aria-hidden={!isToggled}
    >
      <div class="departures-list-row-additional-info-content">
        <div class="departure-additional-info-content-block">
          <Icon type="clock" />
          <div>
            {realtime && <div class={`title${realtime ? ' realtime' : ''}`}>
              <Time time={realtimeDeparture} actualTime={true} /> (arvioitu)
            </div>}
            <div className="scheduled-departure">
              <Time time={scheduledDeparture} actualTime={true} /> (aikataulu)
            </div>
          </div>
        </div>
        <div class="departure-additional-info-content-block">
          <Icon type="bus-stop" />
          <a href={stopUrl} target="_blank" rel="noopener">
            <div class="departure-stop-name title">{stopName}</div>
            <span class="departure-stop-code">{stopCode}</span>
            <span className="departure-stop-description">{stopDescription}</span>
          </a>
        </div>
      </div>
    </div>
  </li>

export default DepartureRow;
