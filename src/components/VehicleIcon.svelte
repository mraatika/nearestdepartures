<script lang="ts">
  import icons from '@/assets/vehicle_icons.svg';

  export let icon: string;
  export let alt: string;
  export let shadow = false;
</script>

<svg
  class="vehicle-icon"
  class:shadow
  viewBox="0 0 100 100"
  focusable="false"
  aria-hidden="true"
>
  <use href="{`${icons}#icon-icon_${icon}`}" style:fill="currentColor"></use>
</svg>

<span class="sr-only">{alt}</span>

<style>
  .vehicle-icon {
    width: 1em;
  }

  .vehicle-icon.shadow {
    filter: drop-shadow(1px 2px 0 rgb(0 0 0 / 0.4));
  }
</style>
