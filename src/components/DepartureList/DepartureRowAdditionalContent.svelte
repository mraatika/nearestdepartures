<script lang="ts">
  import { XCircle, Clock, Flag } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import ExternalLink from '@/components/ExternalLink.svelte';
  import type { Departure, Disruption } from '@/types';
  import { requestFocus } from '@/util/dom.utils';
  import DisruptionInfo from './DisruptionInfo.svelte';
  import Time from './Time.svelte';
  import { toTimeString } from '@/util';

  export let departure: Departure;
  export let disruptions: Disruption[] = [];
  export let onRowToggle: (id: string) => void;

  let prevFocus: Element | null;
  let container: HTMLDivElement;

  onMount(() => {
    prevFocus = document.activeElement;
    requestFocus(container);
    return () => {
      requestFocus(prevFocus as HTMLElement);
    };
  });
</script>

<div bind:this="{container}" tabIndex="0">
  <div
    class="space-xs space-clear-r flex-row flex-wrap line-height-l position-relative"
  >
    <div class="flex-row flex-align-center space-m space-keep-r">
      <span class="space-s space-keep-r">
        <Clock />
      </span>

      <div class="space-xs space-keep-b no-wrap">
        {#if departure.realtime}
          <div class="bold color-light-green">
            {`${toTimeString(
              new Date(departure.realtimeDeparture * 1000),
            )} (arvioitu)`}
          </div>
        {/if}

        <div>
          {`${toTimeString(
            new Date(departure.scheduledDeparture * 1000),
          )} (arvioitu)`}
        </div>
      </div>
    </div>

    <div class="flex-row flex-align-center no-wrap">
      <span class="space-s space-keep-r">
        <Flag />
      </span>

      <div class="space-xs space-keep-b">
        <ExternalLink class="bold underline block" href="{departure.stopUrl}">
          {departure.stopName}
        </ExternalLink>

        <span
          class="text-s color-gray-dark space-xxs space-clear-tb corner-rounded border-thin-light vertical-top"
        >
          {departure.stopCode}
        </span>

        <span class="space-xs space-keep-l">{departure.stopDescription}</span>
      </div>
    </div>

    <button
      on:click="{() => onRowToggle(departure.id)}"
      class="close-button"
      aria-label="Sulje"
    >
      <XCircle />
    </button>

    {#if disruptions.length}
      <DisruptionInfo disruptions="{disruptions}" />
    {/if}
  </div>
</div>

<style>
  .close-button {
    position: absolute;
    top: 8px;
    right: 0;
  }
</style>