<script lang="ts">
  export let bgColor: string;
</script>

<span class="{`space-xs flex-row bg-${bgColor}`}">
  <slot />
</span>

<style>
  span {
    border-radius: 50%;
  }
</style>
