<script lang="ts">
  import ExternalLink from '@/components/ExternalLink.svelte';
  import type { Disruption } from '@/types';
  import { prop, sortBy } from 'ramda';

  export let disruptions: Disruption[] = [];
</script>

<div
  class="alert-info color-alert align-left full-width bg-light-red space-s space-clear-tb"
>
  {#each sortBy(prop('effectiveStartDate'), disruptions) as disruption}
    <div class="space-s space-clear-rl">
      {#if disruption.alertHeaderText}
        <h3 class="space-xs space-keep-b">{disruption.alertHeaderText}</h3>
      {/if}

      <p class="alert-info-body">
        {disruption.alertDescriptionText}

        {#if disruption.alertUrl}
          <ExternalLink
            class="disruption-alert-additional-info underline"
            href="{disruption.alertUrl}"
          >
            Lisätietoja
          </ExternalLink>
        {/if}
      </p>
    </div>
  {/each}
</div>
