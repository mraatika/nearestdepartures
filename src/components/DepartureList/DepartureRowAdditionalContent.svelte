<script lang="ts">
  import XCircle from '~icons/lucide/x-circle';
  import Clock from '~icons/lucide/clock';
  import Flag from '~icons/lucide/flag';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { quartOut } from 'svelte/easing';
  import ExternalLink from '@/components/ExternalLink.svelte';
  import type { Departure, Disruption } from '@/types';
  import { requestFocus } from '@/util/dom.utils';
  import DisruptionInfo from './DisruptionInfo.svelte';
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
      // when this row is removed from dom the focus is transferred to body
      // and we want to focus the element that was previously focused
      // if a new row is toggeled we don't want the focus to jump to the
      // previous row's toggle element
      if (document.activeElement === document.body) {
        requestFocus(prevFocus as HTMLElement);
      }
    };
  });
</script>

<div
  bind:this="{container}"
  transition:slide="{{ easing: quartOut }}"
  tabIndex="0"
  class="space-xs flex-row flex-wrap line-height-xl position-relative"
  data-testId="departure-additional-content"
>
  <section class="flex-row flex-align-center space-m space-keep-r">
    <span class="space-s space-keep-r">
      <Clock />
    </span>

    <div class="space-xs space-keep-b no-wrap">
      {#if departure.realtime}
        <div class="bold color-light-green" data-testId="departure-realtime">
          {`${toTimeString(
            new Date(departure.realtimeDeparture * 1000),
          )} (arvioitu)`}
        </div>
      {/if}

      <div data-testId="departure-scheduledtime">
        {`${toTimeString(
          new Date(departure.scheduledDeparture * 1000),
        )} (aikataulu)`}
      </div>
    </div>
  </section>

  <section class="flex-row flex-align-center no-wrap">
    <span class="space-s space-keep-r">
      <Flag />
    </span>

    <div class="space-xs space-keep-b" data-testId="departure-stop">
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
  </section>

  <button
    on:click="{() => onRowToggle(departure.id)}"
    class="close-button"
    aria-label="Sulje"
  >
    <XCircle style="font-size: 20px;" />
  </button>

  {#if disruptions.length}
    <DisruptionInfo disruptions="{disruptions}" />
  {/if}
</div>

<style>
  .close-button {
    position: absolute;
    top: 8px;
    right: 0;
  }
</style>
