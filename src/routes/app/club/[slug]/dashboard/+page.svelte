<script lang="ts">
  //Icon
  import Icon from "@iconify/svelte";
	//mylib
  import { countryNameFromCode } from "client-service/country";
  import { dateFormater } from "client-service/tools";
  import type { iMemberAction, iClubAction } from "interface/club";
  import Image from 'ui/image.svelte'
  //skeleton
  import { getToastStore, getModalStore } from '@skeletonlabs/skeleton'
  //svelte
  import {env} from '$env/dynamic/public'
	import { invalidateAll } from "$app/navigation";

  export let data
  $: clubData = data.userMemberData.clubData
  const baseEmblemUrl = env.PUBLIC_TEBI_CLUB_EMBLEM
  const baseCoverUrl = env.PUBLIC_TEBI_CLUB_COVER
  const toast = getToastStore()
  const modal = getModalStore()

  async function applyMain() {
    toast.trigger({
      message: 'Applying to become main member',
      background: 'variant-filled-warning'
    })
    const payload: iMemberAction = {action: 'applyMain', targetId: data.userMemberData.id}
    const response = await fetch(`/api/v1/private/club/${data.userMemberData.clubData.slug}/actionmember`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      invalidateAll()
      toast.trigger({
        message: 'Success applying to become member',
        background: 'variant-filled-success'
      })
    } else {
      toast.trigger({
        message: 'Failed to apply member',
        background: 'variant-filled-error'
      })
    }
  }

  async function exitClub() {
    if (data.userMemberData && data.userMemberData.roleId != 301) {
      toast.trigger({
        message: 'Quitting from club',
        background: 'variant-filled-warning'
      })
      const payload: iMemberAction = {action: 'quit', targetId: data.userMemberData.id}
      const response = await fetch(`/api/v1/private/club/${data.userMemberData.clubData.slug}/actionmember`, {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      if (response.ok) {
        invalidateAll()
        toast.trigger({
          message: `Quit from ${data.userMemberData.clubData.name}`,
          background: 'variant-filled-success'
        })
      } else {
        toast.trigger({
          message: 'Failed to quit club, please contact admin',
          background: 'variant-filled-error'
        })
      }
    }
  }

</script>

<div class="w-full">
  {#if clubData.coverFile}
    <div class="w-full">
      <Image src={baseCoverUrl + clubData.coverFile} objectCover maxH={60} errorSrc="https://placehold.co/2000x400?text=Failed+to+load" />
    </div>  
  {/if}
  <div class="flex flex-col lg:flex-row gap-4">
    <div class="w-40 border-4 border-white shadow-xl rounded-lg">
      <Image src={baseEmblemUrl + clubData.emblemFile} objectContain errorSrc="https://placehold.co/400x400?text=No+Img+400x400+px"/>
    </div>
    <div>
      <h1 class="h1 font-bold my-4">{clubData.name}</h1>
      <div class="flex flex-row mb-8 gap-4 flex-wrap">
        <a class="btn variant-filled-primary" href={`/club/${clubData.slug}`}>
          <span class="h3 mr-2"><Icon icon="mingcute:calendar-day-line" /></span>
          Check Page
        </a>
        {#if data.userMemberData.roleId != 301}
          <button class="btn variant-filled-primary" on:click={() => modal.trigger({
            type: 'confirm',
            title: 'Confirmation',
            body: `Are you sure you want to quit from club ${clubData.name}?`,
            response: (res) => {
              if (res) exitClub()
            },
          })}>
            <span class="h3 mr-2"><Icon icon="mingcute:exit-line" /></span>
            Quit Club
          </button>
        {/if}
        {#if data.userMemberData.roleId == 304}
          <button class="btn variant-filled-primary" on:click={applyMain}>
            <span class="h3 mr-2"><Icon icon="mingcute:idcard-line" /></span>
            Apply Main Member
          </button>
        {/if}
        
      </div>
    </div>
  </div>
</div>
<div class="card p-4 variant-filled shadow-xl mt-8">
  <h2 class="h2 font-bold text-primary-500">Profile</h2>
  <p>
    <span class="font-bold">Country :</span>
    <span>{countryNameFromCode(clubData.countryISO2)}</span>
  </p>
  <p>
    <span class="font-bold">Address :</span>
    <span>{clubData.address}, {clubData.district ?? ''}</span>
  </p>
  <p>
    <span class="font-bold">Email :</span>
    <span>{clubData.emailContact ?? ''}</span>
  </p>
  <p>
    <span class="font-bold">Phone :</span>
    <span>{clubData.phoneContact ?? ''}</span>
  </p>
  <p>
    <span class="font-bold">Website :</span>
    {#if clubData.website}
      <a href={clubData.website} data-sveltekit-preload-data="tap" target="_blank" class="underline">{clubData.website}</a>
    {/if}
  </p>
  
  <h2 class="h2 font-bold text-primary-500 mt-8">Meta</h2>
  <div>
    <p class="font-bold">
      Club Status :
      {#if [501, 599].includes(clubData.clubStatusId)}
        <span class="badge variant-filled-warning">{clubData.statusData.name}</span>
      {:else if clubData.clubStatusId == 502}
        <span class="badge variant-filled-success">{clubData.statusData.name}</span>
      {:else}
        <span class="badge variant-filled-error">{clubData.statusData.name}</span>
      {/if}
    </p>
  </div>
  <p>
    <span class="font-bold">Total Member / Main :</span>
    <span>{clubData.totalMember} / {clubData.totalMainMember}</span>
  </p>
  <p>
    <span class="font-bold">Club Credit :</span>
    <span>{clubData.currentCC} CC</span>
  </p>
  <p>
    <span class="font-bold">Created At :</span>
    <span>{dateFormater(clubData.createdAt, 'date')}</span>
  </p>
</div>
<div class="card p-4 variant-filled shadow-xl my-4">
  <header>
    <h2 class="h2 font-bold text-primary-500">Settings</h2>
  </header>
  <div class="card-body">
    <div class="flex flex-col gap-4 gap-y-1">
      <!-- <h2 class="font-bold flex flex-row items-center gap-2">
        Accept Autotable
        {#if clubData.clubSetting?.acceptAutotable}
          <span class="h3 text-success-500">
            <Icon icon="mingcute:checkbox-fill" />
          </span>
        {:else}
          <span class="h3 text-error-500">
            <Icon icon="mingcute:square-line" />
          </span>
        {/if}
      </h2> -->
      <h2 class="font-bold flex flex-row items-center gap-2">
        Auto Approve
        {#if clubData.clubSetting?.autoApproveMember}
          <span class="h3 text-success-500">
            <Icon icon="mingcute:checkbox-fill" />
          </span>
        {:else}
          <span class="h3 text-error-500">
            <Icon icon="mingcute:square-line" />
          </span>
        {/if}
      </h2>
      <h2 class="font-bold flex flex-row items-center gap-2">
        Hide Contact
        {#if clubData.clubSetting?.hideContact}
          <span class="h3 text-success-500">
            <Icon icon="mingcute:checkbox-fill" />
          </span>
        {:else}
          <span class="h3 text-error-500">
            <Icon icon="mingcute:square-line" />
          </span>
        {/if}
      </h2>
      <h2 class="font-bold flex flex-row items-center gap-2">
        UMA : <span class="font-normal">{clubData.clubSetting?.firstUma} / {clubData.clubSetting?.secondUma} / {clubData.clubSetting?.thirdUma} / {clubData.clubSetting?.fourthUma}</span>
      </h2>
      <h2 class="font-bold flex flex-row items-center gap-2">
        Chombo Penalty: <span class="font-normal">{clubData.clubSetting?.chomboPenalty}</span>
      </h2>
      <h2 class="font-bold flex flex-row items-center gap-2">
        Additional Penalty : <span class="font-normal">{clubData.clubSetting?.chomboPenaltyOther ?? 'none'}</span>
      </h2>
      <h2 class="font-bold flex flex-row items-center gap-2">
        Yakuman Bonus : <span class="font-normal">{clubData.clubSetting?.yakumanBonus}</span>
      </h2>
      <h2 class="font-bold flex flex-row items-center gap-2">
        Additional Bonus : <span class="font-normal">{clubData.clubSetting?.yakumanBonusOther ?? 'none'}</span>
      </h2>
    </div>
  </div>
</div>

