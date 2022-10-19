<script lang="ts">
  import type { VEHICLE_TYPE } from '@/enums';
  import VehicleIcon from '@/components/VehicleIcon.svelte';
  import { VEHICLE_TYPE_TRANSLATIONS } from '@/constants';

  export let vehicleType: VEHICLE_TYPE;
  export let isToggled: boolean;
</script>

<button
  on:click
  class="{`${vehicleType.toLowerCase()}`}"
  class:toggled="{isToggled}"
  aria-label="{`Suodatin ${VEHICLE_TYPE_TRANSLATIONS[vehicleType]}`}"
  aria-pressed="{!!isToggled}"
  data-testId="{`filter-${vehicleType.toLocaleLowerCase()}`}"
>
  <div
    class="{`space-xs space-clear-rl text-xl ${vehicleType.toLowerCase()} flex flex-row flex-align-center flex-justify-center`}"
  >
    <VehicleIcon
      alt=""
      icon="{`${vehicleType.toLocaleLowerCase()}-withoutBox`}"
      shadow="{isToggled}"
    />
  </div>
</button>

<style>
  button {
    flex: 1;
    color: var(--color-white);
    border-bottom: 4px solid var(--color-white);
    background-color: var(--color-white);
    color: var(--color-gray-light);
  }

  .toggled {
    color: var(--color-white);
  }

  .toggled.bus {
    background-color: var(--color-bus);
    border-bottom-color: #0065a7;
  }

  .toggled.tram {
    background-color: var(--color-tram);
    border-bottom-color: #006b42;
  }

  .toggled.rail {
    background-color: var(--color-rail);
    border-bottom-color: #71397c;
  }

  .toggled.subway {
    background-color: var(--color-subway);
    border-bottom-color: #d65417;
  }

  .toggled.ferry {
    background-color: var(--color-ferry);
    border-bottom-color: #0094b6;
  }
</style>
