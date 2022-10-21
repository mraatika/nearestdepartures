<script lang="ts">
  import XCircle from '~icons/lucide/x-circle';
  import { requestFocus } from '@/util/dom.utils';
  export let error: Error;
</script>

<div
  use:requestFocus
  class="position-relative space-s color-alert bg-light-red corner-rounded"
  tabIndex="0"
>
  <h2 class="text-m bold space-xxs space-keep-b">Tapahtui virhe!</h2>
  {error.message}

  <button on:click class="close-button space-xs" aria-label="Sulje">
    <XCircle style="font-size: 20px;" />
  </button>
</div>

<style>
  .close-button {
    position: absolute;
    top: 4px;
    right: 4px;
    color: inherit;
  }
</style>
