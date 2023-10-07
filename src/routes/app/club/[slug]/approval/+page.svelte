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
  let listPending = data.listPending

  async function approvePending(id: number) {
    const payload: iMemberAction = {
      action: 'approvePending',
      targetId: id
    }
    const response = await fetch('/api/v1/club/actionmember', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const result: iGlobalResponse = await response.json()
    if (result.header.ok) {
      toastAlert.success('Success accepting member')
      invalidateAll()
    } else {
      toastAlert.responseError(result)
    }
  }

  async function rejectPending(id: number) {
    const payload: iMemberAction = {
      action: 'rejectPending',
      targetId: id
    }
    const response = await fetch('/api/v1/club/actionmember', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const result: iGlobalResponse = await response.json()
    if (result.header.ok) {
      toastAlert.success('Success rejecting member')
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
        <th>Roles</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each listPending as member}
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
          <td class="font-bold text-accent">{member.roleData.name}</td>
          <td>
            <Button text="Approve" color="success" on:click={() => approvePending(member.id)} />
            <Button text="Reject" color="error" on:click={() => rejectPending(member.id)} />
          </td>
        </tr>
      {/each}
    </tbody>
    <!-- foot -->
    <tfoot>
      <tr>
        <th>User Data</th>
        <th>Join Date</th>
        <th>Roles</th>
        <th>Action</th>
      </tr>
    </tfoot>
    
  </table>
</div>