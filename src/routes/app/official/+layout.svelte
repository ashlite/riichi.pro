<script lang="ts">
  // import BadgeNotification from 'atom/badgeNotification.svelte'
  import { page } from '$app/stores'
  import Navitem from 'ui/navigation/navitem.svelte';

  export let data

</script>

<div class="grid grid-cols-12 mt-8 mx-8 gap-8">
  <div class="col-span-3">
    <ul class="card p-4 w-full variant-filled flex flex-col gap-2">
      <Navitem href="/app/official/dashboard" menu>
        Dashboard
      </Navitem>
      <!-- <li><a>Player Reported <span class="badge">0</span></a></li>
      <li><a>Player Management</a></li>
      <li><a>Match Reported <span class="badge">0</span></a></li> -->
      <Navitem href="/app/official/clubapproval" menu>
        Club Approval 
        {#if data.totalPendingClub > 0}
          <span class="badge variant-filled-success mx-4">{data.totalPendingClub}</span>
        {/if}
      </Navitem>
      <!-- <li><a data-sveltekit-preload-data href="/app/official/rulesetting" class={$page.url.pathname.includes('/official/rulesetting') ? "text-primary" : ""}>Rule Setting</a></li> -->
      <!-- <li><a>Club Reported <span class="badge">0</span></a></li>
      <li><a>Club Management</a></li>
      <li><a>Tournament Ongoing <span class="badge">0</span></a></li>
      <li><a>Tournament Management</a></li> -->
    </ul>
  </div>
  <div class="col-span-9">
    <slot />
  </div>
</div>