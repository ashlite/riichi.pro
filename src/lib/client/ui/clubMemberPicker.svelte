<script lang="ts">
  //Icon
	import Icon from "@iconify/svelte";
  //skeleton
  import {getToastStore, Avatar, storePopup} from '@skeletonlabs/skeleton'
  //mylib 
  import type { iMemberPicker } from "interface/club";
  //svelte
  import { createEventDispatcher } from "svelte";

  export let clubSlug: string
  const toast = getToastStore()
  const dispatch = createEventDispatcher()
  let processing = false
  let showResult = false
  let queryName: string
  let queryId: number
  let listMember: iMemberPicker[] = []
  
  async function searchMember() {
    processing = true
    let response: Response
    if (queryName) {
      response = await fetch(`/api/v1/private/club/${clubSlug}/member?name=${queryName}`, {
        method: 'GET'
      })
    } else {
      response = await fetch(`/api/v1/private/club/${clubSlug}/member?id=${queryId}`, {
        method: 'GET'
      })
    }
    if (response.ok) {
      const result = await response.json()
      if (result.data.length > 0) {
        showResult = true
        listMember = result.data
      }
    } else { 
      toast.trigger({
        message: response.statusText,
        background: 'variant-filled-error'
      })
    }
    processing = false
  }

  async function selectMember(member: iMemberPicker) {
    dispatch('memberSelected', member)
    showResult = false
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div class="card variant-filled p-4">
    <form on:submit|preventDefault={searchMember}>
      <p>Search player by name</p>
      <div class="input-group input-group-divider grid-cols-[1fr_auto]">
        <input type="text" class="input p-2 text-primary-600-300-token" bind:value={queryName} />
        {#if processing}
          <button class="variant-filled" disabled type="button">Searching...</button>
        {:else}  
          <button class="variant-filled-success" type="submit">Search</button>
        {/if}
      </div>
    </form>
  </div>
  <div class="card variant-filled p-4">
    <form on:submit|preventDefault={searchMember}>
      <p>Search player by ID</p>
      <div class="input-group input-group-divider grid-cols-[1fr_auto]">
        <input type="number" class="input p-2 text-primary-600-300-token" bind:value={queryId} />
        {#if processing}
          <button class="variant-filled" disabled type="button">Searching...</button>
        {:else}  
          <button class="variant-filled-success" type="submit">Search</button>
        {/if}
      </div>
    </form>
  </div>  
</div>
{#if showResult}
  <div class="card p-2 variant-filled">
    <ul class="w-full">
      {#each listMember as member }
        <li class="my-1">
          <button class="btn hover:variant-soft-primary w-full gap-4" on:click={() => selectMember(member)}>
            <div class="w-full flex flex-row gap-4 items-center">
              <Avatar src={member.userData.avatarUrl ?? ''} initials={member.userData.fullName} width="w-12" />
              <div class="flex flex-col items-start">
                <p class="font-bold text-primary-500">
                  {member.userData.fullName}
                </p>
                <p>{member.userData.rtData.name}</p>
              </div>
            </div>
          </button>
        </li>  
      {/each}
    </ul>
  </div>
{/if}