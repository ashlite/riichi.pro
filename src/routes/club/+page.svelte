<script lang="ts">
  //svelte
  import {env} from '$env/dynamic/public'
  import { invalidateAll, goto } from "$app/navigation";
  import {page} from '$app/stores'
  //icon
  import Icon from "@iconify/svelte"
  //skeleteon
  import { Paginator } from '@skeletonlabs/skeleton';
  import type { PaginationSettings } from '@skeletonlabs/skeleton'
  //mylib
  import { countryNameFromCode } from "client-service/country.js";
  import ClubCard from 'ui/card/clubCard.svelte'

  // import PaginationNav from "organism/paginationNav.svelte";
  // import Image from "atom/image.svelte";
  // import Button from "atom/button.svelte";
  // import type { iGlobalResponse } from "interface/utils.js";
	// import toastAlert from "store/toast.js";
  
  export let data
  const listJoinedClub: string[] = []
  const listPendingClub: string[] = []

  if (data.listClubUser) {
    data.listClubUser.forEach(club => {
      if (club.roleId < 306) listJoinedClub.push(club.clubId)
      else if (club.roleId == 306) listPendingClub.push(club.clubId)
    })
  }

  // let paginationSettings = {
  //   page: 0,
  //   limit: 5,
  //   size: source.length,
  //   amounts: [1, 2, 5, 10],
  // } satisfies PaginationSettings;
  // $: paginationSettings.size = source.length;

  // async function joinClub(slug: string, name: string) {
  //   const response = await fetch(`/api/v1/private/club/${slug}/member`, {
  //     method: 'POST'
  //   })
  //   const result = await response.json() as iGlobalResponse
  //   if (result.header.ok) {
  //     invalidateAll()
  //     toastAlert.success(`Success applied to ${name}`)
  //   } else {
  //     toastAlert.responseError(result)
  //   }
  // }

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
  
  <div class="mt-8 mx-8">
    <Paginator on:amount={onAmountChange} on:page={onPageChange} bind:settings={data.paginationData} showFirstLastButtons showPreviousNextButtons showNumerals justify="justify-end" maxNumerals={3}></Paginator>
    <div class="flex flex-col">
      <div class="flex flex-col gap-4 my-4">
        {#each data.listClub as club }
          <ClubCard clubData={club} />
        {/each}
      </div>
    </div>
  </div>