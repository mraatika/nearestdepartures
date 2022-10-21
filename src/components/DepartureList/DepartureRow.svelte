<script lang="ts">
  import AlertTriangle from '~icons/lucide/alert-triangle';
  import type { Departure, Disruption } from '@/types';
  import { okKeyPressHandler } from '@/util/dom.utils';
  import ExternalLink from '../ExternalLink.svelte';
  import * as model from './model';
  import RouteIdentifier from './RouteIdentifier.svelte';
  import DepartureRowAdditionalContent from './DepartureRowAdditionalContent.svelte';
  import Time from './Time.svelte';

  export let departure: Departure;
  export let isToggled: boolean;
  export let disruptions: Disruption[];
  export let now: number;
  export let onRowToggle: (id: string) => void;
</script>

<div
  role="rowgroup"
  class="departure-row border-thin-light border-keep-b line-height-xxl"
>
  <div
    on:click="{() => onRowToggle(departure.id)}"
    on:keypress="{okKeyPressHandler(() => onRowToggle(departure.id))}"
    role="row"
    class="departure-row-button flex-row pointer"
    tabIndex="{0}"
    aria-expanded="{isToggled}"
    aria-controls="{`departure-additional-info-${departure.id}`}"
  >
    <div role="cell" class="realtimeDeparture">
      <Time
        now="{now}"
        time="{departure.realtimeDeparture}"
        isRealtime="{departure.realtime}"
        relative="{true}"
      />
    </div>

    <div
      role="cell"
      class="routeName bold overflow-hidden no-wrap"
      data-testId="departure-route"
    >
      <ExternalLink href="{departure.routeUrl}" style="outline-offset: -2px;">
        <RouteIdentifier
          vehicleType="{departure.vehicleType}"
          routeName="{departure.routeName}"
          alt="{`Näytä linjan tiedot suuntaan ${departure.destination}`}"
        />
      </ExternalLink>
    </div>

    <div
      role="cell"
      class="destination flex-full position-relative vertical-bottom overflow-hidden no-wrap"
    >
      {#if disruptions?.length}
        <span class="color-alert">
          <AlertTriangle
            style="font-size: 12px;"
            aria-label="Linjalla häiriöitä: Avaa lähdön tiedot nähdäksesi lisätietoja"
            data-testId="disruption-icon"
          />
        </span>
      {/if}
      {departure.destination}
    </div>

    <div
      role="cell"
      class="distance color-gray-dark align-right vertical-bottom space-xs space-keep-l"
    >
      {model.getDistanceinHumanReadableForm(departure.distance)}
    </div>
  </div>

  <div role="row" id="{`departure-additional-info-${departure.id}`}">
    <div role="cell" aria-colspan="{4}">
      {#if isToggled}
        <DepartureRowAdditionalContent
          departure="{departure}"
          disruptions="{disruptions}"
          onRowToggle="{onRowToggle}"
        />
      {/if}
    </div>
  </div>
</div>

<style>
  .departure-row:last-child {
    border: 0;
  }
</style>
