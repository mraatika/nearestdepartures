<script lang="ts">
  import { sineInOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
</script>

<div
  on:click
  transition:fade="{{ duration: 250, easing: sineInOut }}"
  class="modal"
  data-testId="modal-backdrop"
></div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
</style>
