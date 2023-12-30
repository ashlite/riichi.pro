<script lang="ts">
  import BadgeNotification from 'atom/badgeNotification.svelte'
  import type { LayoutServerData } from './$types'
  import { page } from '$app/stores'

  export let data: LayoutServerData

</script>

<div class="grid grid-cols-12 mt-8 mx-8 gap-8">
  <div class="col-span-3">
    <ul class="menu bg-base-200 w-full rounded-box">
      <li><a href="/app/official/dashboard" class={$page.url.pathname.includes('/dashboard') ? "text-primary" : ""}>Dashboard</a></li>
      <!-- <li><a>Player Reported <span class="badge">0</span></a></li>
      <li><a>Player Management</a></li>
      <li><a>Match Reported <span class="badge">0</span></a></li> -->
      <li><a data-sveltekit-preload-data href="/app/official/clubapproval" class={$page.url.pathname.includes('/official/clubapproval') ? "text-primary" : ""}>Club Approval <BadgeNotification total={data.totalPendingClub} /></a></li>
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