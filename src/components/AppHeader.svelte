<script lang="ts">
  import logo from '@/assets/logo_v3.svg';
  import DrawerMenu from '@/components/DrawerMenu.svelte';

  export let isDrawerVisible: boolean;
  export let toggleDrawer: () => void;
</script>

<header class="bg-bus color-white space-s">
  <div
    class="header-content flex-row flex-align-center centering-margin max-content-width"
  >
    <div class="heading-container flex-column flex-full no-wrap">
      <h1 class="flex-full no-wrap flex-row flex-align-center">
        <div class="space-xs space-keep-r">
          <img
            class="app-logo drop-shadow"
            src="{logo}"
            alt="Julkisilla.info logo"
            width="40"
            height="40"
          />
        </div>
        <span class="app-name font-heading lowercase">julkisilla.info</span>
      </h1>

      <p class="app-description text-s line-height-xs space-xs space-keep-b">
        Löydä lähimmät julkisen liikenteen lähdöt helposti
      </p>
    </div>

    <DrawerMenu
      isDrawerVisible="{isDrawerVisible}"
      toggleDrawer="{toggleDrawer}"
    />
  </div>
</header>

<style>
  .app-name {
    text-shadow: 2px 2px 4px var(--color-blue-dark);
  }

  .app-description {
    display: none;
  }

  .app-logo {
    filter: drop-shadow(2px 2px 2px rgb(0 0 147 / 0.4));
  }

  @media (min-width: 750px) {
    .app-description {
      display: block;
    }

    .app-logo {
      height: 60px;
    }
  }
</style>
