<script lang="ts">
  export let isVisible = false;
</script>

<div class="modal" class:visible="{isVisible}" on:click></div>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    z-index: 2;
    transition: opacity 250ms ease;
  }

  .visible {
    opacity: 1;
  }
</style>
