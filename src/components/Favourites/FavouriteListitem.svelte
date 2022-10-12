<script lang="ts">
  import { Trash2 as Trash } from 'lucide-svelte';
  import type { Favourite } from '@/types';

  export let favourite: Favourite;
  export let removeFavourite: () => void;
  export let isSelected: boolean;
</script>

<li on:click class="no-wrap flex-row flex-align-center space-s space-clear-rl">
  <button class="align-left flex-full">
    {#if isSelected}
      <span class="text-l bold">
        <span aria-hidden="true">&#9656</span>
        <span class="sr-only">Valittu</span>
      </span>
    {/if}

    {favourite.label}
  </button>

  <button on:click="{removeFavourite}" aria-label="Poista suosikeista">
    <Trash class="vertical-bottom" size="{24}" strokeWidth="{1.5}" />
  </button>
</li>

<style>
  li {
    border-bottom: 1px solid var(--color-gray-light);
  }
</style>
