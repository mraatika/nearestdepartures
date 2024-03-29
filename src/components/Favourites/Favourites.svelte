<script lang="ts">
  import { reject } from 'ramda';
  import { afterUpdate } from 'svelte';
  import Star from '~icons/lucide/star';
  import StarOff from '~icons/lucide/star-off';
  import X from '~icons/lucide/x';
  import * as storage from '@/services/storageService';
  import { addressStore, favouritesStore } from '@/stores';
  import type { Address } from '@/types';
  import { isSameAddress } from '@/util';
  import FavouritesList from './FavouritesList.svelte';
  import * as model from './model';

  export let close: VoidFunction;
  export let onUpdate: VoidFunction;

  $: isCurrentAddressFavoured = model.isLocationFavoured(
    $favouritesStore,
    $addressStore,
  );

  $: isDisabled = !$addressStore;

  /**
   * Add current address to/remove from the list of favourites
   */
  function toggleFavourite() {
    if ($addressStore) {
      isCurrentAddressFavoured
        ? removeFromFavourites($addressStore)
        : addToFavourites($addressStore);
    }
  }

  function addToFavourites(address: Address) {
    // when saving an address fetched with current location, the location object is
    // an instance of GeolocationCoordinates and must be converted to a serializable object
    const serializableAddress =
      address.location instanceof GeolocationCoordinates
        ? { ...address, location: model.toLocationObject(address.location) }
        : address;

    saveFavourites([...$favouritesStore, serializableAddress]);
  }

  function removeFromFavourites(address: Address) {
    const withoutCurrent = reject(isSameAddress(address.id), $favouritesStore);
    saveFavourites(withoutCurrent);
  }

  function saveFavourites(updated: Address[]) {
    storage.saveFavourites(updated);
    favouritesStore.set(updated);
  }

  function selectFavourite(favourite: Address) {
    addressStore.set(favourite);
    close();
  }

  afterUpdate(onUpdate);
</script>

<div class="drawer-header color-white bg-bus space-s">
  <div class="flex-row flex-justify-end flex-align-center text-xxl">
    <span class="space-xs space-keep-r">
      <button
        on:click="{isDisabled ? () => undefined : toggleFavourite}"
        aria-label="{isCurrentAddressFavoured
          ? 'Poista tämän hetkinen osoite suosikeista'
          : 'Lisää tämän hetkinen osoite suosikkeihin'}"
        aria-pressed="{!!isCurrentAddressFavoured}"
        aria-disabled="{isDisabled}"
        data-testId="favourite-button"
      >
        {#if isCurrentAddressFavoured}
          <StarOff style="font-size: 24px;" />
        {:else}
          <Star style="font-size: 24px;" />
        {/if}
      </button>
    </span>

    <button
      on:click="{close}"
      aria-label="Sulje"
      data-testId="modal-close-button"
    >
      <X style="font-size: 24px;" />
    </button>
  </div>

  <h2 class="font-heading align-center space-s space-clear-rl">
    Omat suosikit
  </h2>
</div>

<div class="triangle-container">
  <div class="triangle centering-margin"></div>
  <div class="triangle-shadow centering-margin"></div>
</div>

<div class="flex-column flex-full space-s space-clear-t">
  <FavouritesList
    favourites="{$favouritesStore}"
    removeFromFavourites="{removeFromFavourites}"
    selectFavourite="{selectFavourite}"
  />
</div>

<style>
  .drawer-header {
    box-shadow: 1px 2px 4px var(--color-gray);
  }

  .triangle-container {
    position: relative;
  }

  .triangle,
  .triangle-shadow {
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-top: 30px solid transparent;
  }

  .triangle {
    position: relative;
    z-index: 2;
    border-top: 32px solid transparent;
    border-top-color: var(--color-bus);
  }

  .triangle-shadow {
    position: absolute;
    right: calc(50% - 25px);
    top: 3px;
    z-index: 1;
    filter: blur(3px);
    border-top-color: var(--color-gray);
  }
</style>
