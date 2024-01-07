<script lang="ts">
  import type { PageData } from "./$types";
  import type { iMemberAction } from "interface/club";
  import type { iGlobalResponse } from "interface/utils";
  import Avatar from "atom/avatar.svelte";
  import Button from "atom/button.svelte";
	import globalModal from "store/modal";
  import toastAlert from "store/toast";
  import { invalidateAll } from "$app/navigation";

  export let data: PageData

  async function applyAction(id: number, action: 'transferOwnership' | 'becomeAdmin' | 'kickAdmin') {
    const payload: iMemberAction = {
      action: action,
      targetId: id
    }
    const response = await fetch(`/api/v1/private/club/${data.userMemberData.clubData.slug}/actionmember`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const result: iGlobalResponse = await response.json()
    if (result.header.ok) {
      toastAlert.success('Success applying action')
      invalidateAll()
    } else {
      toastAlert.responseError(result)
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
    const result: iGlobalResponse = await response.json()
    if (result.header.ok) {
      toastAlert.success('Success saving access')
      invalidateAll()
    } else {
      toastAlert.responseError(result)
    }
  }
</script>

<h1 class="text-4xl mb-4">Admin access setting</h1>

<div class="overflow-x-auto mb-8">
  <table class="table">
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
                <Avatar user={member.userData} />
                <div class="flex flex-col">
                  <div class="font-bold text-primary text-xl text-ellipsis">{member.userData.fullName}</div>
                  {#if member.roleData.id == 301}
                    <span class="badge badge-primary">{member.roleData.name}</span>
                  {:else if member.roleData.id == 302}
                    <span class="badge badge-secondary">{member.roleData.name}</span>
                  {:else if member.roleData.id == 303}
                    <span class="badge badge-warning">{member.roleData.name}</span>
                  {:else}
                    <span class="text-accent">{member.roleData.name}</span>
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
                <Avatar user={member.userData} />
                <div class="flex flex-col">
                  <div class="font-bold text-primary text-xl">{member.userData.fullName}</div>
                  {#if member.roleData.id == 301}
                    <span class="badge badge-primary">{member.roleData.name}</span>
                  {:else if member.roleData.id == 302}
                    <span class="badge badge-secondary">{member.roleData.name}</span>
                  {:else if member.roleData.id == 303}
                    <span class="badge badge-warning">{member.roleData.name}</span>
                  {:else}
                    <span class="text-accent">{member.roleData.name}</span>
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
              <Button text="Save Access" color="success" full size="sm" on:click ={() => updateAccess(index)} />
              {#if member.roleData.id == 302}
                <Button text="Revoke Admin" size="sm" color="info" on:click={() => applyAction(member.id, 'kickAdmin')} />
                {#if data.userMemberData.roleId == 301}
                  <Button text="Transfer Ownership" size="sm" color="info" on:click={() => applyAction(member.id, 'transferOwnership')} />
                {/if}
              {:else if member.roleData.id == 303}
                <Button text="Set as Admin" color="info" size="sm" on:click={() => applyAction(member.id, 'becomeAdmin')}  />
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
        <th class="text-center">Info</th>
        <th class="text-center">Setting</th>
        <th class="text-center">Match</th>
        <th class="text-center">Access</th>
        <th class="text-end">Action</th>
      </tr>
    </tfoot>
    
  </table>
</div>