<script lang="ts">
  //svelte
  import { page } from '$app/stores'
  import { invalidateAll } from "$app/navigation";
  //mylib
  import Navitem from 'ui/navigation/navitem.svelte'
  import type { iClubAction } from "interface/club";
  //icon
  import Icon from '@iconify/svelte'
  //skeleton
  import {getToastStore, getModalStore} from '@skeletonlabs/skeleton'

  export let data
  const toast = getToastStore()
  const modal = getModalStore()

  async function appealClub(){
    if (data.userMemberData && data.userMemberData.roleId == 301) {
      const payload: iClubAction = {actionId: 599}
      const response = await fetch(`/api/v1/private/club/${data.userMemberData.clubData.slug}/actionclub`, {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if (response.ok) {
        invalidateAll()
        toast.trigger({
          message: `Appeal for ${data.userMemberData.clubData.name} recorded`,
          background: 'variant-filled-success'
        })
      } else {
        toast.trigger({
          message: 'Failed to appeal your club, please contact admin',
          background: 'variant-filled-error'
        })
      }
    }
  }

</script>

<div class="grid grid-cols-1 lg:grid-cols-12 mt-8 mx-8 gap-8">
  <div class="lg:col-span-2">
    <ul class="card p-4 variant-filled w-full rounded-box">
      <li>
        <Navitem href={`/app/club/${$page.params.slug}/dashboard`} menu>Dashboard</Navitem>
      </li>
      <li>
        <Navitem href={`/app/club/${$page.params.slug}/member`} menu>Member</Navitem>
      </li>
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canApproveMember)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/approval`} menu>
            Member Approval 
            {#if data.totalPendingJoin > 0}
              <span class="badge variant-filled-success">{data.totalPendingJoin}</span>
            {/if}
          </Navitem>
        </li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canSubmitMatch)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/match`} menu>Record a Match</Navitem>
        </li>
      {/if}
      <li>
        <Navitem href={`/app/club/${$page.params.slug}/standing`} menu>Monthly Standing</Navitem>
      </li>
      <li>
        <Navitem href={`/app/club/${$page.params.slug}/pastmatch`} menu>Match History</Navitem>
      </li>
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canEditClubInfo)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/changeinfo`} menu>Change Club Info</Navitem>
        </li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canEditClubSetting)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/changesetting`} menu>Change Settings</Navitem>
        </li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canEditAccess)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/changeroles`} menu>Change Roles</Navitem>
        </li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canBuyCC)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/clubcredit`} menu>Manage Club Credit</Navitem>
        </li>
      {/if}
      <!-- <li><a data-sveltekit-preload-data href="/app/official/clubapproval" class={$page.url.pathname.includes('/clubapproval') ? "text-primary" : ""}>Club Approval <BadgeNotification total={data.totalPendingClub} /></a></li> -->
    </ul>
  </div>

  <div class="lg:col-span-10">    
    {#if [503, 504, 505, 506].includes(data.userMemberData.clubData.clubStatusId)}
      <aside class="alert variant-filled-error mb-4">
        <div class="h1"><Icon icon="mingcute:alert-octagon-line" /></div>
        <!-- Message -->
        <div class="alert-message">
          <h4 class="h3">
            Current club status: 
            <span class="font-bold uppercase">{data.userMemberData.clubData.statusData.name}</span>
          </h4>
          {#if [504, 505, 506].includes(data.userMemberData.clubData.clubStatusId)}
            <p>Reason: <span class="italic">{data.userMemberData.clubData.officialNotes}</span></p>
          {/if}
          <p>Can't accept member, change member access, record match, or participate in any tournament.</p>
        </div>
        {#if data.userMemberData.roleId == 301 && [504, 506].includes(data.userMemberData.clubData.clubStatusId)}
          <div>
            <button class="btn variant-filled" on:click={() => modal.trigger({
              type: 'confirm',
              title: 'Appeal your club',
              body: `Please double check your club to compliant to rules and notes from admin. There is a limit to how many a club can appeal.`,
              response: (res) => {
                if (res) appealClub()
              },
            })}>
              <span class="h3 mr-2"><Icon icon="mingcute:balance-line" /></span>
              Appeal Club
            </button>
          </div>
        {/if}
      </aside>
    {/if}
            
    <slot />
  </div>
</div>