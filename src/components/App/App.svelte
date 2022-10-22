<script lang="ts">
  import { onMount } from 'svelte';
  import { swipe } from 'svelte-gestures';
  import AccuracyIndicator from '@/components/AccuracyIndicator.svelte';
  import AddressSearch from '@/components/AddressSearch/AddressSearch.svelte';
  import Appheader from '@/components/AppHeader.svelte';
  import DepartureList from '@/components/DepartureList';
  import ErrorMessage from '@/components/ErrorMessage.svelte';
  import Filters from '@/components/Filters';
  import Footer from '@/components/Footer.svelte';
  import { BATCH_INTERVAL } from '@/constants';
  import { fetchDisruptions } from '@/services/disruptionsService';
  import { addressStore, departuresStore, filtersStore } from '@/stores';
  import type { Address, Disruption } from '@/types';
  import { requestFocus } from '@/util/dom.utils';
  import { PositionError } from '@/util/error.utils';
  import logger from '@/util/logger';
  import * as model from './model';
  import PositionErrorView from './PositionError.svelte';

  let isLoading = false;
  let isDrawerVisible = false;
  let error: Error | undefined = undefined;
  let disruptions: Disruption[] = [];

  function setError(e: Error) {
    error = e;
  }

  function stopLoading() {
    isLoading = false;
  }

  function searchAddress(searchTerm: string) {
    isLoading = true;
    model
      .findAddressBySearchTerm(searchTerm)
      .catch(setError)
      .finally(stopLoading);
  }

  function scrollToDepartures() {
    requestFocus(
      document.querySelector('.departure-row-button') as HTMLElement,
    );
  }

  function toggleDrawer(state?: boolean) {
    isDrawerVisible = state ?? !isDrawerVisible;
  }

  function onSwipe(event: CustomEvent<{ direction: string }>) {
    if (['left', 'right'].includes(event.detail.direction)) {
      toggleDrawer(event.detail.direction === 'left');
    }
  }

  onMount(() => {
    isLoading = true;
    model.getAddressByLocation().catch(setError).finally(stopLoading);

    fetchDisruptions()
      .then((result) => (disruptions = result))
      .catch(logger.error);

    // batch departures in every x seconds
    const interval = setInterval(
      () => void model.batchDepartures($departuresStore),
      BATCH_INTERVAL,
    );

    // search departures every time the address changes
    const unsubscribeFromAddressStore = addressStore.subscribe(
      (address: Address | undefined) => {
        error = undefined;

        if (address) {
          logger.debug('Address changed', address?.label);
          isLoading = true;
          model
            .fetchDeparturesByAddress(address, $filtersStore)
            .catch(setError)
            .finally(stopLoading);
        }
      },
    );

    return () => {
      clearInterval(interval);
      unsubscribeFromAddressStore();
    };
  });
</script>

<div
  use:swipe="{{ timeframe: 300, minSwipeDistance: 60, touchAction: 'pan-y' }}"
  on:swipe="{onSwipe}"
  class="flex-column viewport-height"
  data-testId="app-content"
>
  <div class="space-m space-keep-b">
    <Appheader
      isDrawerVisible="{isDrawerVisible}"
      toggleDrawer="{toggleDrawer}"
    />
  </div>

  <main
    class="flex-column flex-full full-width centering-margin max-content-width space-xs space-clear-t"
  >
    <div role="alert">
      {#if error && !(error instanceof PositionError)}
        <div class="space-s space-keep-b">
          <ErrorMessage
            error="{error}"
            on:click="{() => (error = undefined)}"
          />
        </div>
      {/if}
    </div>

    <AddressSearch onSearch="{searchAddress}" />

    <div class="relative">
      <button
        class="sr-only sr-only-focusable"
        data-testId="skip-to-departures-button"
        on:click="{scrollToDepartures}"
      >
        Siirry hakutuloksiin
      </button>
    </div>

    <div role="status" class="align-right">
      {#if $addressStore?.location?.accuracy}
        <div class="space-xs space-keep-t ">
          <AccuracyIndicator accuracy="{$addressStore.location.accuracy}" />
        </div>
      {/if}
    </div>

    <div role="alert" class="align-right">
      {#if error && error instanceof PositionError}
        <div class="space-xs space-keep-t ">
          <PositionErrorView error="{error}" />
        </div>
      {/if}
    </div>

    <div class="space-m space-keep-b">
      <Filters />
    </div>

    <div class="flex-column flex-full">
      <DepartureList isLoading="{isLoading}" disruptions="{disruptions}" />
    </div>
  </main>

  <Footer />
</div>
