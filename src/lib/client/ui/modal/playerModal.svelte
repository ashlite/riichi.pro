<script lang="ts">
//skeleton
import { getModalStore, getToastStore, ProgressRadial } from '@skeletonlabs/skeleton';
//svelte
import { onMount } from 'svelte';
//mylib
import type {iUserPublic} from 'interface/user'
import PlayerAvatar from 'ui/playerAvatar.svelte';
import {countryNameFromCode} from 'client-service/country'
import { dateFormater } from 'client-service/tools';
import { goto } from '$app/navigation';

const modalStore = getModalStore()
const toastStore = getToastStore()
let processing = true
let playerData: iUserPublic
onMount(async () => {
  processing = true
  const response = await fetch(`/api/v1/player/${$modalStore[0].meta.playerId}`)
  if (response.ok) {
    playerData = await response.json()
    processing = false
  } else {
    toastStore.trigger({
      message: `Error ${response.status}, ${response.statusText}`,
      background: 'variant-filled-error',
      timeout: 8000
    })
    modalStore.close()
  } 
})

function gotoClub(slug: string) {
  goto(`/club/${slug}`)
  modalStore.close()
}
							
</script>

{#if processing}
  <div class="card p-4">
    <header class="mx-auto flex flex-row justify-center">
      <ProgressRadial width="w-40" />
    </header>
  </div>
{:else}
  <div class="card w-full md:w-3/5 xl:w-2/5 h-4/5 p-4 overflow-y-scroll">
    <header class="card-header">
      <div class="flex flex-row items-center gap-4">
        <PlayerAvatar noLink playerAvatarUrl={playerData.avatarUrl} playerName={playerData.fullName} playerId={playerData.id} width="w-20" />
        <div class="flex flex-col">
          <h1 class="h1 truncate">{playerData.fullName}</h1>
          <h4 class="h4 truncate text-primary-500">{playerData.id}</h4>
        </div>
      </div>
    </header>
    <div class="grid grid-cols-2 my-4">
      <div class="flex flex-col">
        <p><span class="font-bold">Nationality: </span>{playerData.nationalityCountryCode ? countryNameFromCode(playerData.nationalityCountryCode) : 'none'}</p>
        <p><span class="font-bold">Residence: </span>{playerData.residenceCountryCode ? countryNameFromCode(playerData.residenceCountryCode) : 'none'}</p>
        <p><span class="font-bold">Gender: </span>{playerData.genderData?.name}</p>
      </div>
      <div class="flex flex-col">
        <p><span class="font-bold">Current Rank: </span>{playerData.rtData.name}</p>
        <p><span class="font-bold">Rank Points: </span>{playerData.currentRP}</p>
        <p><span class="font-bold">Tournament Points: </span>{playerData.currentRP}</p>
      </div>
    </div>

    <div>
      <h3 class="h3 my-2">Club Membership</h3>
      <div class="flex flex-col">
        {#if playerData.clubList}
          {#each playerData.clubList as club}
            <p>
              <span class="underline text-primary-500"><button on:click={() => gotoClub(club.clubData.slug)}>{club.clubData.name}</button></span>
              as <span>{club.roleData.name}</span></p>
          {/each}
        {/if}
      </div>
    </div>

    <div>
      <h3 class="h3 my-2">Player Metadata</h3>
      <div class="flex flex-col">
        <p><span class="font-bold">Total Match: </span>{playerData.metaData?.totalMatch}</p>
        <p><span class="font-bold">Total First Place: </span>{playerData.metaData?.totalFirst}</p>
        <p><span class="font-bold">Total Second Place: </span>{playerData.metaData?.totalSecond}</p>
        <p><span class="font-bold">Total Third Place: </span>{playerData.metaData?.totalThird}</p>
        <p><span class="font-bold">Total Fourth Place: </span>{playerData.metaData?.totalFourth}</p>
        <p><span class="font-bold">Total Chombo (Rate): </span>{playerData.metaData?.totalChombo} ({Math.round((playerData.metaData?.totalChombo ?? 0)/(playerData.metaData?.totalMatch ?? 0) * 10000)/100}%)</p>
        <p><span class="font-bold">Last Update: </span>{playerData.metaData?.updatedAt ? dateFormater(playerData.metaData?.updatedAt, 'date'):'never'}</p>
      </div>
    </div>
  </div>
{/if}