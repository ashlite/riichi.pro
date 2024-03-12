<script lang="ts">
//mylib
import type { iGlobalResponse } from "interface/utils";
import PlayerAvatar from "ui/playerAvatar.svelte";
import type { iClubOfficialAction } from "interface/club.js";
//svelte
import { invalidateAll } from "$app/navigation";
import { countryNameFromCode } from "client-service/country";
//icon
import Icon from "@iconify/svelte";
//skeleton
import {getModalStore, getToastStore} from '@skeletonlabs/skeleton'

export let data
let processing = false
const modal = getModalStore()
const toast = getToastStore()

async function clubPost(actionId: number, clubUuid: string, notes: string | null = null): Promise<void> {
  processing = true
  const payload: iClubOfficialAction = {
    actionId: actionId,
    notes: notes,
  }
  
  if (payload.actionId > 0) {
    const response = await fetch(`/api/v1/private/official/actionclub/${clubUuid}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const result: iGlobalResponse = await response.json()
    if (result.header.ok) {
      invalidateAll()
      toast.trigger({
        message: 'Success processing',
        background: 'variant-filled-success'
      })
    } else {
      toast.trigger({
        message: result.header.error!,
        background: 'variant-filled-error'
      })
    }
    processing = false
  }
}

</script>

<div class="overflow-x-auto">
  <table class="table table-zebra">
    <!-- head -->
    <thead class="bg-secondary text-secondary-content">
      <tr>
        <th>Club</th>
        <th>Contact</th>
        <th>Owner</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each data.listApproval as club}
        <tr>
          <td class="flex flex-col">
            <h1 class="font-bold">{club.name}</h1>
            <p>{countryNameFromCode(club.countryISO2)}</p>
            <p>slug: <span class="text-primary-500">{club.slug}</span></p>
          </td>
          <td>
            <div class="flex flex-col">
              <div>email: {club.emailContact ?? 'none'}</div>
              <div>phone: {club.phoneContact ?? 'none'}</div>
              <div>website: {club.website ?? 'none'}</div>
            </div>
          </td>
          <td>
            <PlayerAvatar playerAvatarUrl={club.memberList[0].userData.avatarUrl} playerId={club.memberList[0].userData.id} playerName={club.memberList[0].userData.fullName} width="w-20" />
          </td>
          <td>
            <button class="btn variant-filled-success" on:click={() => {
              modal.trigger({
                type: 'confirm',
                title: 'Club Approval',
                body: 'Are you sure you wish to approve this club?',
                response: (r) => {
                  if(r) {
                    clubPost(502, club.id)
                  }
                },
              })
            }}>
              <span><Icon icon="mingcute:check-line" /></span>
              Approve
            </button>
            <button class="btn variant-filled-error" on:click={() => {
              modal.trigger({
                type: 'prompt',
                title: 'Reject a club creation',
                body: 'Please provide reason for rejecting this club',
                value: 'inappropriate name',
                valueAttr: { type: 'text', minlength: 3, required: true, class: 'input p-2' },
                response: (r) => {
                  clubPost(506, club.id, r)
                },
              })
            }}>
              <span><Icon icon="mingcute:close-line" /></span>
              Reject
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>