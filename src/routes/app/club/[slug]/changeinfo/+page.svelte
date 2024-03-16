<script lang="ts">
  //mylib
  import type { iGlobalResponse } from "interface/utils";
  import { arrCountries } from "client-service/country";
  //skeleton
  import {getToastStore, Avatar, ProgressRadial} from '@skeletonlabs/skeleton'
  //svelte
  import { env } from '$env/dynamic/public'
  import { invalidateAll, goto } from "$app/navigation";
  //icon
  import Icon from '@iconify/svelte'
  //Prisma
  import { Prisma } from "@prisma/client";

  export let data
  const baseEmblemUrl = env.PUBLIC_TEBI_CLUB_EMBLEM
  const baseCoverUrl = env.PUBLIC_TEBI_CLUB_COVER
  const toast = getToastStore()
  let emblemInput: HTMLInputElement
  let coverInput: HTMLInputElement
  let processing = false
  let newName = data.clubInfo.name
  let newSlug = data.clubInfo.slug

  async function updateInfo() {
    processing = true
    const response = await fetch(`/api/v1/private/club/${data.clubInfo.slug}/info`, {
      method: 'PATCH',
      body: JSON.stringify(data.clubInfo)
    })
    // const result: iGlobalResponse = await response.json()
    if (response.ok) {
      toast.trigger({
        message: 'Info Updated',
        background: 'variant-filled-success'
      })
      invalidateAll()
    } else {
      toast.trigger({
        message: response.statusText,
        background: 'variant-filled-error'
      })
    }
    processing = false
  }

  function handleCoverError(e: Event) {
    (e.target! as HTMLImageElement).src = "https://placehold.co/2000x400?text=No+Img,+recomended+ratio+5:1"
  }

  async function uploadImage(e: Event, targetUrl: 'cover' | 'emblem') {
    processing = true
    const formData = new FormData()
    const allowedExtension =  /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i
    if (e.target) {
      const fileData = (e.target as HTMLInputElement).files![0]
      if (!fileData ) {
        toast.trigger({
          message: 'File not selected',
          background: 'variant-filled-error'
        })
      } else if (fileData.size > 5000000) {
        toast.trigger({
          message: '5MB maximum file size',
          background: 'variant-filled-error'
        })
      } else if (!allowedExtension.exec(fileData.name)) {
        toast.trigger({
          message: 'Only accept jpg, jpeg, png, gif, webp type files',
          background: 'variant-filled-error'
        })
      } else {
        formData.append("image", fileData)
        const response = await fetch(`/api/v1/club/${data.clubInfo.slug}/${targetUrl}`, {
          method: 'POST',
          body: formData
        })
        // const result: iGlobalResponse = await response.json()
        if (response.ok) {
          invalidateAll()
          toast.trigger({
            message: 'Success uploading file',
            background: 'variant-filled-success'
          })
        } else {
          toast.trigger({
            message: response.statusText,
            background: 'variant-filled-error'
          })
        }
      }
    } else {
      toast.trigger({
        message: 'Wrong html target',
        background: 'variant-filled-error'
      })
    }
    processing = false
  }

  async function updateName() {
    processing = true
    let checker = 0
    if(newName.length > 1) checker++
    if(newSlug.length >= 4) checker++
    if(newSlug.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g)) checker++
    
    if (checker != 3) {
      toast.trigger({
        message: 'Wrong name and slug format, please check again.',
        background: 'variant-filled-error'
      })
    } else {
      const payload: Prisma.ClubUpdateInput = {
        name: newName,
        slug: newSlug.toLowerCase()
      }
      const response = await fetch(`/api/v1/private/club/${data.clubInfo.slug}/name`, {
        method: 'PATCH',
        body: JSON.stringify(data.clubInfo)
      })
      // const result: iGlobalResponse = await response.json()
      if (response.ok) {
        toast.trigger({
          message: 'Name and slug Updated',
          background: 'variant-filled-success'
        })
        goto(`/app/club/${payload.slug}/changeinfo`)
      } else {
        toast.trigger({
          message: response.statusText,
          background: 'variant-filled-error'
        })
      }
    }
  }
</script>

