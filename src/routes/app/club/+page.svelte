<script lang="ts">
import ClubCard from "organism/clubCard.svelte";
import type { PageData } from "./$types.js";
import { getLoginUser } from "store/user.js";

export let data: PageData
const loginUser = getLoginUser()
const listClub = data.listClub

let totalMain = 0
listClub.forEach(club => {
  if (club.roleData.id < 304) totalMain++
})
</script>

<div class="mt-8 w-4/5 mx-auto">
  <h1 class="font-bold text-5xl text-primary">Your club List</h1>
  <div class="divider"></div>
  <div class="flex flex-row flex-wrap gap-4">
    {#if totalMain == 0 && listClub.length < loginUser.rtData.clubLimit}
      <ClubCard newClub />
    {/if}
    {#each listClub as club}
      <ClubCard name={club.clubData.name} emblem={club.clubData.emblemFile} country={club.clubData.countryISO2} role={club.roleData.name} slug={club.clubData.slug} status={club.clubData.clubStatusId} />
    {/each}
  </div>
</div>
