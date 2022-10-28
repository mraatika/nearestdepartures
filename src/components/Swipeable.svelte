<script lang="ts">
  import { swipe } from 'svelte-gestures';
</script>

<div
  {...$$restProps}
  use:swipe="{{ timeframe: 300, minSwipeDistance: 60, touchAction: 'pan-y' }}"
  on:swipe
>
  <slot />
</div>
