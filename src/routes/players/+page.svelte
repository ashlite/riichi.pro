<script lang="ts">
  //svelte
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  //skeleton
  import { Paginator, Avatar } from '@skeletonlabs/skeleton'
	import PlayerAvatar from 'ui/playerAvatar.svelte';
// import PaginationNav from "organism/paginationNav.svelte";
// import Avatar from "atom/avatar.svelte";
// import type { PageData } from "./$types.js";

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

<div class="mt-8 mx-8">
  <!-- <PaginationNav pagination={data.meta} /> -->
  <Paginator on:amount={onAmountChange} on:page={onPageChange} bind:settings={data.paginationData} showFirstLastButtons showPreviousNextButtons showNumerals justify="justify-end" maxNumerals={3}></Paginator>
  <div class="table-container my-4">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>Player</th>
          <th>Rank Point</th>
          <th>Match Point</th>
          <th>Total Match/Chombo</th>
          <th>Main Club</th>
        </tr>
      </thead>
      <tbody>
        {#if data.players.length > 0}
          {#each data.players as player}
            <tr class="hover:bg-base-200">
              <td class="">
                <div class="flex flex-row items-center gap-4">
                  <PlayerAvatar playerAvatarUrl={player.avatarUrl} playerId={player.id} playerName={player.fullName} width="w-16" />
                  <div class="flex flex-col">
                    <div class="text-ellipsis">
                      {player.fullName}
                    </div>
                    <div class="flex flex-row gap-4">
                      <div class="font-bold">{player.nationalityCountryCode}</div>
                      <div class="font-bold text-primary">{player.rtData.name}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td>{player.currentRP}</td>
              <td>{player.currentTP}</td>
              {#if player.metaData}
                <td>{player.metaData?.totalMatch} / {player.metaData?.totalChombo} ({(player.metaData.totalChombo/player.metaData.totalMatch)*100}%)</td>
              {:else}
                <td>0/0 (0%)</td>
              {/if}
              <td class="hover:cursor-pointer hover:bg-base-300">
                {#if player.clubList.length > 0}
                  {#each player.clubList as club}
                    <div class="flex flex-col">
                      <div class="text-ellipsis">
                        {club.clubData.name}
                      </div>
                      <div class="flex flex-row gap-4">
                        <div class="font-bold">{club.clubData.countryISO2}</div>
                      </div>
                    </div>
                  {/each}
                {:else}
                  -
                {/if}
              </td>
            </tr>
          {/each}
        {:else}
          <tr>
            <td colspan={5}>
              <h1>No player in this category</h1>
            </td>
          </tr>
        {/if}
      </tbody>
      <!-- foot -->
      <tfoot>
        <tr>
          <th>Player</th>
          <th>Rank Point</th>
          <th>Match Point</th>
          <th>Total Match/Chombo</th>
          <th>Club</th>
        </tr>
      </tfoot>
      
    </table>
  </div>
</div>