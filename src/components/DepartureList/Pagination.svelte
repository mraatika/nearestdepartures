<script lang="ts">
  import * as R from 'ramda';

  export let total: number;
  export let current: number;
  export let setPage: (idx: number) => void;
</script>

<nav
  class="full-width flex-column flex-align-center space-s"
  aria-label="Sivutus"
  data-testId="pagination"
>
  <ul class="flex-row flex-wrap flex-justify-center">
    {#each R.range(0, total) as _page, i}
      <li>
        <button
          on:click="{() => setPage(i)}"
          class="bg-gray-light"
          class:active="{current === i}"
          tabindex="{0}"
          aria-label="{`Sivu ${i + 1}`}"
          aria-current="{current === i ? 'page' : undefined}"
        >
        </button>
      </li>
    {/each}
  </ul>
</nav>

<style>
  button {
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    transform: scale(0.9);
    transition: transform 0.25s ease;
  }

  button.active {
    transform: scale(1.15);
    background-color: var(--color-bus);
  }

  button:focus-visible {
    background-color: var(--color-bus);
  }

  li:not(:last-child) {
    margin-right: var(--space-xs);
  }
</style>
