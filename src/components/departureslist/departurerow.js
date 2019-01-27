import { linkEvent, forwardRef } from 'inferno';
import Time from '../time';
import DisruptionAlert from './disruptionalert';
import RouteIdentifier from './routeidentifier';
import Distance from './distance';
import Icon from '../icon/icon';
import ExternalLink from '../externallink';
import { keyPressHandler, okKeyPressHandler, requestFocus } from '../../utils/utils';

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
* @param {object[]} props.disruptions
* @returns {DepartureRow}
*/
export default ({
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
  disruptions = [],
}) =>
  <li class="departures-list-row-container">
    <div
      class="departures-list-row"
      onClick={linkEvent(id, onRowToggle)}
      onKeyUp={okKeyPressHandler(onRowToggle, id)}
      tabIndex={0}
      aria-expanded={!!isToggled}
      aria-controls={`departure-${id}`}
    >
      <div class={`time${realtime ? ' realtime' : ''}`}>
        <Time time={realtimeDeparture} />
      </div>

      <div class="routename">
        <ExternalLink href={routeUrl}>
          <RouteIdentifier vehicleType={vehicleType} routeName={routeName} />
        </ExternalLink>
      </div>

      <div class="destination">
        {!!(disruptions.length) &&
          <span
            title="Linjalla häiriöitä: Klikkaa nähdäksesi lisätietoja"
            class="alert alert-icon"
          >
            <span class="sr-only">Huomio: Linjalla häiriöitä</span>
            <span aria-hidden="true">⚠</span>
          </span>}
        {destination}
      </div>

      <div class="distance">
        <Distance distance={distance} />
      </div>
    </div>

    {isToggled &&
      <DepartureRowAdditionalContent
        ref={content => content && requestFocus(content)}
        {...{
          id,
          realtime,
          realtimeDeparture,
          scheduledDeparture,
          stopUrl,
          stopName,
          stopCode,
          stopDescription,
          disruptions,
          onRowToggle,
        }}
      />}
  </li>;

/**
 * Additional content component
 * @private
 * @constructs DepartureRowAdditionalContent
 * @param {object} props
 */
const DepartureRowAdditionalContent = forwardRef(({
  id,
  realtime,
  realtimeDeparture,
  scheduledDeparture,
  stopUrl,
  stopName,
  stopCode,
  stopDescription,
  disruptions,
  onRowToggle,
}, ref) =>
  <section
    id={`departure-${id}`}
    class="departures-list-row-additional-info"
    tabIndex="0"
    ref={ref}
    onKeyUp={keyPressHandler([27], onRowToggle, id)}
  >
    <div class="departures-list-row-additional-info-content">
      <div class="departure-additional-info-content-block">
        <Icon type="clock" />
        <div>
          {realtime && <div class="realtime bold " title="Arvioitu reaaliaikainen lähtöaika pysäkiltä">
            <Time time={realtimeDeparture} actualTime={true} /> (arvioitu)
          </div>}
          <div class="scheduled-departure" title="Aikataulun mukainen lähtöaika pysäkiltä">
            <Time time={scheduledDeparture} actualTime={true} /> (aikataulu)
          </div>
        </div>
      </div>
      <div class="departure-additional-info-content-block">
        <Icon type="bus-stop" />
        <div>
          <ExternalLink
            class="bold departure-stop-name"
            href={stopUrl}
            title="Näytä pysäkin tiedot Reittioppaassa"
            text={stopName}
          />
          <div>
            <div class="departure-stop-code">{stopCode}</div>
            <span class="departure-stop-description">{stopDescription}</span>
          </div>
        </div>
      </div>
      {!!disruptions.length && <DisruptionAlert disruptions={disruptions} />}
    </div>

    <button
      class="departures-list-row-additional-info-close text-only-button sr-only sr-only-focusable"
      onClick={linkEvent(id, onRowToggle)}>
        Sulje
    </button>
  </section>
);
