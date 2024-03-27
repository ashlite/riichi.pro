<script lang="ts">
  //mylib
  import type { iMemberAction } from "interface/club";
  import type { iGlobalResponse } from "interface/utils";
  import { dateFormater } from "client-service/tools.js";
  //skeleton
  import { Avatar, getToastStore } from '@skeletonlabs/skeleton'
  //svelte  
  import { invalidateAll } from "$app/navigation";
	import PlayerAvatar from "ui/playerAvatar.svelte";
  //icon
  import Icon from '@iconify/svelte'

  export let data
  const toast = getToastStore()

  async function applyAction(id: number, action: 'approvePending' | 'rejectPending' | 'approveMain' | 'rejectMain') {
    const payload: iMemberAction = {
      action: action,
      targetId: id
    }
    const response = await fetch(`/api/v1/private/club/${data.userMemberData.clubData.slug}/actionmember`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const result = await response.json()
    if (response.ok) {
      toast.trigger({
        message:'Success applying action',
        background: 'variant-filled-success'
      })
      invalidateAll()
    } else {
      toast.trigger({
        message:'Failed applying action',
        background: 'variant-filled-error'
      })
    }
  }
</script>

<div class="table-container mb-8">
  <table class="table">
    <thead>
      <tr>
        <th>User Data</th>
        <th>Join Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each data.listPending as member}
        <tr>
          <td>
            <div class="flex flex-row gap-4">
              <PlayerAvatar playerAvatarUrl={member.userData.avatarUrl} playerId={member.userData.id} playerName={member.userData.fullName} width="w-20" />
              <div class="flex flex-col">
                <h3 class="h3 font-bold text-primary-600-300-token">{member.userData.fullName}</h3>
                <div class="">{member.userData.rtData.name} - {member.userData.currentRP}</div>
              </div>
            </div>
          </td>
          <td>{dateFormater(member.createdAt, 'date')}</td>
          <td class="font-bold">
            {#if member.roleId == 306}
              <span class="">Applying BASIC member</span>
            {:else if member.roleId == 305}
              <span class="">Applying MAIN member</span>
            {/if}
          </td>
          <td>
            {#if data.userMemberData.clubData.clubStatusId == 502}
              {#if member.roleId == 306}
                <button class="btn variant-filled-success" on:click={() => applyAction(member.id, 'approvePending')} >
                  <span class="h4"><Icon icon="mingcute:check-line" /></span>
                  Approve
                </button>
                <button class="btn variant-filled-error" on:click={() => applyAction(member.id, "approvePending")} >
                  <span class="h4"><Icon icon="mingcute:close-line" /></span>
                  Reject
                </button>
              {:else if member.roleId == 305}
                <button class="btn variant-filled-success" on:click={() => applyAction(member.id, 'approveMain')} >
                  <span class="h4"><Icon icon="mingcute:check-line" /></span>
                  Approve
                </button>
                <button class="btn variant-filled-error" on:click={() => applyAction(member.id, 'rejectMain')} >
                  <span class="h4"><Icon icon="mingcute:close-line" /></span>
                  Reject
                </button>
              {/if}
              
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
    <!-- foot -->
    <tfoot>
      <tr>
        <th>User Data</th>
        <th>Join Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </tfoot>
    
  </table>
</div>