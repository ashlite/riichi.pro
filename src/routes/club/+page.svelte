<script lang="ts">
  import PaginationNav from "organism/paginationNav.svelte";
  import type { PageData } from "./$types.js";
  import Image from "atom/image.svelte";
  import { countryNameFromCode } from "service/country.js";
  import Button from "atom/button.svelte";
  import {env} from '$env/dynamic/public'
  import Icon from "@iconify/svelte"
  import type { iGlobalResponse } from "interface/utils.js";
	import toastAlert from "store/toast.js";
  import { invalidateAll } from "$app/navigation";
  
  export let data: PageData
  const listJoinedClub: string[] = []
  const listPendingClub: string[] = []

  if (data.listClubUser) {
    data.listClubUser.forEach(club => {
      if (club.roleId < 306) listJoinedClub.push(club.clubId)
      else if (club.roleId == 306) listPendingClub.push(club.clubId)
    })
  }

  async function joinClub(slug: string, name: string) {
    const response = await fetch(`/api/v1/private/club/${slug}/member`, {
      method: 'POST'
    })
    const result = await response.json() as iGlobalResponse
    if (result.header.ok) {
      invalidateAll()
      toastAlert.success(`Success applied to ${name}`)
    } else {
      toastAlert.responseError(result)
    }
  }

  </script>
  
  <div class="mt-8 mx-8">
    <PaginationNav pagination={data.meta} />
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <!-- head -->
        <thead>
          <tr>
            <th>Club</th>
            <th>Total Member/Main</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#if data.listClub.length > 0}
            {#each data.listClub as club}
              <tr class="">
                <td class="">
                  <div class="flex flex-row items-center gap-4">
                    <div class="h-16 w-16 rounded-lg">
                      <Image src={env.PUBLIC_TEBI_CLUB_EMBLEM + club.emblemFile} alt="club emblem" objectContain />
                    </div>
                    <div class="flex flex-col">
                      <div class="text-ellipsis">
                        {club.name}
                      </div>
                      <div class="flex flex-row gap-4">
                        <div class="font-bold text-primary">{countryNameFromCode(club.countryISO2)}</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>{club.totalMember} / {club.totalMainMember}</td>
                <td class="flex flex-row gap-4 items-center">
                  <Button icon="ph:info" color="info" text="info" href={`/club/${club.slug}`} />
                  {#if listJoinedClub.includes(club.id) }
                    <Button icon="ph:person" text="Enter" color="primary" href={`/app/club/${club.slug}`} />
                  {:else if listPendingClub.includes(club.id)}
                    <Button icon="ph:person" text="Pending" color="disabled" />
                  {:else}
                    <Button icon="ph:person" text="Join" color="success" on:click={() => joinClub(club.slug, club.name)} />
                  {/if}
                </td>
              </tr>
            {/each}
          {:else}
            <tr>
              <td colspan={4}>
                <h1>No club in this category</h1>
              </td>
            </tr>
          {/if}
        </tbody>
        <!-- foot -->
        <tfoot>
          <tr>
            <th>Club</th>
            <th>Total Member/Main</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>