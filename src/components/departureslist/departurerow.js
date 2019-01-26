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
  <li class="departures-list-row-container border-thin-light border-keep-b line-height-xxl">
    <div
      class="departures-list-row flex-row pointer"
      onClick={linkEvent(id, onRowToggle)}
      onKeyUp={okKeyPressHandler(onRowToggle, id)}
      tabIndex={0}
      aria-expanded={!!isToggled}
      aria-controls={`departure-${id}`}
    >
      <div class={`time${realtime ? ' color-light-green' : ''}`}>
        <Time time={realtimeDeparture} />
      </div>

      <div class="routename bold overflow-hidden no-wrap">
        <ExternalLink href={routeUrl}>
          <RouteIdentifier vehicleType={vehicleType} routeName={routeName} />
        </ExternalLink>
      </div>

      <div class="destination flex-full position-relative vertical-bottom overflow-hidden no-wrap">
        {!!(disruptions.length) &&
          <span
            title="Linjalla häiriöitä: Klikkaa nähdäksesi lisätietoja"
            class="color-alert alert-icon bold space-xs space-keep-r">
            <span class="sr-only">Huomio: Linjalla häiriöitä</span>
            <span aria-hidden="true">⚠</span>
          </span>}
        {destination}
      </div>

      <div class="distance color-gray-dark align-right vertical-bottom space-xs space-keep-l">
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
    class="departures-list-row-additional-info position-relative"
    tabIndex="0"
    ref={ref}
    onKeyUp={keyPressHandler([27], onRowToggle, id)}
  >
    <div class="space-xs space-clear-rl">
      <div class="space-xs space-clear-tb flex-row flex-wrap line-height-l">
        <div class="flex-row flex-align-center space-m space-keep-r">
          <span class="space-s space-keep-r">
            <Icon type="clock" />
          </span>
          <div class="space-xs space-keep-b no-wrap">
            {realtime && <div class="color-light-green bold" title="Arvioitu reaaliaikainen lähtöaika pysäkiltä">
              <Time time={realtimeDeparture} actualTime={true} /> (arvioitu)
            </div>}
            <div class="scheduled-departure" title="Aikataulun mukainen lähtöaika pysäkiltä">
              <Time time={scheduledDeparture} actualTime={true} /> (aikataulu)
            </div>
          </div>
        </div>

        <div class="flex-row flex-align-center no-wrap">
          <span class="space-s space-keep-r">
            <Icon type="bus-stop" />
          </span>
          <div class="space-xs space-keep-b">
            <ExternalLink
              class="bold departure-stop-name underline"
              href={stopUrl}
              title="Näytä pysäkin tiedot Reittioppaassa"
              text={stopName}
            />
            <div>
              <span class="departure-stop-code text-s color-gray-dark space-xxs space-clear-tb corner-rounded border-thin-light">
                {stopCode}
              </span>
              <span class="departure-stop-description space-xs space-keep-l">{stopDescription}</span>
            </div>
          </div>
        </div>
        {!!disruptions.length && <DisruptionAlert disruptions={disruptions} />}
      </div>
    </div>

    <button
      class="departures-list-row-additional-info-close text-only-button sr-only sr-only-focusable"
      onClick={linkEvent(id, onRowToggle)}>
        Sulje
    </button>
  </section>
);
