<script lang="ts">
  import type { Address } from '@/types';
  import SuggestionListitem from './SuggestionListItem.svelte';
  export let selected: Address | undefined;
  export let onSelected: (suggestion: Address) => void;
  export let suggestions: Address[] = [];
</script>

<ol
  id="suggestions-list"
  class="full-width position-absolute space-clear-l"
  role="listbox"
  aria-label="Osoite"
  class:hidden="{!suggestions.length}"
>
  {#each suggestions as suggestion (suggestion.id)}
    <SuggestionListitem
      on:click="{() => onSelected(suggestion)}"
      suggestion="{suggestion}"
      selected="{selected && selected.id === suggestion.id}"
    />
  {/each}
</ol>

<style>
  ol {
    top: 0;
    left: 0;
    box-shadow: 0 6px 24px -4px #ccc;
    z-index: 1;
  }
</style>
