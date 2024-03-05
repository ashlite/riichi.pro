<script lang="ts">
  //mylib
  import type { iMemberAction } from "interface/club";
  import type { iGlobalResponse } from "interface/utils";
  //skeleton
  import { Avatar, getToastStore, getModalStore } from '@skeletonlabs/skeleton'
  import { invalidateAll } from "$app/navigation";
	import PlayerAvatar from "ui/playerAvatar.svelte";

  export let data
  const modal = getModalStore()
  const toast = getToastStore()

  async function applyAction(id: number, action: 'transferOwnership' | 'becomeAdmin' | 'kickAdmin') {
    const payload: iMemberAction = {
      action: action,
      targetId: id
    }
    const response = await fetch(`/api/v1/private/club/${data.userMemberData.clubData.slug}/actionmember`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    // const result = await response.json()
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

  async function updateAccess(i: number) {
    const payload = {
      canApproveMember: data.listMember[i].canApproveMember,
      canEditClubInfo: data.listMember[i].canEditClubInfo,
      canEditClubSetting: data.listMember[i].canEditClubSetting,
      canSubmitMatch: data.listMember[i].canSubmitMatch,
      canEditAccess: data.listMember[i].canEditAccess,
      canSubmitTournament: data.listMember[i].canSubmitTournament,
      canBuyCC: data.listMember[i].canBuyCC,
      targetId: data.listMember[i].id,
      type: 'access'
    }

    const response = await fetch(`/api/v1/club/${data.userMemberData.clubData.slug}/member`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      toast.trigger({
        message:'Success saving access',
        background: 'variant-filled-success'
      })
      invalidateAll()
    } else {
      toast.trigger({
        message:'Error when updating access, please contact admin if the problem still persist.',
        background: 'variant-filled-error'
      })
    }
  }
</script>

<h1 class="text-4xl mb-4">Admin access setting</h1>

<div class="table-container mb-8">
  <table class="table table-compact">
    <thead>
      <tr>
        <th>User Data</th>
        <th class="text-center">Approval</th>
        <th class="text-center">Update Info</th>
        <th class="text-center">Update Setting</th>
        <th class="text-center">Input Match</th>
        <th class="text-center">Update Access</th>
        <th class="text-center">Manage Tournament</th>
        <th class="text-center">Manage CC</th>
        <th class="text-end">Action</th>
      </tr>
    </thead>
    <tbody>
      {#each data.listMember as member, index}
        {#if member.roleId == 301}
          <tr>
            <td>
              <div class="flex flex-row gap-4">
                <PlayerAvatar playerAvatarUrl={member.userData.avatarUrl} playerId={member.userData.id} playerName={member.userData.fullName} width="w-16" />
                <div class="flex flex-col">
                  <div class="font-bold text-primary-600-300-token text-xl truncate">{member.userData.fullName}</div>
                  {#if member.roleData.id == 301}
                    <span class="badge variant-filled-primary">{member.roleData.name}</span>
                  {:else if member.roleData.id == 302}
                    <span class="badge variant-filled-secondary">{member.roleData.name}</span>
                  {:else if member.roleData.id == 303}
                    <span class="badge variant-filled-tertiary">{member.roleData.name}</span>
                  {:else}
                    <span class="badge variant-filled">{member.roleData.name}</span>
                  {/if}
                </div>
              </div>
            </td>
            <td class="text-center"><input type="checkbox" checked class="checkbox" disabled /></td>
            <td class="text-center"><input type="checkbox" checked class="checkbox" disabled /></td>
            <td class="text-center"><input type="checkbox" checked class="checkbox" disabled /></td>
            <td class="text-center"><input type="checkbox" checked class="checkbox" disabled /></td>
            <td class="text-center"><input type="checkbox" checked class="checkbox" disabled /></td>
            <td class="text-center"><input type="checkbox" checked class="checkbox" disabled /></td>
            <td class="text-center"><input type="checkbox" checked class="checkbox" disabled /></td>
            <td></td>
          </tr>
        {:else}
          <tr>
            <td>
              <div class="flex flex-row gap-4">
                <PlayerAvatar playerAvatarUrl={member.userData.avatarUrl} playerId={member.userData.id} playerName={member.userData.fullName} width="w-16" />
                <div class="flex flex-col">
                  <div class="font-bold text-primary-600-300-token text-xl truncate">{member.userData.fullName}</div>
                  {#if member.roleData.id == 301}
                    <span class="badge variant-filled-primary">{member.roleData.name}</span>
                  {:else if member.roleData.id == 302}
                    <span class="badge variant-filled-secondary">{member.roleData.name}</span>
                  {:else if member.roleData.id == 303}
                    <span class="badge variant-filled-tertiary">{member.roleData.name}</span>
                  {:else}
                    <span class="badge variant-filled">{member.roleData.name}</span>
                  {/if}
                </div>
              </div>
            </td>
            <td class="text-center">
              <input type="checkbox" class="checkbox" bind:checked={member.canApproveMember} disabled={member.roleId == 303 ? true : false} />
            </td>
            <td class="text-center"><input type="checkbox" class="checkbox" bind:checked={member.canEditClubInfo} disabled={member.roleId == 303 ? true : false}/></td>
            <td class="text-center"><input type="checkbox" class="checkbox" bind:checked={member.canEditClubSetting} disabled={member.roleId == 303 ? true : false}/></td>
            <td class="text-center"><input type="checkbox" class="checkbox" bind:checked={member.canSubmitMatch} disabled={member.roleId == 303 ? true : false}/></td>
            <td class="text-center"><input type="checkbox" class="checkbox" bind:checked={member.canEditAccess} disabled={member.roleId == 303 ? true : false}/></td>
            <td class="text-center"><input type="checkbox" class="checkbox" bind:checked={member.canSubmitTournament} disabled={member.roleId == 303 ? true : false}/></td>
            <td class="text-center"><input type="checkbox" class="checkbox" bind:checked={member.canBuyCC} disabled={member.roleId == 303 ? true : false}/></td>
            <td class="flex flex-col gap-2">
              <button class="btn variant-filled-success btn-sm" on:click={() => updateAccess(index)}>
                Save Access
              </button>
              {#if member.roleData.id == 302}
                <button class="btn btn-sm variant-filled" on:click={() => applyAction(member.id, 'kickAdmin')}>
                  Revoke Admin
                </button>
                {#if data.userMemberData.roleId == 301}
                  <button class="btn btn-sm variant-filled" on:click={() => applyAction(member.id, 'transferOwnership')}>
                    Transfer Ownership
                  </button>
                {/if}
              {:else if member.roleData.id == 303}
                <button class="btn btn-sm variant-filled" on:click={() => applyAction(member.id, 'becomeAdmin')}>
                  Set as Admin
                </button>
              {/if}
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
    <!-- foot -->
    <tfoot>
      <tr>
        <th>User Data</th>
        <th class="text-center">Approval</th>
        <th class="text-center">Update Info</th>
        <th class="text-center">Update Setting</th>
        <th class="text-center">Input Match</th>
        <th class="text-center">Update Access</th>
        <th class="text-center">Manage Tournament</th>
        <th class="text-center">Manage CC</th>
        <th class="text-end">Action</th>
      </tr>
    </tfoot>
    
  </table>
</div>