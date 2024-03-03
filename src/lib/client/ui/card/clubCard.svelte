<script lang="ts">
  //svelte
  import {env} from '$env/dynamic/public'
  //skeleton
  import {Avatar} from '@skeletonlabs/skeleton'
  //icon
  import Icon from '@iconify/svelte';
  //mylib
  import type { iListClub } from 'interface/club'
  import { objCountries, countryNameFromCode } from 'client-service/country'
  
  export let clubData: iListClub
</script>

<a class="card bg-gradient-to-br from-primary-500 to-primary-400 drop-shadow-lg p-4 lg:w-1/2" href={`/club/${clubData.slug}`}>
  <div class="flex flex-col md:flex-row items-center gap-4">
    <Avatar src={env.PUBLIC_TEBI_BUCKET_CLUB_EMBLEM + clubData.emblemFile} border="rounded-lg" width="w-68 md:w-32" fallback="https://placehold.co/400x400?text=No+Img"/>
    <!-- <div class="mx-auto">
    </div> -->
    <div class="w-full">
      <header class="px-4 h1 md:h2 font-bold text-white truncate">{clubData.name}</header>
      <section class="px-4">
        <h2 class="h3 md:h4 text-white">
          {countryNameFromCode(clubData.countryISO2)}
        </h2>
        <h3 class="h3 flex gap-2 text-white">
          <span class="text-3xl text-white">
            <Icon icon="mingcute:group-2-fill"/>
          </span>
          {clubData.totalMember}
        </h3>
      </section>
      <!-- <footer class="card-footer">(footer)</footer> -->
    </div>
  </div>
</a>
				