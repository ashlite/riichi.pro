<script lang="ts">
  import type { PageData } from "./$types";
  import Image from "atom/image.svelte";
  import Icon from "@iconify/svelte";
	import { countryNameFromCode } from "service/country";
  import { dateFormater } from "service/tools";
  import {env} from '$env/dynamic/public'

  export let data: PageData
  const clubData = data.userMemberData.clubData
  const baseEmblemUrl = env.PUBLIC_TEBI_CLUB_EMBLEM
  const baseCoverUrl = env.PUBLIC_TEBI_CLUB_COVER
</script>

<div class="w-full relative h-80">
  <div class="w-full max-h-60">
    <Image src={baseCoverUrl + clubData.coverFile} objectCover maxH={60} errorSrc="https://placehold.co/2000x400?text=No+Img,+recomended+ratio+5:1+px" />
  </div>
  <div class="w-40 h-40 border-4 border-white shadow-xl absolute top-40 left-12 rounded-lg">
    <Image src={baseEmblemUrl + clubData.emblemFile} objectContain errorSrc="https://placehold.co/400x400?text=No+Img+400x400+px"/>
  </div>
  <div class="absolute left-60 top-64 text-4xl font-bold">{clubData.name}</div>
</div>
{#if clubData.description}
  <p class="text-justify whitespace-pre-wrap px-12">{clubData.description}</p>
{/if}
<div class="mt-8 flex flex-row gap-4 mb-8">
  <div class="card w-1/3 bg-primary text-primary-content shadow-xl">
    <div class="card-body">
      <h2 class="text-center font-bold text-2xl">Profile</h2>
      <div class="grid grid-cols-2 gap-4 gap-y-1">
        <h2 class="text-right font-bold">Country :</h2>
        <p>{countryNameFromCode(clubData.countryISO2)}</p>
        <h2 class="text-right font-bold">Address :</h2>
        <p>{clubData.address}, {clubData.district ?? ''}</p>
        <h2 class="text-right font-bold">Email :</h2>
        <p>{clubData.emailContact}</p>
        <h2 class="text-right font-bold">Phone :</h2>
        <p>{clubData.phoneContact}</p>
        <h2 class="text-right font-bold">Website :</h2>
        <a href={clubData.website} target="_blank" class="underline">{clubData.website}</a>
      </div>
    </div>
  </div>
  <div class="card w-1/3 bg-secondary text-secondary-content shadow-xl">
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
  <div class="card w-1/3 bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="text-center font-bold text-2xl">Settings</h2>
      <div class="flex flex-col items-center gap-4 gap-y-1">
        <h2 class="font-bold flex flex-row items-center gap-2">
          Accept Autotable
          {#if clubData.clubSetting?.acceptAutotable}
            <span class="text-success text-2xl">
              <Icon icon="ph:check-square-fill" />
            </span>
          {:else}
            <span class="text-error text-2xl">
              <Icon icon="ph:x-square-fill" />
            </span>
          {/if}
        </h2>
        <h2 class="font-bold flex flex-row items-center gap-2">
          Auto Approve
          {#if clubData.clubSetting?.autoApproveMember}
            <span class="text-success text-2xl">
              <Icon icon="ph:check-square-fill" />
            </span>
          {:else}
            <span class="text-error text-2xl">
              <Icon icon="ph:x-square-fill" />
            </span>
          {/if}
        </h2>
        <h2 class="font-bold flex flex-row items-center gap-2">
          Hide Contact
          {#if clubData.clubSetting?.hideContact}
            <span class="text-success text-2xl">
              <Icon icon="ph:check-square-fill" />
            </span>
          {:else}
            <span class="text-error text-2xl">
              <Icon icon="ph:x-square-fill" />
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
</div>

