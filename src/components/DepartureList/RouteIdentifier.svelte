<script lang="ts">
  import VehicleIcon from '@/components/VehicleIcon.svelte';
  import { VEHICLE_TYPE_TRANSLATIONS } from '@/constants';
  import type { VEHICLE_TYPE } from '@/enums';

  export let routeName: string;
  export let vehicleType: VEHICLE_TYPE;
</script>

<div class="{vehicleType.toLowerCase()} flex flex-row flex-align-center">
  <VehicleIcon
    icon="{vehicleType.toLowerCase()}"
    alt="{VEHICLE_TYPE_TRANSLATIONS[vehicleType]}"
  />
  <div class="space-xxs space-keep-l color-black">{routeName}</div>
</div>
