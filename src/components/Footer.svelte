<script lang="ts">
  import ExternalLink from './ExternalLink.svelte';
  import { lastUpdatedStore } from '@/stores';
  import { toTimeStringWithSeconds } from '@/util';
</script>

<footer class="full-width text-s color-white bg-bus-dark space-s">
  <div class="footer-content max-content-width centering-margin">
    <p class="footer-app-name font-heading space-xs space-keep-b">
      {`Julkisilla.info v${import.meta.env.VITE_APP_VERSION}`}
    </p>
    <p class="line-height-m">
      {`Lähdöt päivitetty `}
      <span class="italic"
        >{$lastUpdatedStore
          ? toTimeStringWithSeconds($lastUpdatedStore)
          : 'Ei koskaan'}
      </span>
      {` / Lähtöjen tiedot ovat HSL:n tarjoamaa`}
      <ExternalLink href="https://digitransit.fi/" class="underline">
        avointa dataa
      </ExternalLink>.
    </p>
  </div>
</footer>
