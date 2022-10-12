<script lang="ts">
  import * as R from 'ramda';
  import { onMount } from 'svelte';
  import LoadingOverlay from '@/components/LoadingOverlay.svelte';
  import { departuresStore, filtersStore } from '@/stores';
  import type { Departure, Disruption } from '@/types';
  import DepartureRow from './DepartureRow.svelte';
  import DepartureSortHeader from './DepartureSortHeader.svelte';
  import { filterDepartures } from './model';
  import type { Sort, SortHeader, SortPropName } from './types';
  import logger from '@/util/logger';

  const sortHeaders: SortHeader[] = [
    {
      text: 'Lähtee',
      propName: 'realtimeDeparture',
      label: 'Järjestä lista lähtöajan mukaan',
    },
    {
      text: 'Linja',
      propName: 'routeName',
      label: 'Järjestä lista linjan mukaan',
    },
    {
      text: 'Määränpää',
      propName: 'destination',
      label: 'Järjestä lista määränpään mukaan',
    },
    {
      text: 'Pysäkille',
      propName: 'distance',
      label: 'Järjestä lista pysäkin etäisyyden mukaan',
    },
  ];

  let sort: Sort = { propName: 'realtimeDeparture', sortDir: 1 };
  let toggledRowId = '';
  let now = Date.now();

  export let isLoading = false;
  export let disruptions: Disruption[];

  $: filtered = filterDepartures($filtersStore, $departuresStore);
  $: sorted = sortDepartures(sort, filtered);
  $: disruptionMap = R.groupBy(
    R.pathOr<string>('', ['route', 'gtfsId']),
    disruptions,
  );

  onMount(() => {
    const interval = setInterval(() => {
      now = Date.now();
      logger.debug('Running time update', new Date(now));
    }, 20 * 1000);

    return () => void clearInterval(interval);
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
</script>

<div class="position-relative">
  <LoadingOverlay class="space-xxl space-keep-t" show="{isLoading}" />

  <div role="status" class="sr-only">
    {`Lähtöjä yhteensä ${filtered.length} kappaletta`}
  </div>

  <div role="table" aria-label="Lähdöt">
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
            label="{header.label}"
            sortDir="{sort.sortDir}"
          />
        {/each}
      </div>
    </div>

    {#if sorted.length}
      {#each sorted as departure (departure.id)}
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
