<script lang="ts">
  import TextInput from "molecule/textInput.svelte";
  import CountrySelector from "molecule/countrySelector.svelte";
  import ToastAlert from "molecule/toastAlert.svelte";
  import ModalSubmit from "molecule/modalSubmit.svelte";
	import toastAlert from "store/toast";
  import type { iRegisterPlayer } from "interface/user";
	import globalModal from "store/modal";
	import { invalidateAll } from "$app/navigation";

const playerData: iRegisterPlayer = {address:'', district:'', phone:'', realId:'', sourceRealId:'', phoneCountry:''}
let processing = false

async function submitPlayer() {
  processing = true
  if (!/^\d+$/.test(playerData.phone)) {
    toastAlert.error('Phone number must contain only number')
  } else {
    const response = await fetch('/api/v1/player/register', {
      method: 'POST',
      body: JSON.stringify(playerData)
    })
    const result = await response.json()
    if (result.ok) {
      toastAlert.success("You officially become a riichi players, please join to a club to start recording match")
      globalModal.close()
      invalidateAll()
    } else {
      toastAlert.error(result.message)
    }
  }
  processing = false
}


</script>

<div>
  <p class="my-4">Please complete these form to become an official players. This data is kept secret and will not be shared to public.</p>
  <form on:submit|preventDefault={submitPlayer}>
    <TextInput labelTL="Address of residence" required bind:value={playerData.address}/>
    <div class="flex flex-row gap-4">
      <TextInput labelTL="District/State/Province" required bind:value={playerData.district}/>
      <CountrySelector labelTL="Phone Code" valueType='phone' bind:value={playerData.phoneCountry} />
      <TextInput labelTL="Active Phone number" required bind:value={playerData.phone}/>
    </div>
    <div class="flex flex-row gap-4">
      <TextInput labelTL="National ID" required bind:value={playerData.realId}/>
      <TextInput labelTL="National ID Source/Name" required bind:value={playerData.sourceRealId}/>
    </div>
    {#if processing}
    <div class="flex flex-row-reverse">
      <div class="loading loading-dots loading-lg"></div>
    </div>
    {:else}
      <ModalSubmit form />
    {/if}
  </form>
</div>