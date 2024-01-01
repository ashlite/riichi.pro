<script lang="ts">
  import BadgeNotification from 'atom/badgeNotification.svelte'
  import type { LayoutServerData } from './$types'
  import { page } from '$app/stores'

  export let data: LayoutServerData
  const userData = data.userMemberData

</script>

<div class="grid grid-cols-12 mt-8 mx-8 gap-8">
  <div class="col-span-2">
    <ul class="menu bg-base-200 w-full rounded-box">
      <li><a href={`/app/club/${$page.params.slug}`} data-sveltekit-preload-data="tap">Home</a></li>
      <li><a href={`/app/club/${$page.params.slug}/member`} data-sveltekit-preload-data="tap">Member</a></li>
      {#if userData.roleId == 301 || (userData.roleId == 302 && userData.canApproveMember)}
        <li><a href={`/app/club/${$page.params.slug}/approval`} data-sveltekit-preload-data="tap">Member Approval <BadgeNotification total={data.totalPendingJoin} /></a></li>
      {/if}
      {#if userData.roleId == 301 || (userData.roleId == 302 && userData.canSubmitMatch)}
        <li><a href={`/app/club/${$page.params.slug}/match`} data-sveltekit-preload-data="tap">Record a Match</a></li>
      {/if}
      <li><a href={`/app/club/${$page.params.slug}/standing`} data-sveltekit-preload-data="tap">Monthly Standing</a></li>
      <li><a href={`/app/club/${$page.params.slug}/pastmatch`} data-sveltekit-preload-data="tap">Match History</a></li>
      {#if userData.roleId == 301 || (userData.roleId == 302 && userData.canEditClubInfo)}
        <li><a href={`/app/club/${$page.params.slug}/changeinfo`} data-sveltekit-preload-data="tap">Change Club Info</a></li>
      {/if}
      {#if userData.roleId == 301 || (userData.roleId == 302 && userData.canEditClubSetting)}
        <li><a href={`/app/club/${$page.params.slug}/changesetting`} data-sveltekit-preload-data="tap">Change Settings</a></li>
      {/if}
      {#if userData.roleId == 301 || (userData.roleId == 302 && userData.canEditAccess)}
        <li><a href={`/app/club/${$page.params.slug}/changeroles`} data-sveltekit-preload-data="tap">Change Roles</a></li>
      {/if}
      {#if userData.roleId == 301 || (userData.roleId == 302 && userData.canBuyCC)}
        <li><a href={`/app/club/${$page.params.slug}/clubcredit`} data-sveltekit-preload-data="tap">Manage Club Credit</a></li>
      {/if}
      <!-- <li><a data-sveltekit-preload-data href="/app/official/clubapproval" class={$page.url.pathname.includes('/clubapproval') ? "text-primary" : ""}>Club Approval <BadgeNotification total={data.totalPendingClub} /></a></li> -->
    </ul>
  </div>
  <div class="col-span-10">
    <slot />
  </div>
</div>