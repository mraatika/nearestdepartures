<script lang="ts">
  import * as R from 'ramda';
  import { VEHICLE_TYPE } from '@/enums';
  import { filtersStore, rangeStore, vechicleFilterStore } from '@/stores';
  import RangeFilter from './RangeFilter.svelte';
  import VehicleFilterButton from './VehicleFilterButton.svelte';

  function onRangeChange(e: Event) {
    const value = +(e.currentTarget as HTMLInputElement).value;
    rangeStore.set(value);
  }

  function onVehicleFilterChange(type: VEHICLE_TYPE) {
    vechicleFilterStore.update(R.symmetricDifference([type]));
  }
</script>

<div class="space-m space-clear-rl">
  <RangeFilter on:input="{onRangeChange}" range="{$filtersStore.range}" />
</div>

<div class="vehicle-type-filters flex-row">
  {#each Object.values(VEHICLE_TYPE) as type}
    <VehicleFilterButton
      on:click="{() => onVehicleFilterChange(type)}"
      vehicleType="{type}"
      isToggled="{$filtersStore.vehicleTypes.includes(type)}"
    />
  {/each}
</div>
