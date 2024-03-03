<script lang="ts">
  //svelte
  import { page } from '$app/stores'
  //mylib
  import Navitem from 'ui/navigation/navitem.svelte';

  export let data

</script>

<div class="grid grid-cols-1 lg:grid-cols-12 mt-8 mx-8 gap-8">
  <div class="lg:col-span-2">
    <ul class="card p-4 variant-filled w-full rounded-box">
      <li>
        <Navitem href={`/app/club/${$page.params.slug}/dashboard`} menu>Dashboard</Navitem>
      </li>
      <li>
        <Navitem href={`/app/club/${$page.params.slug}/member`} menu>Member</Navitem>
      </li>
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canApproveMember)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/approval`} menu>
            Member Approval 
            {#if data.totalPendingJoin > 0}
              <span class="badge variant-filled-success">{data.totalPendingJoin}</span>
            {/if}
          </Navitem>
        </li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canSubmitMatch)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/match`} menu>Record a Match</Navitem>
        </li>
      {/if}
      <li>
        <Navitem href={`/app/club/${$page.params.slug}/standing`} menu>Monthly Standing</Navitem>
      </li>
      <li>
        <Navitem href={`/app/club/${$page.params.slug}/pastmatch`} menu>Match History</Navitem>
      </li>
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canEditClubInfo)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/changeinfo`} menu>Change Club Info</Navitem>
        </li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canEditClubSetting)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/changesetting`} menu>Change Settings</Navitem>
        </li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canEditAccess)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/changeroles`} menu>Change Roles</Navitem>
        </li>
      {/if}
      {#if data.userMemberData.roleId == 301 || (data.userMemberData.roleId == 302 && data.userMemberData.canBuyCC)}
        <li>
          <Navitem href={`/app/club/${$page.params.slug}/clubcredit`} menu>Manage Club Credit</Navitem>
        </li>
      {/if}
      <!-- <li><a data-sveltekit-preload-data href="/app/official/clubapproval" class={$page.url.pathname.includes('/clubapproval') ? "text-primary" : ""}>Club Approval <BadgeNotification total={data.totalPendingClub} /></a></li> -->
    </ul>
  </div>

  <div class="lg:col-span-10">
    <slot />
  </div>
</div>