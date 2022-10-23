<script lang="ts">
  import ExternalLinkIcon from '~icons/lucide/external-link';
  export let href: string;
  export let showIcon = true;
</script>

<a
  {...$$restProps}
  on:click|stopPropagation
  href="{href}"
  target="_blank"
  rel="noopener"
>
  <slot />
  {#if showIcon}
    <ExternalLinkIcon
      aria-label="Avautuu uuteen välilehteen"
      style="font-size: .9em;"
    />
  {:else}
    <span class="sr-only">Avautuu uuteen välilehteen</span>
  {/if}
</a>