<div class="mb-8">
  <div class="card p-4 flex flex-row items-center gap-4">
    <Avatar src={baseEmblemUrl + data.clubInfo.emblemFile} width="w-48" rounded="rounded-md" alt="Club emblem" fallback="https://placehold.co/100x100?text=No+Img,+recomended+square+ratio" />
    <div class="">
      <h2 class="h2 justify-center">Club Emblem</h2>
      <div class="justify-center">
        <input type="file" id="emblemUpload" name="emblemUpload" class="hidden" on:change={e => uploadImage(e, 'emblem')} bind:this={emblemInput} />
        {#if processing}
          <ProgressRadial width="w-16" />
        {:else}
          <button class="btn variant-filled-primary" on:click={() => emblemInput.click()}>
            Change Emblem
          </button>
        {/if}
      </div>
    </div>
  </div>
  <div class="card p-4 flex flex-col md:flex-row items-center gap-4 my-4">
    <img src={baseCoverUrl + data.clubInfo.coverFile} class="w-full md:w-4/5 object-cover" alt="club cover" on:error={handleCoverError}/>
    <div class="">
      <h2 class="h2 justify-center">Club Cover</h2>
      <div class="justify-center">
        <input type="file" id="coverUpload" name="coverUpload" class="hidden" on:change={e => uploadImage(e,'cover')} bind:this={coverInput} />
        {#if processing}
          <ProgressRadial width="w-16" />
        {:else}
          <button class="btn variant-filled-primary" on:click={() => coverInput.click()}>
            Change Cover
          </button>
        {/if}
      </div>
    </div>
  </div>
  <h2 class="h2">Club Data</h2>
  <form  on:submit|preventDefault={updateInfo}>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div>
        <label class="label">
          <span>Country*</span>
          <select class="select" bind:value={data.clubInfo.countryISO2} required>
            {#each arrCountries as country}
              <option value={country.code}>{country.name}</option>
            {/each}
          </select>
        </label>
      </div>
      <div>
        <label class="label">
          <span>District*</span>
          <input class="input p-2" type="text" bind:value={data.clubInfo.district} required />
        </label>
      </div>
      <div class="lg:col-span-3">
        <label class="label">
          <span>Address*</span>
          <input class="input p-2" type="text" bind:value={data.clubInfo.address} required />
        </label>
      </div>
      <div class="lg:col-span-2">
        <label class="label">
          <span>Club Email</span>
          <input class="input p-2" type="email" bind:value={data.clubInfo.emailContact} />
        </label>
      </div>
      <div class="lg:col-span-3 lg:row-span-3">
        <label class="label">
          <span>Club Description</span>
          <textarea class="textarea p-2" rows="4" bind:value={data.clubInfo.description} />
        </label>
      </div>
      <div>
        <label class="label">
          <span>Club Phone Contact</span>
          <input class="input p-2" type="text" bind:value={data.clubInfo.phoneContact} />
        </label>
      </div>
      <div>
        <label class="label">
          <span>Club Website</span>
          <input class="input p-2" type="text" bind:value={data.clubInfo.website} />
        </label>
      </div>
    </div>
    <div class="flex flex-row-reverse my-4">
      {#if processing}
        <ProgressRadial width="w-16" />
      {:else}
        <button class="btn btn-lg variant-filled-success w-full md:w-1/2 lg:w-1/3" type="submit">
          Save
        </button>
      {/if}
    </div>
  </form>
  <!-- only pending and rejected club can change names and slug-->
  {#if [501,506].includes(data.clubInfo.clubStatusId)}
    <aside class="alert variant-filled-surface">
      <div class="h3 font-bold"><Icon icon="mingcute:information-line" /></div>
      <form on:submit|preventDefault={updateName}>
        <div class="alert-message">
          <h3 class="h3 font-bold">Update club name and slug</h3>
          <div class="flex flex-row gap-4 items-end">
            <div>
              <label class="label">
                <span>New Name</span>
                <input class="input p-2 text-surface-900-50-token" type="text" bind:value={newName} required />
              </label>
            </div>
            <div>
              <label class="label">
                <span>New Slug</span>
                <input class="input p-2 text-surface-900-50-token" type="text" bind:value={newSlug} required minlength={4} />
              </label>
            </div>
            <div class="alert-actions">
              <button type="submit" class="btn variant-filled-success">Submit</button>
            </div>
          </div>
          <div>Once the club approve, club name and slug need admin permission to be changed. Please use appropriate word for name and slug. Slug will be convert to lowercase.</div>
        </div>
      </form>
    </aside>
  {:else}
    <aside class="alert variant-filled-warning">
      <div class="h3 font-bold"><Icon icon="mingcute:information-line" /></div>
      <div class="alert-message">
        <h3 class="h3 font-bold">Info</h3>
        <p>Club name and slug can't be changed if the club approve, to request for changing club name, please contact admin.</p>
      </div>
    </aside>
  {/if}
</div>