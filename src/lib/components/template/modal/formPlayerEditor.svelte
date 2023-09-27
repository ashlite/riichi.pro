<script lang="ts">
  import TextInput from "molecule/textInput.svelte";
  import CountrySelector from "molecule/countrySelector.svelte";
  import Select from "molecule/select.svelte";
  import SelectItem from "atom/selectItem.svelte";
  import ModalSubmit from "molecule/modalSubmit.svelte";
	import toastAlert from "store/toast";
  import type { iRegisterPlayer } from "interface/user";
	import globalModal from "store/modal";
	import { invalidateAll } from "$app/navigation";
  import DatePicker from "organism/datePicker.svelte";

const playerData: iRegisterPlayer = {address:'', district:'', phone:'', realId:'', sourceRealId:'', phoneCountry:'', gender:0, dob: new Date()}
let processing = false

async function submitPlayer() {
  processing = true
  if (!/^\d+$/.test(playerData.phone)) {
    toastAlert.error('Phone number must contain only number')
  } else if (playerData.gender == 0) {
    toastAlert.error('Please select your gender')
  } else {
    const response = await fetch('/api/v1/player/register', {
      method: 'POST',
      body: JSON.stringify(playerData)
    })
    const result = await response.json()
    if (result.ok) {
      toastAlert.success("You officially become a riichi players, please join to a club to start recording match", 10000)
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
    <div class="grid grid-cols-3 gap-4">
      <Select labelTL="Gender" selectStyle="bordered" bind:value={playerData.gender}>
        <SelectItem text="Male" value={401} />
        <SelectItem text="Female" value={402} />
      </Select>
      <div class="form-control">
        <label class="label">Date of Birth</label>
        <DatePicker maxDay={-2555} bind:selectedDate={playerData.dob} />
      </div>
      <TextInput labelTL="District/State/Province of residence" required bind:value={playerData.district}/>
    </div>
    <TextInput labelTL="Address of residence" required bind:value={playerData.address}/>
    <div class="flex flex-row gap-4">
      <CountrySelector labelTL="Phone Code" type='phone' bind:value={playerData.phoneCountry} />
      <TextInput labelTL="Active Phone number" labelTR="without leading 0" required bind:value={playerData.phone}/>
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