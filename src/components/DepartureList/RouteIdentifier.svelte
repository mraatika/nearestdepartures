<script lang="ts">
  import VehicleIcon from '@/components/VehicleIcon.svelte';
  import type { VEHICLE_TYPE } from '@/enums';

  export let routeName: string;
  export let vehicleType: VEHICLE_TYPE;
  export let alt: string;
</script>

<div class="{vehicleType.toLowerCase()} flex flex-row flex-align-center">
  <VehicleIcon icon="{vehicleType.toLowerCase()}" alt="{alt}" />
  <div class="space-xxs space-keep-l color-black">{routeName}</div>
</div>
