<script lang="ts">
  export let href: string;
</script>

<a
  {...$$restProps}
  on:click|stopPropagation
  href="{href}"
  target="_blank"
  rel="noopener"
>
  <slot />
  <span class="sr-only">Avautuu uuteen välilehteen</span>
</a>
