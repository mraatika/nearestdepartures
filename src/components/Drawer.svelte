<script lang="ts">
  import { onMount } from 'svelte';
  import { sineInOut } from 'svelte/easing';
  import { onKeys } from '@/util/dom.utils';
  import Modal from './Modal.svelte';

  export let close: VoidFunction;
  export let label: string;

  function slideRight(_node: HTMLElement) {
    return {
      duration: 350,
      easing: sineInOut,
      css: (t: number, u: number) => `transform: translateX(${u * 100}%)`,
    };
  }

  onMount(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  });
</script>

<svelte:body on:keyup="{onKeys(['Escape'], close)}" />

<div class="drawer" data-testId="drawer">
  <Modal on:click="{close}" />

  <div
    class="panel"
    role="dialog"
    tabIndex="0"
    aria-label="{label}"
    aria-modal="{true}"
    transition:slideRight
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
    z-index: 99;
  }

  .panel {
    position: fixed;
    width: 90%;
    height: 100%;
    right: 0;
    background: white;
    z-index: 2;
    overflow: auto;
  }

  @media (min-width: 750px) {
    .panel {
      width: 40%;
    }
  }
</style>
