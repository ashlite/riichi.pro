<script lang="ts">
  import PaginationNav from "organism/paginationNav.svelte";
  import type { PageData } from "./$types.js";
  import Image from "atom/image.svelte";
  import { countryNameFromCode } from "service/country.js";
  import Button from "atom/button.svelte";
  import {env} from '$env/dynamic/public'
  import Icon from "@iconify/svelte";
  
  export let data: PageData
  const listClub = data.listClub
  const listJoinedClub = data.listJoinClub
  const listPendingClub = data.listPendingClub
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
                {#if club.website}
                  <td>
                    <a href={'//'+ club.website} rel="external" target="_blank" class="btn btn-accent"><Icon icon="ph:link-bold" width={30}/>go to website</a>
                  </td>
                {:else}
                  <td>none</td>
                {/if}
                <td class="flex flex-row gap-4 items-center">
                  <Button icon="ph:info" color="info" text="info" />
                  {#if listJoinedClub.includes(club.id) }
                    <Button icon="ph:person" text="Enter" color="disabled" />
                  {:else if listPendingClub.includes(club.id)}
                    <Button icon="ph:person" text="pending" color="disabled" />
                  {:else}
                    <Button icon="ph:person" text="join" color="success" />
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