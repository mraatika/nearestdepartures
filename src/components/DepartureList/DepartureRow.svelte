<script lang="ts">
  import AlertTriangle from '~icons/lucide/alert-triangle';
  import type { Departure, Disruption } from '@/types';
  import { okKeyPressHandler } from '@/util/dom.utils';
  import ExternalLink from '../ExternalLink.svelte';
  import * as model from './model';
  import RouteIdentifier from './RouteIdentifier.svelte';
  import DepartureRowAdditionalContent from './DepartureRowAdditionalContent.svelte';
  import Time from './Time.svelte';
  import { fly } from 'svelte/transition';

  export let departure: Departure;
  export let isToggled: boolean;
  export let disruptions: Disruption[];
  export let now: number;
  export let onRowToggle: (id: string) => void;
</script>

<div
  in:fly="{{ y: -10, duration: 500 }}"
  role="rowgroup"
  class="departure-row border-thin-light border-keep-b line-height-xxl"
  class:isToggled
>
  <div
    on:click="{() => onRowToggle(departure.id)}"
    on:keypress="{okKeyPressHandler(() => onRowToggle(departure.id))}"
    role="row"
    class="departure-row-button flex-row pointer"
    tabIndex="{0}"
    aria-expanded="{isToggled}"
    data-testId="departure-row"
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
      <ExternalLink
        href="{departure.routeUrl}"
        style="outline-offset: -2px;"
        showIcon="{false}"
      >
        <RouteIdentifier
          vehicleType="{departure.vehicleType}"
          routeName="{departure.routeName}"
        />
      </ExternalLink>
    </div>

    <div
      role="cell"
      class="destination flex-full position-relative vertical-bottom overflow-hidden no-wrap"
    >
      {#if disruptions?.length}
        <span class="color-alert" data-testId="disruption-icon">
          <AlertTriangle
            style="font-size: 12px;"
            aria-label="Linjalla häiriöitä: Avaa lähdön tiedot nähdäksesi lisätietoja"
          />
        </span>
      {/if}
      {departure.destination}
    </div>

    <div
      role="cell"
      class="distance align-right vertical-bottom space-xs space-keep-l"
    >
      {model.getDistanceinHumanReadableForm(departure.distance)}
    </div>
  </div>

  {#if isToggled}
    <div role="row">
      <div role="cell" aria-colspan="{4}">
        <DepartureRowAdditionalContent
          departure="{departure}"
          disruptions="{disruptions}"
          onRowToggle="{onRowToggle}"
        />
      </div>
    </div>
  {/if}
</div>

<style>
  .departure-row:last-child {
    border: 0;
  }

  .isToggled {
    border-left: 8px solid #ddd;
    padding-left: var(--space-xs);
  }
</style>
