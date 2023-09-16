<script lang="ts">
  import { get } from '$lib/service/api'
  import Button from 'atom/button.svelte'
  import { createEventDispatcher } from 'svelte'
  import type { iGetSupplierBulk } from 'interface/crm'

  let searchState = false
  let searchQuery: string
  let resultQuery: any[] = []
  const dispatch = createEventDispatcher<{'submit': iGetSupplierBulk}>()

  function forward(data: iGetSupplierBulk){
    dispatch('submit', data)
    resultQuery = []
  }

  async function searchSupplier(query: string){
    resultQuery = await get(`/supplier?q=${query}`) 
  }

  $:resultQuery

</script>

<div class="form-control">
  <form on:submit|preventDefault={() => searchSupplier(searchQuery)}>
    <div class="input-group w-full">
      <span>Search Supplier</span>
      <input type="text" class="input input-bordered flex-grow" bind:value={searchQuery} disabled={false} />
      {#if searchState}
        <button class="btn btn-square btn-info loading" disabled />
      {:else}
        <Button color="info" icon="uil:search" type="submit"/>
      {/if}
    </div>
  </form>
</div>
<ul class="menu bg-neutral w-4/5 absolute z-30">
  {#if resultQuery.length > 0}
    {#each resultQuery as supplier}
      <li>
        <Button on:click={() => forward(supplier)} text={`(${supplier.country}) - ${supplier.supplier_name}`} />
      </li>
    {/each}
  {/if}
</ul>