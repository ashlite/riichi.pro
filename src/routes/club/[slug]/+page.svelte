<script lang="ts">
  //Icon
  import Icon from "@iconify/svelte";
	//mylib
  import { countryNameFromCode } from "client-service/country";
  import { dateFormater } from "client-service/tools";
  import PlayerAvatar from "ui/playerAvatar.svelte";
  import Image from 'ui/image.svelte'
  //skeleton
  import { getToastStore, getModalStore, Avatar } from '@skeletonlabs/skeleton'
  //svelte
  import {env} from '$env/dynamic/public'
	import { invalidateAll } from "$app/navigation";

  export let data
  const clubData = data.clubData
  const baseEmblemUrl = env.PUBLIC_TEBI_CLUB_EMBLEM
  const baseCoverUrl = env.PUBLIC_TEBI_CLUB_COVER
  const toast = getToastStore()
  const modal = getModalStore()
  console.log(data.userMemberData)

  async function joinClub() {
    const response = await fetch(`/api/v1/private/club/${data.clubData.slug}/member`, {
      method: 'POST'
    })
    if (response.ok) {
      invalidateAll()
      toast.trigger({
        message: `Success applying to ${data.clubData.name}`,
        background: 'variant-filled-success'
      })
    } else {
      toast.trigger({
        message: 'Failed to apply club',
        background: 'variant-filled-error'
      })
    }
  }
</script>

<div class="w-4/5 mx-auto">
  <div class="w-full mt-4">
    {#if clubData.coverFile}
      <div class="w-full max-h-60">
        <Image src={baseCoverUrl + clubData.coverFile} objectCover maxH={60} errorSrc="https://placehold.co/2000x400?text=Failed+to+load" />
      </div>
    {/if}
    <div class="flex flex-col md:flex-row items-center gap-4">
      <div class="w-32 md:w-40 border-4 border-white shadow-xl rounded-lg">
        <Image src={baseEmblemUrl + clubData.emblemFile} objectContain errorSrc="https://placehold.co/400x400?text=No+Img"/>
      </div>
      <div class="flex flex-col gap-4 py-4">
        <h1 class="h1 font-bold truncate text-center md:text-left">{clubData.name}</h1>
        <div class="flex flex-col md:flex-row gap-4">
          <a class="btn variant-filled-primary" href={`/club/${data.clubData.slug}/standing`}>
            Uma Standing
          </a>
          <a class="btn variant-filled-primary" href={`/club/${data.clubData.slug}/member`}>
            Member List
          </a>
          {#if data.userMemberData && data.userMemberData.roleId < 306}
            <a class="btn variant-filled-primary" href={`/app/club/${data.clubData.slug}/dashboard`}>
              Dashboard
            </a>
          {/if}
          {#if !data.userMemberData && data.user}
            <button class="btn variant-filled-success" on:click={() => modal.trigger({
              type: 'confirm',
              title: 'Confirmation',
              body: `Are you sure you want to join club ${clubData.name}?`,
              response: (res) => {
                if (res) joinClub()
              },
            })}>
              Join Club
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
  {#if clubData.description}
    <p class="text-justify whitespace-pre-wrap md:mx-12 my-8">{clubData.description}</p>
  {/if}
  <div class="mt-8 flex flex-col lg:flex-row gap-4 mb-8">
    <div class="card p-4 w-full lg:w-1/3 variant-filled shadow-xl">
      <div class="card-body">
        <h2 class="text-center font-bold text-2xl">Club Profile</h2>
        <div class="grid grid-cols-3 gap-4 gap-y-1">
          <h2 class="text-right font-bold text-nowrap">Country :</h2>
          <p class="col-span-2">{countryNameFromCode(clubData.countryISO2)}</p>
          {#if !clubData.clubSetting?.hideContact}
            <h2 class="text-right font-bold text-nowrap">Address :</h2>
            <p class="col-span-2">{clubData.address}, {clubData.district ?? ''}</p>
            <h2 class="text-right font-bold text-nowrap">Email :</h2>
            <p class="col-span-2">{clubData.emailContact}</p>
            <h2 class="text-right font-bold text-nowrap">Phone :</h2>
            <p class="col-span-2">{clubData.phoneContact}</p>
            <h2 class="text-right font-bold text-nowrap">Website :</h2>
            <a href={clubData.website} data-sveltekit-preload-data="tap" target="_blank" class="underline">{clubData.website}</a>
          {/if}
        </div>
      </div>
    </div>
    <div class="card p-4 w-full lg:w-1/3 variant-filled shadow-xl">
      <div class="card-body">
        <h2 class="text-center font-bold text-2xl">Meta Data</h2>
        <div class="grid grid-cols-2 gap-4 gap-y-1">
          <h2 class="text-right font-bold">Total Member :</h2>
          <p>{clubData.totalMember}</p>
          <h2 class="text-right font-bold">Main Member :</h2>
          <p>{clubData.totalMainMember}</p>
          <h2 class="text-right font-bold">Club Credit :</h2>
          <p>{clubData.currentCC} CC</p>
          <h2 class="text-right font-bold">Created At :</h2>
          <p>{dateFormater(clubData.createdAt, 'date')}</p>
        </div>
      </div>
    </div>
    <div class="card p-4 w-full lg:w-1/3 variant-filled shadow-xl">
      <div class="card-body">
        <h2 class="text-center font-bold text-2xl">Settings</h2>
        <div class="flex flex-col items-center gap-4 gap-y-1">
          <h2 class="font-bold flex flex-row items-center gap-2">
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
          </h2>
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
            UMA : <span class="font-normal">{clubData.clubSetting?.firstUma} / {clubData.clubSetting?.secondUma} / {clubData.clubSetting?.thirdUma} / {clubData.clubSetting?.fourthUma}</span>
          </h2>
          <h2 class="font-bold flex flex-row items-center gap-2">
            Chombo Penalty: <span class="font-normal">{clubData.clubSetting?.chomboPenalty}</span>
          </h2>
          <h2 class="font-bold flex flex-row items-center gap-2">
            Yakuman Bonus : <span class="font-normal">{clubData.clubSetting?.yakumanBonus}</span>
          </h2>
        </div>
      </div>
    </div>
  </div>
  <div class="h2 w-full text-left border-b-2 border-primary-500 mb-2">MEMBER</div>
  <div class="flex flex-row flex-wrap gap-4 mb-8">
    {#each data.listMember as member }
      <div class="">
        <PlayerAvatar playerAvatarUrl={member.userData.avatarUrl} playerId={member.userData.id} playerName={member.userData.fullName} />
      </div>
    {/each}
    <a href={`/club/${data.clubData.slug}/member`} class="btn w-24 h-24 md:h-32 md:w-32 variant-soft-primary rounded-full h3 text-wrap">
      Show more
    </a>
  </div>
</div>
