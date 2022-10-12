<script lang="ts">
  import RangeFilter from './RangeFilter.svelte';
  import { filtersStore } from '@/stores';
  import * as R from 'ramda';
  import VehicleFilterButton from './VehicleFilterButton.svelte';
  import { VEHICLE_TYPE } from '@/enums';

  function onRangeChange(e: Event) {
    const value = +(e.currentTarget as HTMLInputElement).value;
    filtersStore.update(R.assoc('range', value));
  }

  function onVehicleFilterChange(type: VEHICLE_TYPE) {
    filtersStore.update((values) => {
      return R.assoc(
        'vehicleTypes',
        R.symmetricDifference(values.vehicleTypes, [type]),
        values,
      );
    });
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
