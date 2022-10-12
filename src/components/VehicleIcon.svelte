<script lang="ts">
  import icons from '@/assets/vehicle_icons.svg';
  export let icon: string;
  export let alt: string;
  export let shadow = false;
</script>

<svg
  class="vehicle-icon {$$restProps.class}"
  class:shadow
  viewBox="0 0 100 100"
  focusable="false"
>
  <title>{alt}</title>
  <use href="{`${icons}#icon-icon_${icon}`}" style:fill="currentColor"></use>
</svg>

<style>
  .vehicle-icon {
    width: 1em;
  }

  .vehicle-icon.shadow {
    filter: drop-shadow(1px 2px 0 rgb(0 0 0 / 0.4));
  }
</style>
