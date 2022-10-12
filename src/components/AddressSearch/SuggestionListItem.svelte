<script lang="ts">
  import type { Address } from '@/types';
  export let suggestion: Address;
  export let selected = false;
</script>

<li
  on:click
  class="suggestions-list-item bg-white border-thin-light space-xs pointer"
  tabindex="-1"
  role="option"
  aria-selected="{selected}"
>
  <div class="space-xs space-clear-tb">
    <div class="suggestion-name space-xxs space-keep-b">{suggestion.label}</div>
    <div class="suggestion-locality color-gray">{suggestion.localadmin}</div>
  </div>
</li>

<style>
  li:hover {
    background: var(--color-blue-light);
    color: var(--color-white);
  }

  li[aria-selected='true'] {
    background: var(--color-blue-light);
    color: var(--color-white);
  }

  li:hover .suggestion-locality,
  li[aria-selected='true'] .suggestion-locality {
    color: var(--color-gray-ligth);
  }
</style>
