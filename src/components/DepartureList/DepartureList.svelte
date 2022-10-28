<script lang="ts">
  import * as R from 'ramda';
  import { onMount } from 'svelte';
  import LoadingOverlay from '@/components/LoadingOverlay.svelte';
  import { addressStore, departuresStore, filtersStore } from '@/stores';
  import type { Departure, Disruption } from '@/types';
  import DepartureRow from './DepartureRow.svelte';
  import DepartureSortHeader from './DepartureSortHeader.svelte';
  import { filterDepartures } from './model';
  import type { Sort, SortHeader, SortPropName } from './types';
  import logger from '@/util/logger';
  import Pagination from './Pagination.svelte';
  import { PAGE_SIZE } from '@/constants';
  import { swipe } from 'svelte-gestures';

  export let isLoading = false;
  export let disruptions: Disruption[];

  const sortHeaders: SortHeader[] = [
    {
      text: 'Lähtee',
      propName: 'realtimeDeparture',
    },
    {
      text: 'Linja',
      propName: 'routeName',
    },
    {
      text: 'Määränpää',
      propName: 'destination',
    },
    {
      text: 'Pysäkille',
      propName: 'distance',
    },
  ];

  let sort: Sort = { propName: 'realtimeDeparture', sortDir: 1 };
  let toggledRowId = '';
  let now = Date.now();
  let currentPage = 0;

  $: filtered = filterDepartures($filtersStore, $departuresStore);
  $: sorted = sortDepartures(sort, filtered);
  $: paged = R.splitEvery(PAGE_SIZE, sorted);
  $: departures = paged[currentPage];
  $: disruptionMap = R.groupBy(
    R.pathOr<string>('', ['route', 'gtfsId']),
    disruptions,
  );
  $: pageCount = Math.ceil(filtered.length / PAGE_SIZE);

  onMount(() => {
    const interval = setInterval(() => {
      now = Date.now();
      logger.debug('Running time update', new Date(now));
    }, 20 * 1000);

    // reset page when a new search is made
    const unsubscribeFromAddress = addressStore.subscribe(() => {
      currentPage = 0;
    });

    return () => {
      clearInterval(interval);
      unsubscribeFromAddress();
    };
  });

  function updateSortProps(propName: SortPropName) {
    // if sorted with same prop as before then switch sort mode asc <--> desc
    const sortDir = sort.propName === propName ? sort.sortDir * -1 : 1;
    sort = { propName, sortDir };
  }

  function sortDepartures(sort: Sort, filtered: Departure[]) {
    const primarySorter = sort.sortDir === -1 ? R.descend : R.ascend;
    return R.sortWith<Departure>(
      [
        primarySorter(
          R.propOr<SortPropName>('realtimeDeparture', sort.propName),
        ),
        R.ascend(R.prop('realtimeDeparture')),
      ],
      filtered,
    );
  }

  function toggleRow(rowId: string) {
    toggledRowId = toggledRowId === rowId ? '' : rowId;
  }

  function setPage(idx: number) {
    currentPage = idx;
  }

  function onSwipe(e: CustomEvent<{ direction: string }>) {
    if (e.detail.direction === 'right') {
      setPage(Math.max(0, currentPage - 1));
    } else if (e.detail.direction === 'left') {
      setPage(Math.min(currentPage + 1, pageCount - 1));
    }
  }
</script>

<div class="position-relative flex-full flex-column">
  <LoadingOverlay class="space-xxl space-keep-t" show="{isLoading}" />

  <div
    use:swipe="{{ timeframe: 300, minSwipeDistance: 60, touchAction: 'pan-y' }}"
    on:swipe="{onSwipe}"
    class="flex-full"
    role="treegrid"
    aria-label="Lähdöt"
    data-testId="departure-list"
  >
    <div role="rowgroup">
      <div
        role="row"
        class="departures-list-header flex-row no-wrap space-xs space-keep-b"
      >
        {#each sortHeaders as header}
          <DepartureSortHeader
            propName="{header.propName}"
            active="{sort.propName === header.propName}"
            onClick="{updateSortProps}"
            text="{header.text}"
            sortDir="{sort.sortDir}"
          />
        {/each}
      </div>
    </div>

    {#if filtered.length}
      {#each departures as departure (departure.id)}
        <DepartureRow
          departure="{departure}"
          isToggled="{toggledRowId === departure.id}"
          onRowToggle="{toggleRow}"
          disruptions="{disruptionMap[departure.routeId]}"
          now="{now}"
        />
      {/each}
    {:else if !isLoading}
      <div
        role="row"
        class="italic align-center space-m space-clear-rl"
        tabindex="0"
      >
        <div role="cell" aria-colspan="{4}">
          Lähtöjä ei löytynyt annetuilla hakukriteereillä tai suodattimilla.
        </div>
      </div>
    {/if}
  </div>

  {#if pageCount > 1}
    <Pagination
      setPage="{setPage}"
      total="{pageCount}"
      current="{currentPage}"
    />
  {/if}

  <div role="status" class="sr-only" aria-atomic="true">
    {`Lähtöjä yhteensä ${filtered.length} kappaletta`}
  </div>
</div>

<style>
  :global(.realtimeDeparture, .routeName) {
    width: 4rem;
  }

  @media (min-width: 750px) {
    :global(.realtimeDeparture, .routeName) {
      width: 4.5rem;
    }
  }
</style>
