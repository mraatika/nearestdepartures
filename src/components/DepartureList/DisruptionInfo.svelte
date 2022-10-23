<script lang="ts">
  import AlertTriangle from '~icons/lucide/alert-triangle';
  import * as R from 'ramda';
  import ExternalLink from '@/components/ExternalLink.svelte';
  import type { Disruption } from '@/types';

  export let disruptions: Disruption[] = [];
</script>

<div
  class="color-alert space-s corner-rounded text-s flex-row line-height-l"
  data-testId="disruption-info"
>
  <div class="space-xs space-keep-r">
    <AlertTriangle />
  </div>

  <div class="flex-grow">
    {#each R.sortBy(R.prop('effectiveStartDate'), disruptions) as disruption}
      <div class="disruption">
        {#if disruption.alertHeaderText}
          <h2 class="space-xs space-keep-b text-m">
            {disruption.alertHeaderText}
          </h2>
        {/if}
        <p>
          {disruption.alertDescriptionText}
          {#if disruption.alertUrl}
            <ExternalLink class="underline" href="{disruption.alertUrl}">
              Lisätietoja
            </ExternalLink>.
          {/if}
        </p>
      </div>
    {/each}
  </div>
</div>

<style>
  .disruption + .disruption {
    margin-top: var(--space-m);
  }
</style>
