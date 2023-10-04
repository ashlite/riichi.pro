<script lang="ts">
  import PaginationNav from "organism/paginationNav.svelte";
  import type { PageData } from "./$types.js";
  import Image from "atom/image.svelte";
  import { countryNameFromCode } from "service/country.js";
  import Button from "atom/button.svelte";
  
  export let data: PageData
  const listClub = data.listClub
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
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#if listClub.length > 0}
            {#each listClub as club}
              <tr class="">
                <td class="">
                  <div class="flex flex-row items-center gap-4">
                    <div class="h-16 w-16 rounded-lg">
                      <Image src={club.emblemPic ?? 's'} alt="club emblem" objectContain />
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
                {#if club.website}
                  <td><Button href={club.website} color="accent" icon="ph:link-bold" text="go to website" /></td>
                {:else}
                  <td>none</td>
                {/if}
                <td class="flex flex-row gap-4 items-center">
                  <Button icon="ph:info" color="info" text="info" />
                  {#if data.isPlayer && !data.listUserClub?.includes(club.id) }
                    <Button icon="ph:person" text="join" color="success btn-success" />
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
            <th>Club</th>
            <th>Total Member/Main</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>