<script lang="ts">
  import { toTimeString } from '@/util';

  export let time: number;
  export let now: number;
  export let isRealtime = false;
  export let relative = false;

  // explicitly type the reactive statement or eslint will think this is any
  let departureDateTime: Date;
  $: departureDateTime = new Date(time * 1000);
  $: timeLeftInMins = Math.floor(
    (departureDateTime.getTime() - now) / 1000 / 60,
  );

  function formatTime(timeLeftInMins: number) {
    if (timeLeftInMins < 1) {
      return 'Nyt';
    }

    if (timeLeftInMins >= 10) {
      return toTimeString(departureDateTime);
    }

    return `${timeLeftInMins} min`;
  }
</script>

<span class="{$$restProps.class}" class:color-light-green="{isRealtime}">
  {#if relative}
    <span class:bold="{timeLeftInMins < 1}">{formatTime(timeLeftInMins)}</span>
  {:else}
    <span>{toTimeString(departureDateTime)}</span>
  {/if}
</span>
