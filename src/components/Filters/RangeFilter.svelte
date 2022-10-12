<script lang="ts">
  import { MAX_RANGE, MIN_RANGE, RANGE_STEP } from '@/constants';

  export let range: number;
</script>

<div class="range-filter-wrapper">
  <div class="align-right space-xxs space-keep-b">
    <output for="departurefilter-range">{range}m</output>
  </div>

  <label for="departurefilter-range" class="sr-only"
    >Maksimietäisyys pysäkille
  </label>

  <input
    on:input
    bind:value="{range}"
    id="departurefilter-range"
    class="range-filter"
    type="range"
    name="range"
    min="{MIN_RANGE}"
    max="{MAX_RANGE}"
    step="{RANGE_STEP}"
  />
</div>

<style>
  .range-filter {
    display: block;
    width: 100%;
    border: 0;
    -webkit-appearance: none;
    background: transparent; /* Otherwise white in Chrome */
  }

  .range-filter::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    background: var(--color-ferry);
    border-radius: 4px;
  }

  .range-filter::-moz-range-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    background: var(--color-ferry);
    border-radius: 4px;
  }

  .range-filter::-ms-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    background: var(--color-ferry);
    color: transparent;
    margin: 12px 0;
    border: 0;
    border-radius: 4px;
  }

  .range-filter::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    border: 0;
    border-radius: 50%;
    background: var(--color-bus);
    cursor: pointer;
    margin-top: -7px;
  }

  .range-filter::-moz-range-thumb {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    border: 0;
    background: var(--color-bus);
    cursor: pointer;
    margin-top: 0;
  }

  .range-filter::-ms-thumb {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    border: 0;
    background: #007ac9;
    cursor: pointer;
    margin-top: 0;
  }
</style>
