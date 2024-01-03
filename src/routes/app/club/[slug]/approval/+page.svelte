<script lang="ts">
  import type { PageData } from "./$types";
  import type { iMemberAction } from "interface/club";
  import type { iGlobalResponse } from "interface/utils";
  import Avatar from "atom/avatar.svelte";
  import { dateFormater } from "service/tools";
  import Button from "atom/button.svelte";
  import toastAlert from "store/toast";
  import { invalidateAll } from "$app/navigation";

  export let data: PageData

  async function applyAction(id: number, action: 'approvePending' | 'rejectPending' | 'approveMain' | 'rejectMain') {
    const payload: iMemberAction = {
      action: action,
      targetId: id
    }
    const response = await fetch(`/api/v1/club/${data.userMemberData.clubData.slug}/actionmember`, {
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
</script>

<div class="overflow-x-auto mb-8">
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
              <Avatar seed={member.userData.uuid} />
              <div class="flex flex-col">
                <div class="font-bold text-primary text-xl">{member.userData.fullName}</div>
                <div class="text-secondary">{member.userData.rtData.name} - {member.userData.currentRP}</div>
              </div>
            </div>
          </td>
          <td>{dateFormater(member.createdAt, 'date')}</td>
          <td class="font-bold">
            {#if member.roleId == 306}
              <span class="text-accent">Applying BASIC member</span>
            {:else if member.roleId == 305}
              <span class="text-warning">Applying MAIN member</span>
            {/if}
          </td>
          <td>
            {#if member.roleId == 306}
              <Button text="Approve" color="success btn-success" on:click={() => applyAction(member.id, 'approvePending')} />
              <Button text="Reject" color="error" on:click={() => applyAction(member.id, "approvePending")} />
            {:else if member.roleId == 305}
              <Button text="Approve" color="success btn-success" on:click={() => applyAction(member.id, 'approveMain')} />
              <Button text="Reject" color="error" on:click={() => applyAction(member.id, 'rejectMain')} />
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