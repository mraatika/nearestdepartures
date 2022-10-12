<script lang="ts">
  import { formatError, type PositionError } from '@/util/error.utils';
  export let error: PositionError;
</script>

<div class="text-s color-alert">
  <span class="text-l bold space-xxs space-keep-r" aria-hidden="true">!</span>
  {formatError(error)}
</div>
