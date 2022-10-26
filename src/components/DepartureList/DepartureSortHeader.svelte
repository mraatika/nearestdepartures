<script lang="ts">
  import type { SortPropName } from './types';

  export let propName: SortPropName;
  export let active = false;
  export let text = '';
  export let sortDir = -1;
  export let onClick: (propName: SortPropName) => void;
</script>

<div
  role="columnheader"
  aria-sort="{sortDir === -1 ? 'descending' : 'ascending'}"
  class="{`header bg-white ${propName}`}"
  class:active
>
  <button
    on:click="{() => onClick(propName)}"
    class="space-xxs space-keep-b bold"
  >
    {text}
  </button>
</div>

<style>
  .active button {
    border-bottom: 2px solid var(--color-bus);
  }

  .header:last-child {
    flex: 1;
    text-align: right;
  }
</style>
