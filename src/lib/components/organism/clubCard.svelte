<script lang="ts">
  import Icon from "@iconify/svelte";
  import Button from "atom/button.svelte";
  import globalModal from "store/modal";
  import { countryNameFromCode } from "service/country";
  import Image from "atom/image.svelte";
  import {env} from '$env/dynamic/public'
  
  export let newClub: boolean = false
  export let name: string | null = null
  export let slug: string | null = null
  export let role: string | null = null
  export let emblem: string | null  = null
  export let country: string = 'ID'
  export let status: number = 0
</script>

<div class="card max-w-6xl bg-base-200 shadow-xl">
  <div class="card-body">
    {#if newClub}
      <div class="flex flex-row mx-auto gap-2 my-6">
        <Icon icon="ph:first-aid-bold" width={50}/>
        <Icon icon="ph:buildings-bold" width={50}/>
      </div>
      <Button text="Create new club" color="primary" on:click={() => globalModal.newClub()} />
    {:else}
      <div class="h-32 w-32 rounded-lg mx-auto">
        <Image src={env.PUBLIC_TEBI_CLUB_EMBLEM + emblem} alt="emblem club" scaleDown maxH={32} />
      </div>
      <h2 class="card-title mx-auto">{name}</h2>
      <div class="text-center">{countryNameFromCode(country)}</div>
      <div class="card-actions justify-center">
        {#if status == 501}
          <div class="rounded-lg bg-base-100 w-full py-3 text-center">
            PENDING
          </div>
        {:else if status == 502}
          <Button color="primary" href={`/app/club/${slug}`} text={`${role} membership`} />
        {:else}
          <div class="rounded-lg bg-base-100 w-full py-3 text-center">
            Inactive
          </div>
        {/if}
      </div>
    {/if}
  </div>
</div>