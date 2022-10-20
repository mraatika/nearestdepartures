<script lang="ts">
  import { AlertTriangle } from 'lucide-svelte';

  export let accuracy: number;
  $: state = accuracy > 500 ? 'alert' : accuracy > 100 ? 'warning' : '';
</script>

<div
  class="text-s flex flex-row flex-justify-end"
  class:color-alert="{state === 'alert'}"
  data-testId="accuracy-indicator"
>
  {#if state.length}
    <div class="space-xxs space-keep-r bold">
      <AlertTriangle size="{16}" />
    </div>
  {/if}

  Paikannuksen tarkkuus: {Math.round(accuracy ?? 0)}m
</div>
