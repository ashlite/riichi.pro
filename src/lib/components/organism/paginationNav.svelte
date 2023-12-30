<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import type { iPagination } from 'interface/pageMeta'
  import Button from 'atom/button.svelte'
  import { page } from '$app/stores';
  import { goto } from '$app/navigation'

  export let pagination: iPagination
  let currentPage = pagination.currentPage
  let totalPages = pagination.totalPage
  let rowPerPage = pagination.rowPerPage

  function nextPage(){
    if (currentPage < totalPages) {
      const url = new URL($page.url)
      url.searchParams.set('page', (currentPage++).toString())
      goto(url)
    }
  }

  function previousPage(){
    if (currentPage > 1) {
      const url = new URL($page.url)
      url.searchParams.set('page', (currentPage--).toString())
      goto(url)
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
    <select class="select select-bordered max-w-xs" bind:value={rowPerPage}>
      <option value={10}>10</option>
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  </div>
  <div class="col-start-4 col-span-7">
    <div class="flex flex-row w-full self-end gap-4">
      <Button on:click={() => nextPage()} size="md" iconSize={40} color="info" icon="ph:arrow-left-fill" />
      <button class="btn btn-md grow">Page {currentPage} of {totalPages}</button>
      <Button on:click={() => previousPage()} size="md" iconSize={40} color="info" icon="ph:arrow-right-fill" />
    </div>
  </div>
  <div class="col-start-11 col-span-2">
    <Button
      size="md" 
      on:click={refreshPage}
      icon="ph:arrow-clockwise-bold"
      text="Refresh"
      color="info"
      full
    />
  </div>
</div>