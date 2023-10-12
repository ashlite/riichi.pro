<script lang="ts">
	import Icon from "@iconify/svelte";
  import type { iGlobalResponse } from "interface/utils";
	import toastAlert from "store/toast";
  import Avatar from "atom/avatar.svelte";
  import type { iMemberPicker } from "interface/club";
  import { createEventDispatcher } from "svelte";

  export let clubSlug: string
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
      response = await fetch(`/api/v1/club/${clubSlug}/member?name=${queryName}`, {
        method: 'GET'
      })
    } else {
      response = await fetch(`/api/v1/club/${clubSlug}/member?id=${queryId}`, {
        method: 'GET'
      })
    }
    const result = await response.json() as iGlobalResponse
    if (result.header.ok) {
      if (result.data.length > 0) {
        showResult = true
        listMember = result.data
      }
      
    } else { toastAlert.responseError(result) }
    processing = false
  }

  async function selectMember(member: iMemberPicker) {
    dispatch('memberSelected', member)
    showResult = false
  }
</script>

<div>
  <div class="form-control w-full">
    <label class="label">
      <span class="label-text">Search by member name</span>
      <span class="label-text">Search by member ID</span>
    </label>
    <form class="join" on:submit|preventDefault={searchMember}>
      <input type="text" class="input input-bordered w-full join-item" bind:value={queryName} />
      {#if processing}
        <button class="btn join-item no-animation hover:cursor-default"><span class="loading loading-dots"></span>Searching</button>
      {:else}
        <button class="btn btn-accent join-item"><Icon icon="ph:magnifying-glass-bold" width={20}/>Search</button>
      {/if}
      <input type="number" class="input input-bordered w-full join-item" bind:value={queryId} />
    </form>
  </div>
  {#if showResult}
    <ul class="menu bg-base-200 w-4/5 rounded-box">
      {#each listMember as member }
        <li on:click={() => selectMember(member)}>
          <div class="flex flex-row gap-4">
            <div>
              <Avatar seed={member.userData.uuid} />
            </div>
            <div class="flex flex-col">
              <h1><span class="font-bold text-primary">#{member.userData.id}</span> {member.userData.fullName}</h1>
              <h2 class="text-secondary">{member.userData.rtData.name}</h2>
            </div>
          </div>
        </li>  
      {/each}
    </ul>
  {/if}
</div>