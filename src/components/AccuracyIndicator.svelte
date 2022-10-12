<script lang="ts">
  export let accuracy: number;
  $: state = accuracy > 500 ? 'alert' : accuracy > 100 ? 'warning' : '';
</script>

<div
  class="location-accuracy align-right text-s"
  class:color-alert="{state === 'alert'}"
  class:color-warning="{state === 'warning'}"
>
  <span
    class="location-accuracy-attention text-l space-xxs space-keep-r bold color-alert"
    class:hidden="{!state.length}"
    >!
  </span>

  Paikannuksen tarkkuus: {Math.round(accuracy ?? 0)}m
</div>
