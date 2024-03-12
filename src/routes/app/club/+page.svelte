<script lang="ts">
  //skeleton
  import { Avatar } from '@skeletonlabs/skeleton';
  //mylib
  import { getLoginUser } from "store/user.js";
  //Icon
  import Icon from '@iconify/svelte'
  import { goto } from '$app/navigation'

  export let data
  const loginUser = getLoginUser()

  let totalMain = 0
  data.listClub.forEach(club => {
    if (club.roleData.id < 304 && [501, 502, 504, 506, 599].includes(club.clubData.clubStatusId) ) totalMain++
  })
</script>

<div class="mt-8 w-4/5 mx-auto">
  <div class="flex flex-row justify-between flex-wrap">
    <h1 class="font-bold text-5xl text-primary">Your Club</h1>
    {#if totalMain == 0 && data.listClub.length < $loginUser.rtData.clubLimit}
      <a class="btn variant-filled-success" href="/app/createclub">
        <span class="h3 mr-2"><Icon icon="mingcute:add-line" /></span>
        Create Club
      </a>
    {:else}
      <button class="btn variant-filled-success" disabled>
        <span class="h3 mr-2"><Icon icon="mingcute:add-line" /></span>
        Create Club
      </button>
    {/if}
  </div>
  <p>You can search and join a club in a <a href="/club" class="underline text-primary-500">clubs page.</a></p>
  <p>For creating a new club, you must not an <span class="font-bold italic">owner or main member</span> of any club.</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
    {#each data.listClub as club}
      <!-- card in md -->
      <div class="hidden md:block">
        <div class="card p-4 flex flex-row gap-4">
          <figure>
            <Avatar src={club.clubData.emblemFile ?? ''} rounded="rounded-lg" width="w-24" initials={club.clubData.name} />
          </figure>
          <div class="grow">
            <header class="h2 font-bold text-ellipsis">({club.clubData.countryISO2}) {club.clubData.name}</header>
            <section>
              <div>{club.roleData.name}</div>
            </section>
          </div>
          {#if club.roleData.id == 306}
            <button class="btn variant-warning">
              Cancel Applying
            </button>
          {:else}
            <a href={`/app/club/${club.clubData.slug}/dashboard`} class="btn variant-filled-success">
              ENTER
            </a>
          {/if}
        </div>
      </div>
      <!-- card in sm -->
      <div class="block md:hidden">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="card p-4 flex flex-row gap-4" on:click={() => {
          if(club.clubData.clubStatusId == 502) goto(`/app/club/${club.clubData.slug}/dashboard`)
        }}>
          <figure>
            <Avatar src={club.clubData.emblemFile ?? ''} rounded="rounded-lg" width="w-24" initials={club.clubData.name} />
          </figure>
          <div class="grow">
            <header class="h2 font-bold text-ellipsis">({club.clubData.countryISO2}) {club.clubData.name}</header>
            <section>
              <div>{club.roleData.name}</div>
              <div>Status: 
                {#if club.clubData.clubStatusId == 501}
                  <span class="text-surface-600-300-token">
                    PENDING
                  </span>
                {:else if club.clubData.clubStatusId == 502}
                  <span class="text-success-600-300-token font-bold">
                    ACTIVE
                  </span>
                {:else}
                  <span class="text-error-600-300-token">
                    INACTIVE
                  </span>
                {/if}
              </div>
            </section>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
