<script lang="ts">
  import GithubIcon from '~icons/lucide/github';
  import ExternalLink from './ExternalLink.svelte';
  import { lastUpdatedStore } from '@/stores';
  import { toTimeStringWithSeconds } from '@/util';
  import Badge from '@/components/Badge.svelte';
</script>

<footer class="full-width text-s color-white bg-bus-dark space-s">
  <div class="max-content-width centering-margin flex-row flex-space-between">
    <div>
      <p class="font-heading space-xs space-keep-b">
        {`Julkisilla.info v${import.meta.env.VITE_APP_VERSION}`}
      </p>

      <p class="line-height-m">
        {#if $lastUpdatedStore}
          Lähdöt päivitetty
          <span class="italic">
            {`${toTimeStringWithSeconds($lastUpdatedStore)} / `}
          </span>
        {/if}
        Lähtöjen tiedot ovat HSL:n tarjoamaa
        <ExternalLink href="https://digitransit.fi/" class="underline">
          avointa dataa
        </ExternalLink>.
      </p>
    </div>
    <div>
      <ExternalLink
        href="https://github.com/mraatika/nearestdepartures"
        showIcon="{false}"
      >
        <Badge bgColor="black">
          <GithubIcon />
        </Badge>
      </ExternalLink>
    </div>
  </div>
</footer>
