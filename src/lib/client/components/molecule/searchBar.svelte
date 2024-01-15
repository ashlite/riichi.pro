<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Icon from '@iconify/svelte'
  import shortcut from '$lib/service/shortcut'
  import type { iSearchBarResult } from 'interface/components'
  export let searchTotal: string | null = null
  export let noTotal: boolean = false
  let searchQuery: string | undefined
  
  const dispatch = createEventDispatcher<{'search': iSearchBarResult}>()

  function dispatchSearch(){
    dispatch('search', {
      query: searchQuery
    })
  }

</script>

<!-- <div> -->
  <form class="w-full flex flex-row justify-start gap-2" on:submit|preventDefault={dispatchSearch}>
    <div class="form-control w-4/5">
      <input type="text" placeholder="Search Bar" class="input input-bordered input-info w-full max-w-lg" bind:value={searchQuery} />
      {#if searchTotal != undefined && !noTotal}
        <label for="input" class="label">
          <span class="label-text">Total Result : {searchTotal}</span>
        </label>
      {/if}
    </div>
    <button type="submit" class="btn btn-info w-1/5">
      <Icon icon="uil:search" width="30" height="30" />
    </button>
  </form>
<!-- </div> -->