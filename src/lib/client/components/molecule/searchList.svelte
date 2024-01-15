<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import Button from "atom/button.svelte";
  import { onMount } from "svelte";

  export let sideText = 'Input'
  export let searchState = false
  export let resultList: any[] = []
  export let first = false

  const dispatch = createEventDispatcher()
  let searchQuery = ''
  let firstFocus: any

  onMount(() => firstFocus.focus())
  function handleSearch(){
    dispatch('querySubmit', searchQuery)
  }

  function handleSelected(data: any){
    resultList = []
    dispatch('selectSubmit', data)
  }
</script>

<div class="form-control">
  <form on:submit|preventDefault={() => handleSearch()}>
    <div class="input-group w-full">
      <span>{sideText}</span>
      {#if first}
        <input bind:this={firstFocus} type="text" class="input input-bordered flex-grow" bind:value={searchQuery} disabled={false} />
      {:else}
        <input type="text" class="input input-bordered flex-grow" bind:value={searchQuery} disabled={false} />
      {/if}
      {#if searchState}
        <button class="btn btn-square btn-info loading" disabled />
      {:else}
        <Button color="info" icon="uil:search" type="submit" square/>
      {/if}
    </div>
  </form>
</div>
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
{#if resultList.length > 0}
  <ul tabindex="0" class="menu menu-sm bg-neutral w-4/5 absolute z-30">
    {#each resultList as item, index}
      <li class="bg-secondary">
        <Button on:click={() => handleSelected(index)} text={`${item}`} color="secondary" textAlign="left" />
      </li>
    {/each}
  </ul>
{/if}