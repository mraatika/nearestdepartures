<script lang="ts">
  import AlertTriangle from '~icons/lucide/alert-triangle';
  import * as R from 'ramda';
  import ExternalLink from '@/components/ExternalLink.svelte';
  import type { Disruption } from '@/types';

  export let disruptions: Disruption[] = [];
</script>

<div
  class="disruption-info color-alert space-s corner-rounded text-s flex-row"
  data-testId="disruption-info"
>
  <div class="space-xs space-keep-r">
    <AlertTriangle />
  </div>

  <div class="flex-grow">
    {#each R.sortBy(R.prop('effectiveStartDate'), disruptions) as disruption}
      <div>
        {#if disruption.alertHeaderText}
          <h3 class="space-xs space-keep-b">{disruption.alertHeaderText}</h3>
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
  .disruption-info {
    border: 2px solid var(--color-alert);
    margin-top: var(--space-s);
  }
</style>
