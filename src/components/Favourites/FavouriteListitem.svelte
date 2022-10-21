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
        <span aria-hidden="true">&#9656</span>
        <span class="sr-only">Valittu</span>
      </span>
    {/if}

    {favourite.label}
  </button>

  <button
    on:click="{removeFavourite}"
    aria-label="Poista suosikeista"
    class="space-xs space-keep-l"
    data-testId="favorite-remove-button"
  >
    <Trash />
  </button>
</li>

<style>
  li {
    border-bottom: 1px solid var(--color-gray-light);
  }
</style>
