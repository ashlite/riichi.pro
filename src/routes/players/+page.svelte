<script lang="ts">
import PaginationNav from "organism/paginationNav.svelte";
import Avatar from "atom/avatar.svelte";
import type { PageData } from "./$types.js";

export let data: PageData
</script>

<div class="mt-8 mx-8">
  <PaginationNav pagination={data.meta} />
  <div class="overflow-x-auto">
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
              <td class="hover:cursor-pointer hover:bg-base-300">
                <div class="flex flex-row items-center gap-4">
                  <Avatar seed={player.userId} />
                  <div class="flex flex-col">
                    <div class="text-ellipsis">
                      {player.userData.firstName} {player.userData.lastName}
                    </div>
                    <div class="flex flex-row gap-4">
                      <div class="font-bold">{player.userData.countryCode}</div>
                      <div class="font-bold text-primary">{player.rtData.name}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td>{player.currentRP}</td>
              <td>{player.currentMP}</td>
              <td>{player.totalMatch} / {player.totalChombo} ({(player.totalChombo/player.totalMatch)*100}%)</td>
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