<script lang="ts">
  //skeleton
  import { Avatar, getModalStore, getToastStore } from '@skeletonlabs/skeleton'
  //mylib
  import { dateFormater } from "client-service/tools.js";
  import type {iMemberAction} from 'interface/club.js'
  import PlayerAvatar from 'ui/playerAvatar.svelte'
  //Icon
  import Icon from '@iconify/svelte'
  //svelte
  import { invalidateAll } from '$app/navigation'

  export let data
  const modal = getModalStore()
  const toast = getToastStore()

  function kickMember(id: number, fullName: string) {
    modal.trigger({
      type: 'confirm',
      title: 'Kick a player',
      body: `Are you sure you want to kick ${fullName}?`,
      response: async (r) => {
        if (r) {
          const payload: iMemberAction = {action: 'kick', targetId: id}
          const response = await fetch(`/api/v1/private/club/${data.userMemberData.clubData.slug}/actionmember`, {
            method: 'POST',
            body: JSON.stringify(payload)
          })
          // const result = await response.json()
          if (response.ok) {
            toast.trigger({
              message: `Success kicking ${fullName}`,
              background: 'variant-filled-success'
            })
            invalidateAll()
          } else {
            toast.trigger({
              message: `Failed kicking ${fullName}. If the problem still persist, please contact admin.`,
              background: 'variant-filled-error'
            })
          }
        }
      }
    })
  }
</script>

<div class="table-container mb-8">
  <table class="table table-hover">
    <thead>
      <tr>
        <th>User Data</th>
        <th>Join Date</th>
        <th>Roles</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each data.listMember as member}
        <tr>
          <td>
            <div class="flex flex-row gap-4 items-center">
              <PlayerAvatar playerAvatarUrl={member.userData.avatarUrl} playerId={member.userData.id} playerName={member.userData.fullName} width="w-20" />
              <div class="flex flex-col">
                <h3 class="h3 font-bold text-primary-600-300-token text-xl">{member.userData.fullName}</h3>
                <div class="">{member.userData.rtData.name} - {member.userData.currentRP}</div>
              </div>
            </div>
          </td>
          <td>{dateFormater(member.createdAt, 'date')}</td>
          <td class="font-bold">
            {#if member.roleData.id == 301}
              <span class="badge variant-filled-primary">{member.roleData.name}</span>
            {:else if member.roleData.id == 302}
              <span class="badge variant-filled-secondary">{member.roleData.name}</span>
            {:else if member.roleData.id == 303}
              <span class="badge variant-filled-tertiary">{member.roleData.name}</span>
            {:else}
              <span class="badge variant-filled">{member.roleData.name}</span>
            {/if}
          </td>
          <td class="flex flex-row">
            {#if data.userMemberData.roleId < 303 && data.userMemberData.roleId < member.roleId && data.userMemberData.userId != member.userId}
              <div>
                <button class="btn variant-filled-error" on:click={() => kickMember(member.id, member.userData.fullName)}>
                  <span class="h3 mr-2"><Icon icon="mingcute:user-x-line" /></span>
                  Kick
                </button>
              </div>  
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
        <th>Roles</th>
        <th>Action</th>
      </tr>
    </tfoot>
    
  </table>
</div>