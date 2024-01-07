<script lang="ts">
  import BadgeNotification from 'atom/badgeNotification.svelte'
  import type { LayoutServerData } from './$types'
  import { page } from '$app/stores'

  export let data: LayoutServerData

</script>

<div class="grid grid-cols-12 mt-8 mx-8 gap-8">
  <div class="col-span-2">
    <ul class="menu bg-base-200 w-full rounded-box">
      <li><a href={`/app/club/${$page.params.slug}`} data-sveltekit-preload-data>Home</a></li>
      <li><a href={`/app/club/${$page.params.slug}/member`} data-sveltekit-preload-data>Member</a></li>
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canApproveMember)}
        <li><a href={`/app/club/${$page.params.slug}/approval`} data-sveltekit-preload-data>Member Approval <BadgeNotification total={data.totalPendingJoin} /></a></li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canSubmitMatch)}
        <li><a href={`/app/club/${$page.params.slug}/match`} data-sveltekit-preload-data>Record a Match</a></li>
      {/if}
      <li><a href={`/app/club/${$page.params.slug}/standing`} data-sveltekit-preload-data>Monthly Standing</a></li>
      <li><a href={`/app/club/${$page.params.slug}/pastmatch`} data-sveltekit-preload-data>Match History</a></li>
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canEditClubInfo)}
        <li><a href={`/app/club/${$page.params.slug}/changeinfo`} data-sveltekit-preload-data>Change Club Info</a></li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canEditClubSetting)}
        <li><a href={`/app/club/${$page.params.slug}/changesetting`} data-sveltekit-preload-data>Change Settings</a></li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canEditAccess)}
        <li><a href={`/app/club/${$page.params.slug}/changeroles`} data-sveltekit-preload-data>Change Roles</a></li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canBuyCC)}
        <li><a href={`/app/club/${$page.params.slug}/clubcredit`} data-sveltekit-preload-data>Manage Club Credit</a></li>
      {/if}
      <!-- <li><a data-sveltekit-preload-data href="/app/official/clubapproval" class={$page.url.pathname.includes('/clubapproval') ? "text-primary" : ""}>Club Approval <BadgeNotification total={data.totalPendingClub} /></a></li> -->
    </ul>
  </div>
  <div class="col-span-10">
    <slot />
  </div>
</div>