<script lang="ts">
  import * as R from 'ramda';
  import { onMount } from 'svelte';
  import { addressStore, locationStore } from '@/stores';
  import type { Address } from '@/types';
  import { debounce } from '@/util';
  import * as model from './model';
  import SuggestionList from './SuggestionList.svelte';

  export let onSearch: (searchTerm: string) => void;

  let searchTerm = '';
  let suggestions: Address[] = [];
  let selectedSuggestion: Address | undefined = undefined;
  let addressInput: HTMLInputElement;

  onMount(() => {
    return addressStore.subscribe((value) => {
      if (value && document.activeElement !== addressInput) {
        searchTerm = value.label;
      }
    });
  });

  /**
   * Hide suggestions list and clear selected suggestion from state
   */
  function hideSuggestions() {
    suggestions = [];
  }

  async function onInput() {
    selectedSuggestion = undefined;
    addressStore.set(undefined);

    if (searchTerm.length > 2) {
      suggestions = await model.fetchSuggestions(searchTerm, $locationStore);
    } else {
      hideSuggestions();
    }
  }

  function onBlur() {
    if (!searchTerm.length && $addressStore) {
      searchTerm = $addressStore.label;
    }

    // @TODO: review this, blur comes first and hides
    // the suggestions list before the click is registered
    setTimeout(hideSuggestions, 200);
  }

  /**
   * Set suggestion selected
   */
  function selectSuggestion(suggestion?: Address) {
    selectedSuggestion = suggestion;
    if (suggestion) {
      searchTerm = suggestion.label;
    }
  }

  /**
   * Select previous suggestion. Callback for up arrow button.
   */
  function onKeyUpPress() {
    const prev = model.selectPrevSuggestion(suggestions, selectedSuggestion);
    selectSuggestion(prev);
  }

  /**
   * Select next suggestion. Callback for down arrow button.
   */
  function onKeyDownPress() {
    const next = model.selectNextSuggestion(suggestions, selectedSuggestion);
    selectSuggestion(next);
  }

  function onFormKeyEvent({ code }: KeyboardEvent) {
    switch (code) {
      case 'ArrowUp':
        onKeyUpPress();
        break;
      // if down was pressed
      case 'ArrowDown':
        onKeyDownPress();
        break;
      // if esc was pressed
      case 'Escape':
        hideSuggestions();
        searchTerm = '';
        break;
      default:
        break;
    }
  }

  /**
   * Does submit action (calls given callback) and
   * does suggestions clean up
   */
  function onSubmit() {
    hideSuggestions();

    // if a suggestion was selected then we can use it to search for departures
    if (selectedSuggestion) {
      addressStore.set(selectedSuggestion);
      return;
    }

    // if address is defined, update the store by copying existing value
    // update will then trigger a new fetch
    if ($addressStore) {
      addressStore.update(R.clone);
      return;
    }

    onSearch(searchTerm);
  }

  function onSuggestionClick(suggestion: Address) {
    selectSuggestion(suggestion);
    onSubmit();
  }
</script>

<form
  on:submit|preventDefault="{onSubmit}"
  on:keyup|preventDefault="{onFormKeyEvent}"
>
  <div class="flex-row line-height-xl">
    <input
      bind:this="{addressInput}"
      bind:value="{searchTerm}"
      on:focus="{() => addressInput.select()}"
      on:blur="{onBlur}"
      on:input="{debounce(onInput, 300)}"
      on:pointerdown|stopPropagation
      class="flex-full border-thin-light border-clear-right space-s space-clear-r"
      type="text"
      role="combobox"
      aria-controls="suggestions-list"
      aria-expanded="{!!suggestions.length}"
      aria-activedescendant="{selectedSuggestion?.id}"
      aria-autocomplete="list"
      aria-haspopup="listbox"
      name="address"
      aria-label="Hae osoitteella tai paikannimellä"
      placeholder="Hae osoitteella tai paikannimellä"
      autocomplete="off"
    />

    <button type="submit" class="color-white bg-bus no-border bold">
      <span class="">Hae</span>
    </button>
  </div>

  <div class="suggestions position-relative">
    <SuggestionList
      suggestions="{suggestions}"
      selected="{selectedSuggestion}"
      onSelected="{onSuggestionClick}"
    />
  </div>
</form>

<style>
  button {
    flex: 1;
    min-width: 4rem;
  }
  input {
    flex: 5;
  }
</style>
