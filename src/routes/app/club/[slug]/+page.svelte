<script lang="ts">
  import type { PageData } from "./$types";
  import Image from "atom/image.svelte";
  import Icon from "@iconify/svelte";
	import { countryNameFromCode } from "service/country";

  export let data: PageData
  const clubData = data.userData.clubData
</script>

<div class="w-full relative h-80">
  <div class="w-full max-h-60">
    <Image src={clubData.coverPic ?? 's'} objectCover maxH={60} errorSrc="https://placehold.co/2000x400?text=No+Img,+recomended+ratio+5:1+px" />
  </div>
  <div class="w-40 h-40 border-4 border-white shadow-xl absolute top-40 left-12 rounded-lg">
    <Image src={clubData.emblemPic ?? 's'} objectContain errorSrc="https://placehold.co/400x400?text=No+Img+400x400+px"/>
  </div>
  <div class="absolute left-60 top-64 text-4xl font-bold">{clubData.name}</div>
</div>
{#if clubData.description}
  <p class="text-center px-12">{clubData.description}</p>
{/if}
<div class="mt-8 flex flex-row gap-4">
  <div class="flex flex-row items-center rounded-xl border-2 border-primary gap-4 p-4">
    <Icon icon="ph:globe-hemisphere-west" width={60} height={60} />
    <div class="text-2xl">{countryNameFromCode(clubData.countryISO2)}</div>
  </div>
  <div class="flex flex-row items-center rounded-xl border-2 border-primary gap-4 p-4">
    <Icon icon="ph:map-pin-line" width={60} height={60} />
    <div class="text-lg">{clubData.address}, {clubData.district ?? ''}</div>
  </div>
  <div class="flex flex-row items-center rounded-xl border-2 border-primary gap-4 p-4">
    <Icon icon="ph:address-book" width={60} height={60} />
    <div class="flex flex-col">
      <div>email: {clubData.emailContact}</div>
      <div>phone: {clubData.phoneContact}</div>
    </div>
  </div>
  {#if clubData.website}
    <div class="flex flex-row items-center rounded-xl border-2 border-primary gap-4 p-4">
      <Icon icon="ph:link" width={60} height={60} />
      <a href={clubData.website} class="text-2xl underline text-info">website</a>
    </div>  
  {/if}
</div>

