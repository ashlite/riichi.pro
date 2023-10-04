<script lang="ts">
  import type { iRegisterData } from "interface/user";
  import TextInput from "molecule/textInput.svelte";
	import Button from "atom/button.svelte";
  import CountrySelector from "molecule/countrySelector.svelte";
  import toastAlert from "store/toast";
	import { goto, invalidateAll } from "$app/navigation";
  import Icon from "@iconify/svelte";
	import globalModal from "store/modal";
  import Select from "molecule/select.svelte";
  import SelectItem from "atom/selectItem.svelte";
  import DatePicker from "organism/datePicker.svelte";
  
  let processing = false
  const registerData: iRegisterData = {
    fullName: '',
    genderRefId: 0,
    address:'',
    residenceCountryCode:'',
    nationalityCountryCode:'',
    district:'',
    dob: new Date(),
    phone: '',
    phoneCountry: '',
    realId:'',
    sourceRealId:''
  }

  async function registerUser() {
    processing = true
    try {
      const responseInput = await fetch('/api/v1/player/register', {
        method: 'POST',
        body: JSON.stringify(registerData)
      })
      const resultInput = await responseInput.json()
      if(resultInput.ok) {
        toastAlert.success('Register sukses')
        invalidateAll()
        goto('/')
      } else {
        toastAlert.error(resultInput.message)
        processing = false
      }
    } catch (e) {
      toastAlert.error(`Registration failed. Reason: ${e}`)
      processing = false
    } 
  }
</script>

<div class="w-3/5 mt-8 mx-auto">
  <h1 class="text-primary font-bold text-3xl">Register New Player</h1>
  <div class="divider"></div>
  <form class="mx-auto" on:submit|preventDefault={registerUser}>
    <div class="flex flex-row gap-4">
      <TextInput labelTL="Full Name" labelTR="Please use your real name" bind:value={registerData.fullName} name="firstName" required />
      <Select labelTL="Gender*" selectStyle="bordered" bind:value={registerData.genderRefId}>
        <SelectItem text="Male" value={401} />
        <SelectItem text="Female" value={402} />
      </Select>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <CountrySelector labelTL="Nationality" bind:value={registerData.nationalityCountryCode} name="country"/>
      <div class="form-control">
        <label class="label">Date of Birth*</label>
        <DatePicker maxDay={-2555} bind:selectedDate={registerData.dob} />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <CountrySelector labelTL="Country of residence" bind:value={registerData.residenceCountryCode} name="country"/>
      <TextInput labelTL="District/Province of residence*" required bind:value={registerData.district}/>
      <div class="col-span-2">
        <TextInput labelTL="Address of residence*" required bind:value={registerData.address}/>
      </div>
    </div>
    <div class="flex flex-row gap-4">
      <CountrySelector labelTL="Phone Code*" type='phone' bind:value={registerData.phoneCountry} />
      <TextInput labelTL="Active Phone number*" labelTR="without leading 0" required bind:value={registerData.phone}/>
    </div>
    <div class="flex flex-row gap-4">
      <TextInput labelTL="National ID" bind:value={registerData.realId}/>
      <TextInput labelTL="National ID Source/Name" bind:value={registerData.sourceRealId}/>
      <TextInput labelTL="Telegram username" bind:value={registerData.telegramId}/>
    </div>
    <div class="alert mt-4">
      <Icon icon="ph:info-fill" width=30 />
      <span>When you register, you automatically agree with our <span class="underline font-bold text-accent hover:cursor-pointer" on:click={() => globalModal.tnc()}>term and condition</span></span>
    </div>
    <div class="mt-6">
    {#if processing}
      <div class="flex flex-row-reverse">
        <span class="loading loading-dots loading-lg"></span>
      </div>
    {:else}
      <div class="flex flex-row-reverse gap-4">
        <div class="w-1/5">
          <Button text="Submit" type="submit" size="lg" color="success" full />
        </div>
        <div class="w-1/5">
          <Button text="Reset" type="reset" size="lg" color="warning" full />
        </div>
      </div>
    {/if}
    </div>
  </form>
</div>