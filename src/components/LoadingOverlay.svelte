<script lang="ts">
  import spinner from '@/assets/spinner.svg';
  export let show = false;
</script>

<div
  class="{`loading-overlay fill-parent ${$$restProps.class}`}"
  style:display="{show ? 'block' : 'none'}"
  aria-busy="{show}"
>
  <img class="spinner" src="{spinner}" alt="Haetaan lähtöjä" />
</div>

<style>
  .loading-overlay {
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    z-index: 1;
    text-align: center;
    user-select: none;
  }
</style>
