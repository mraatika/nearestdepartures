<script lang="ts">
  import VehicleIcon from '@/components/VehicleIcon.svelte';
  import type { VEHICLE_TYPE } from '@/enums';

  export let routeName: string;
  export let vehicleType: VEHICLE_TYPE;
  export let alt: string;
</script>

<span class="{vehicleType.toLowerCase()}">
  <VehicleIcon icon="{vehicleType.toLowerCase()}" alt="{alt}" />
  <span class="{`space-xxs space-keep-l color-${vehicleType.toLowerCase()}`}"
    >{routeName}</span
  >
</span>
