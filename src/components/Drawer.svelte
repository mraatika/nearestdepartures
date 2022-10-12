<script lang="ts">
  import Modal from './Modal.svelte';
  import { onKeys } from '@/util/dom.utils';
  export let isVisible = false;
  export let close: VoidFunction;
  export let label: string;

  $: {
    if (isVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
</script>

<svelte:body on:keyup="{isVisible ? onKeys(['Escape'], close) : undefined}" />

<div class="drawer" class:visible="{isVisible}">
  <Modal isVisible="{isVisible}" on:click="{close}" />

  <div
    class="panel"
    role="dialog"
    tabIndex="0"
    aria-label="{label}"
    aria-modal="{true}"
  >
    <div class="bg-white full-height">
      <slot />
    </div>
  </div>
</div>

<style>
  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: z-index 350ms step-end;
  }

  .drawer.visible {
    z-index: 99;
    transition: z-index 350ms step-start;
  }

  .drawer.visible .panel {
    transform: translate(0, 0);
  }

  .panel {
    position: fixed;
    width: 90%;
    height: 100%;
    right: 0;
    background: white;
    z-index: 3;
    transition: transform 350ms ease;
    overflow: auto;
    transform: translate(100%, 0);
  }

  @media (min-width: 750px) {
    .panel {
      width: 40%;
    }
  }
</style>
