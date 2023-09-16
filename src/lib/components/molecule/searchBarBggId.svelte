<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Icon from '@iconify/svelte'
  import shortcut from '$lib/service/shortcut'
  import type { iSearchBarResult } from 'interface/components'
  export let searchState = false
  export let searchTotal = -1
  export let searchQuery = ''

  const dispatch = createEventDispatcher<{'search': iSearchBarResult}>()

  function dispatchSearch(){
    dispatch('search', {
      query: searchQuery
    })
  }

</script>

<div>
  <form class="flex gap-2" on:submit|preventDefault={() => dispatchSearch()}>
    {#if searchState}
      <input type="number" class="input input-bordered w-full max-w-xs" disabled bind:value={searchQuery} />
      <button type="submit" class="btn loading btn-disabled" />
    {:else}
      <div class="form-control w-full">
        <input type="number" class="input input-bordered input-info w-full max-w-xs" bind:value={searchQuery} />
        {#if searchTotal >= 0}
          <label for="input" class="label">
            <span class="label-text">Total Result : {searchTotal}</span>
          </label>
        {/if}
      </div>
      <button type="submit" class="btn btn-info">
        <Icon icon="uil:search" width="30" height="30" />
      </button>
    {/if}
  </form>
</div>