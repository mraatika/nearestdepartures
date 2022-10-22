<script lang="ts">
  import * as R from 'ramda';
  import Menu from '~icons/lucide/menu';
  import Drawer from '@/components/Drawer.svelte';
  import Favourites from '@/components/Favourites';

  export let isDrawerVisible: boolean;
  export let toggleDrawer: () => void;

  let toggle = R.nAry(0, toggleDrawer);
</script>

<div>
  <button
    on:click="{toggle}"
    aria-label="Omat suosikit"
    data-testId="menu-button"
  >
    <div class="menu-icon" class:pressed="{isDrawerVisible}">
      <Menu style="font-size: 32px;" />
    </div>
  </button>

  <Drawer isVisible="{isDrawerVisible}" close="{toggle}" label="Omat suosikit">
    <Favourites close="{toggle}" />
  </Drawer>
</div>

<style>
  .menu-icon {
    filter: drop-shadow(1px 2px 0 rgb(0 0 0 / 0.4));
    transition: 0.15s ease-out;
  }

  .menu-icon.pressed {
    transform: scale(0.8);
  }
</style>
