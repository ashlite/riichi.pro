<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { iPagination } from 'interface/utils'
  import type { iPaginationNavResult } from 'interface/components'
  import Button from 'atom/button.svelte'
  import { page } from '$app/stores';
  import { goto } from '$app/navigation'

  export let bigLimit = false
  export let pagination: iPagination
  let currentPage = pagination.current_page
  // let totalPages = pagination.total_page
  let itemPerPage = pagination.item_page
  const dispatch = createEventDispatcher<{'changePage': iPaginationNavResult}>()

  $: totalPages = pagination.total_page

  function dispatchUpdate(){
    dispatch('changePage', {
      item_page: itemPerPage,
      current_page: currentPage
    })
  }

  function nextPage(){
    if (currentPage != 1) {
      currentPage--
      dispatchUpdate()
    }
  }

  function previousPage(){
    if (currentPage < totalPages) {
      currentPage++
      dispatchUpdate()
    }
  }

  function refreshPage() {
    const url = new URL($page.url)
    url.search = ''
    goto(url)
  }
</script>

<div class="grid grid-cols-12 mb-4 gap-4">
  <div class="col-span-3 flex items-center gap-4">
    <h3 class="text-xl">Items per page:</h3>
    <select class="select select-bordered max-w-xs" bind:value={itemPerPage} on:change={() => dispatchUpdate()} >
      {#if !bigLimit}
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={150}>150</option>
        <option value={200}>200</option>
      {:else}
        <option value={50}>50</option>
        <option value={200}>200</option>
        <option value={400}>400</option>
        <option value={800}>800</option>
      {/if}
    </select>
  </div>
  <div class="col-start-4 col-span-7">
    <div class="btn-group w-full self-end">
      <Button on:click={() => nextPage()} size="md" iconSize={40} color="info" icon="uil:angle-left" />
        <!-- {#key totalPages} -->
          <button class="btn btn-md grow cursor-default no-animation pointer-events-none">Page {currentPage} of {totalPages}</button>
        <!-- {/key} -->
      <Button on:click={() => previousPage()} size="md" iconSize={40} color="info" icon="uil:angle-right" />
    </div>
  </div>
  <div class="col-start-11 col-span-2">
    <Button
      size="md" 
      on:click={refreshPage}
      icon="uil:refresh"
      text="Refresh"
      color="info"
      full
    />
  </div>
</div>