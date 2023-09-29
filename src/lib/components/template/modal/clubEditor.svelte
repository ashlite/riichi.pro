<script lang="ts">
import TextInput from "molecule/textInput.svelte";
import CountrySelector from "molecule/countrySelector.svelte";
import EmailInput from "molecule/emailInput.svelte";
import ModalSubmit from "molecule/modalSubmit.svelte";
import type { iRegisterClub } from "interface/club";
	import toastAlert from "store/toast";
	import globalModal from "store/modal";
	import { invalidateAll } from "$app/navigation";

let processing = false
const dataClub: iRegisterClub = {name:'', slug:'', countryISO2:'', address:'', district:'' }

async function submitForm() {
  processing = true

  //testing text
  if (!/^\w*$/g.test(dataClub.slug)) {
    toastAlert.error("slug input is wrong format")
  } else {
    const response = await fetch('/api/v1/club/register',{
      method:'POST',
      body: JSON.stringify(dataClub)
    })
    const result = await response.json()
    if (result.ok) {
      toastAlert.success("Club creation is in request")
      globalModal.close()
      invalidateAll()
    } else {
      toastAlert.error(`${result.message}`)
    }
  }
  processing = false
}
</script>

<form class="grid grid-cols-4 gap-4" on:submit|preventDefault={submitForm}>
  <p class="col-span-4">You must have a club slot limit still available. When you submit this form, you must wait for the admin to approve this club. After approving, you will automatically become an owner of this club and this club will be available in your club list. To create a club, you must not become <span class="font-bold">main member to any club</span></p>
  {#if processing}
    <div class="w-full">
      <span class="loading loading-dots loading-lg mx-auto"></span>
    </div>
  {:else}
    <div class="col-span-2">
      <TextInput labelTL="Club Name*" bind:value={dataClub.name} required/>
    </div>
    <div class="col-span-2 form-control">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">
        <span class="label-text">Club Slug Link*</span>
        <span class="label-text-alt">only alphanum and _ character</span>
      </label>
      <div class="join">
        <button class="join-item btn no-animation hover:cursor-default hover:bg-base-200" tabindex="-1">janshi.pro/club/</button>
        <input type="text" class="input input-bordered w-full join-item" bind:value={dataClub.slug} required />
      </div>
    </div>
    <div>
      <CountrySelector labelTL="Club based country*" bind:value={dataClub.countryISO2} required />
    </div>
    <div>
      <TextInput labelTL="Club District/State/Province*" required bind:value={dataClub.district} />
    </div>
    <div class="col-span-2">
      <TextInput labelTL="Club Address*" required bind:value={dataClub.address}/>
    </div>
    <div>
      <EmailInput labelTL="Club contact email" bind:value={dataClub.emailContact}/>
    </div>
    <div>
      <CountrySelector labelTL="Club phone country code" type="phone" bind:value={dataClub.phoneCode}/>
    </div>
    <div>
      <TextInput labelTL="Club contact phone" labelTR="without leading 0" bind:value={dataClub.phoneContact}/>
    </div>
    <div>
      <TextInput labelTL="Club website" bind:value={dataClub.website}/>
    </div>
    <div class="col-span-4">
      <ModalSubmit form/>
    </div>
  {/if}
</form>