<script lang="ts">
  import type { PageData } from "./$types";
  import type { iGlobalResponse } from "interface/utils";
  import Image from "atom/image.svelte";
	import TextArea from "molecule/textArea.svelte";
  import Select from "molecule/select.svelte";
  import SelectItem from "atom/selectItem.svelte";
  import TextInput from "molecule/textInput.svelte";
  import EmailInput from "molecule/emailInput.svelte";
  import Button from "atom/button.svelte";
  import { arrCountries } from "service/country";
  import { env } from '$env/dynamic/public'
  import { invalidateAll } from "$app/navigation";
  import toastAlert from "store/toast";

  export let data: PageData
  const baseEmblemUrl = env.PUBLIC_TEBI_CLUB_EMBLEM
  const baseCoverUrl = env.PUBLIC_TEBI_CLUB_COVER
  let emblemInput: HTMLInputElement
  let coverInput: HTMLInputElement
  let processing = false

  async function updateInfo() {
    processing = true
    const response = await fetch(`/api/v1/club/${data.clubInfo.slug}/info`, {
      method: 'PATCH',
      body: JSON.stringify(data.clubInfo)
    })

    const result: iGlobalResponse = await response.json()
    if (result.header.ok) {
      toastAlert.success('Info updated')
      invalidateAll()
    } else {
      toastAlert.responseError(result)
    }
    processing = false
  }

  async function uploadImage(e: Event, targetUrl: 'cover' | 'emblem') {
    processing = true
    const formData = new FormData()
    const allowedExtension =  /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i
    if (e.target) {
      const fileData = (e.target as HTMLInputElement).files![0]
      if (!fileData ) {
        toastAlert.error('File not selected')
      } else if (fileData.size > 5000000) {
        toastAlert.error('5mb maximum file size')
      } else if (!allowedExtension.exec(fileData.name)) {
        toastAlert.error('Only accept jpg, jpeg, png, gif, webp type files')
      } else {
        formData.append("image", fileData)
        const response = await fetch(`/api/v1/club/${data.clubInfo.slug}/${targetUrl}`, {
          method: 'POST',
          body: formData
        })
        const result: iGlobalResponse = await response.json()
        if (result.header.ok) {
          await invalidateAll()
          toastAlert.success('Success uploading file')
        } else {
          toastAlert.responseError(result)
        }
      }
    } else {
      toastAlert.error('Wrong html target')  
    }
    processing = false
  }
</script>

<div class="mb-8">
  <div class="grid grid-cols-3 gap-4">
    <div class="card bg-base-200 shadow-xl">
      <figure class="h-3/5">
        <Image src={baseEmblemUrl + data.clubInfo.emblemFile} alt="Club emblem" objectCover errorSrc="https://placehold.co/400x400?text=No+Img,+recomended+square+ratio" />
      </figure>
      <div class="card-body">
        <h2 class="card-title justify-center">Club Emblem</h2>
        <div class="card-actions justify-center">
          <input type="file" id="emblemUpload" name="emblemUpload" class="hidden" on:change={e => uploadImage(e, 'emblem')} bind:this={emblemInput} />
          {#if processing}
            <button class="btn btn-disabled "><span class="loading loading-dots"></span> processing</button>
          {:else}
            <Button text="Change Emblem" color="primary" on:click={() => emblemInput.click()}/>
          {/if}
        </div>
      </div>
    </div>
    <div class="col-span-2 card bg-base-200 shadow-xl">
      <figure class="h-3/5">
        <Image src={baseCoverUrl + data.clubInfo.coverFile} alt="Club emblem" objectCover errorSrc="https://placehold.co/2000x400?text=No+Img,+recomended+ratio+5:1+px" />
      </figure>
      <div class="card-body">
        <h2 class="card-title justify-center">Club Cover</h2>
        <div class="card-actions justify-center">
          <input type="file" id="coverUpload" name="coverUpload" class="hidden" on:change={e => uploadImage(e,'cover')} bind:this={coverInput} />
          {#if processing}
            <button class="btn btn-disabled "><span class="loading loading-dots"></span> processing</button>
          {:else}
            <Button text="Change Cover" color="primary" on:click={() => coverInput.click()}/>
          {/if}
        </div>
      </div>
    </div>
  </div>
  <div class="divider mt-20">Club Data</div>
  <form class="grid grid-cols-5 gap-4" on:submit|preventDefault={updateInfo}>
    <div>
      <Select labelTL="Country" bind:value={data.clubInfo.countryISO2}>
        {#each arrCountries as country}
          <SelectItem text={country.name} value={country.code} />
        {/each}
      </Select>
    </div>
    <div>
      <TextInput bind:value={data.clubInfo.district} labelTL="District" />
    </div>
    <div class="col-span-3">
      <TextInput bind:value={data.clubInfo.address} labelTL="Address" />
    </div>
    <div class="col-span-2">
      <EmailInput bind:value={data.clubInfo.emailContact} labelTL="Club Email" />
    </div>
    <div class="col-span-3 row-span-3">
      <TextArea labelTL="Description" bind:value={data.clubInfo.description} h={40} />
    </div>
    <div>
      <TextInput bind:value={data.clubInfo.phoneContact} labelTL="Club Phone" />
    </div>
    <div>
      <TextInput bind:value={data.clubInfo.website} labelTL="Club Website" />
    </div>
    <div class="col-start-5">
      {#if processing}
        <button class="btn btn-disabled "><span class="loading loading-dots"></span> processing</button>
      {:else}
        <Button text="Save" type="submit" full color="success" />
      {/if}
    </div>
  </form>
</div>