<script lang="ts">
  import { AlertTriangle } from 'lucide-svelte';
  import { addressStore } from '@/stores';
  import type { Address } from '@/types';
  import FavouriteListitem from './FavouriteListitem.svelte';

  export let favourites: Address[] = [];
  export let removeFromFavourites: (adress: Address) => void;
  export let selectFavourite: (adress: Address) => void;
</script>

<ul class="color-black">
  {#each favourites as favourite (favourite.id)}
    <FavouriteListitem
      on:click="{() => selectFavourite(favourite)}"
      favourite="{favourite}"
      isSelected="{favourite.id === $addressStore?.id}"
      removeFavourite="{() => removeFromFavourites(favourite)}"
    />
  {/each}

  {#if !favourites.length}
    <li class="align-left space-m space-keep-t">
      <div class="space-xs space-keep-b">Et ole vielä lisännyt suosikkeja!</div>
      <div class="text-s">
        <span class="space-xxs space-keep-r">
          <AlertTriangle size="{16}" />
        </span>
        Huomioithan, että suosikit tallentuvat paikallisesti, joten ne ovat hyödynnettävissä
        vain samalla selaimella ja laitteella, johon ne on tallennettu.
      </div>
    </li>
  {/if}
</ul>
