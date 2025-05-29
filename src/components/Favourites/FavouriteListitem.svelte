<script lang="ts">
  import Trash from '~icons/lucide/trash-2';
  import type { Favourite } from '@/types';

  export let favourite: Favourite;
  export let removeFavourite: () => void;
  export let isSelected: boolean;
</script>

<li class="flex-row flex-align-center space-s space-clear-rl">
  <button on:click class="align-left flex-full">
    {#if isSelected}
      <span class="text-l bold">
        <span role="img" aria-label="Valittu">&#9679</span>
      </span>
    {/if}

    {favourite.label}
  </button>

  <div class="space-xs space-keep-l">
    <button
      on:click="{removeFavourite}"
      aria-label="Poista suosikeista"
      data-testId="favorite-remove-button"
    >
      <Trash aria-hidden="true" />
    </button>
  </div>
</li>

<style>
  li {
    border-bottom: 1px solid var(--color-gray-light);
  }
</style>
