<script lang="ts">
  import { AlertTriangle } from 'lucide-svelte';
  import { formatError, type PositionError } from '@/util/error.utils';

  export let error: PositionError;
</script>

<div
  class="text-s flex flex-row flex-justify-end color-alert"
  data-testId="location-error"
>
  <AlertTriangle size="{16}" />
  {` ${formatError(error)}`}
</div>
