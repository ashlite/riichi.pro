<script lang="ts">
  //Icon
  import Icon from "@iconify/svelte";
  //mylib
  import { countryNameFromCode } from "client-service/country";
  import { dateFormater } from "client-service/tools";
  import type { iMemberAction } from "interface/club";
  import Image from 'ui/image.svelte'
  //skeleton
  import { getToastStore, getModalStore, Avatar, Paginator, type PaginationSettings } from '@skeletonlabs/skeleton'
  //svelte
  import { page } from '$app/stores'
  import {env} from '$env/dynamic/public'
  import { invalidateAll, goto } from "$app/navigation";

  export let data

  function onPageChange(e: CustomEvent): void {
    const url = new URL($page.url)
    url.searchParams.set('page', e.detail)
    goto(url)
  }

  function onAmountChange(e: CustomEvent): void {
    const url = new URL($page.url)
    url.searchParams.set('limit', e.detail)
    goto(url)
  }
					
</script>

<div class="w-4/5 mt-4 mb-8 mx-auto ">
  <div class="h2 font-bold border-b-4 border-primary-500 pb-2 mb-2 flex flex-row gap-4">
    <a class="btn variant-filled text-xl" href={`/club/${data.clubData.slug}`}><Icon icon="mingcute:home-4-line" /></a>
    <h2>Member club {data.clubData.name}</h2>
  </div>
  <div class="mb-4">
    <Paginator
      bind:settings={data.paginationSettings}
      on:amount={onAmountChange}
      on:page={onPageChange}
      showFirstLastButtons
      showPreviousNextButtons
    />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 flex-row flex-wrap gap-4">
    {#each data.listMemberFull as member}
      <a href={`/players/${member.userData.id}`}>
        <div class="card flex flex-col w-full items-center p-2 bg-gradient-to-br from-secondary-700 to-secondary-400">
          <header class="card-header">
            <Avatar src={member.userData.avatarUrl ?? ''} initials={member.userData.fullName} width="w-28" />
          </header>
          <h4 class="h4 truncate">{member.userData.fullName}</h4>
          <p class="font-bold">{member.userData.rtData.name} - {member.userData.currentRP}</p>
          <div>
            {#if member.roleData.id == 301}
              <span class="badge variant-filled-primary">{member.roleData.name}</span>
              {:else if member.roleData.id == 302}
              <span class="badge variant-filled-secondary">{member.roleData.name}</span>
            {:else if member.roleData.id == 303}
              <span class="badge variant-filled-tertiary">{member.roleData.name}</span>
            {:else}
              <span class="badge variant-filled">{member.roleData.name}</span>
            {/if}
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>