<script lang="ts">
  import AlertTriangle from '~icons/lucide/alert-triangle';
  import { formatError, type PositionError } from '@/util/error.utils';

  export let error: PositionError;
</script>

<div
  class="text-s flex flex-row flex-justify-end color-alert"
  data-testId="position-error"
>
  <AlertTriangle class="alert-triangle" />
  <span class="space-xxs space-keep-l">{`${formatError(error)}`}</span>
</div>
