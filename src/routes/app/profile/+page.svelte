<script lang="ts">
  //skeleton
  import { clipboard, getToastStore, ProgressRadial } from '@skeletonlabs/skeleton'
  //svelte
  import { invalidateAll } from '$app/navigation'
  //mylib
  import { countryNameFromCode, countryPhoneFromCode, arrCountries } from "client-service/country";
  import type { iUpdateProfile } from 'interface/user';
  import DatePicker from 'ui/datePicker.svelte';
  //Icon
  import Icon from '@iconify/svelte'

  export let data
  $: profile = data.profileData
  let isProcessing = false
  const toast = getToastStore()

  async function updateProfile() {
    isProcessing = true
    const payload: iUpdateProfile = {
      address: profile.address,
      district: profile.district,
      dob: profile.dob!,
      fullName: profile.fullName,
      genderRefId: profile.genderRefId!,
      nationalityCountryCode: profile.nationalityCountryCode!,
      phone: profile.phone!.toString(),
      phoneCountry: profile.phoneCountry!,
      residenceCountryCode: profile.residenceCountryCode!
    }
    const fetchResult = await fetch('/api/v1/private/player', {
      method: 'PATCH',
      body: JSON.stringify(payload)
    })
    if (fetchResult.ok) {
      invalidateAll()
      toast.trigger({
        message: 'profile updated',
        background: "variant-filled-success",
      })
    } else {
      toast.trigger({
        message: fetchResult.statusText,
        background: "variant-filled-error",
      })
    }
    isProcessing = false
  }
</script>

<div class="mt-8 w-4/5 mx-auto">
  <!-- <div class="divider my-0"></div> -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mb-4">
    {#if isProcessing}
      <div class="flex flex-row justify-center">
        <ProgressRadial />
      </div>
    {:else}
      <form on:submit|preventDefault={updateProfile}>
        <h1 class="h1 font-bold text-primary-600-300-token">User Profile</h1>   
        <div class="flex flex-col">
          <div class="text-secondary-700-200-token">
            UUID: 
            <span class="font-bold">{profile.id}</span>
            <span><button class="btn-icon btn-icon-sm variant-filled-secondary" type="button" use:clipboard={profile.id} on:click={() => {
              toast.trigger({
                message: 'UUID copied',
                background: 'variant-filled-success'
              })
            }}>
              <Icon icon="mingcute:copy-2-line"/>
            </button></span>
          </div>
          <div class="text-secondary-700-200-token">
            Email: 
            <span class="font-bold">{profile.email}</span>
          </div>
          <div class="text-secondary-700-200-token">
            Joined at: 
            <span class="font-bold">{profile.joinedAt}</span>
          </div>
        </div>
        <label class="label">
          <span>Name*</span>
          <input class="input p-2" type="text" placeholder="Input" bind:value={profile.fullName} required />
        </label>
        <label class="label w-1/2 flex flex-col">
          <span>Date of birth*</span>
          <DatePicker bind:selectedDate={profile.dob} maxDay={0} />
        </label>
        <div class="flex flex-row gap-2">
          <label class="label">
            <span>Nationality*</span>
            <select class="select" bind:value={profile.nationalityCountryCode} required>
              {#each arrCountries as country}
                <option value={country.code}>{country.name}</option>            
              {/each}
            </select>
          </label>
          <label class="label">
            <span>Gender*</span>
            <select class="select p-2" bind:value={profile.genderRefId} required>
              {#each data.listGender as gender}
                <option value={gender.id}>{gender.name}</option>            
              {/each}
            </select>
          </label>
        </div>
        <label class="label">
          <span>Address</span>
          <input class="input p-2" type="text" placeholder="Input" bind:value={profile.address} />
        </label>
        <label class="label">
          <span>District/State/Province</span>
          <input class="input p-2" type="text" placeholder="Input" bind:value={profile.district} />
        </label>
        <label class="label">
          <span>Residence Country*</span>
          <select class="select" bind:value={profile.residenceCountryCode} required>
            {#each arrCountries as country}
              <option value={country.code}>{country.name}</option>            
            {/each}
          </select>
        </label>
        <label class="label">
          <span>Phone*</span>
          <div class="flex flex-row gap-4">
            <select class="select w-2/5" bind:value={profile.phoneCountry} required>
              {#each arrCountries as country}
                <option value={country.code}>{country.name} ({'+'+country.phone})</option>            
              {/each}
            </select>
            <input class="input p-2" type="number" placeholder="Input" bind:value={profile.phone} required />
          </div>
        </label>
        <div class="flex flex-row-reverse my-4">
          <button class="btn variant-filled-success" type="submit">
            <span class="h3 mr-2"><Icon icon="mingcute:save-2-line" /></span>
            Save Profile
          </button>
        </div>
      </form>
    {/if}
    <div class="">
      <h1 class="h1 font-bold text-primary-600-300-token">Player Game Metadata</h1>
      <div class="grid grid-cols-2 text-lg gap-2">
        <div class="text-primary-600-300-token text-right">Current Rank Tier:</div>
        <div class="">{profile.rtData.name}</div>
        <div class="text-primary-600-300-token text-right">Current Rank Poin:</div>
        <div class="">{profile.currentRP}</div>
        <div class="text-primary-600-300-token text-right">Total Tournament Point :</div>
        <div class="">{profile.currentTP ?? 0}</div>
        <div class="text-primary-600-300-token text-right">Total Match :</div>
        <div class="">{profile.metaData?.totalMatch ?? 0}</div>
        <div class="text-primary-600-300-token text-right">Total Chombo :</div>
        <div class="">{profile.metaData?.totalChombo ?? 0}</div>
        <div class="text-primary-600-300-token text-right">Total first place :</div>
        <div class="">{profile.metaData?.totalFirst ?? 0}</div>
        <div class="text-primary-600-300-token text-right">Total second place :</div>
        <div class="">{profile.metaData?.totalSecond ?? 0}</div>
        <div class="text-primary-600-300-token text-right">Total third place :</div>
        <div class="">{profile.metaData?.totalThird ?? 0}</div>
        <div class="text-primary-600-300-token text-right">Total fourth place :</div>
        <div class="">{profile.metaData?.totalFourth ?? 0}</div>
        <div class="text-primary-600-300-token text-right">Total Tsumo :</div>
        <div class="">{profile.metaData?.totalTsumo ?? 0}</div>
        <div class="text-primary-600-300-token text-right">Total Ron :</div>
        <div class="">{profile.metaData?.totalRon ?? 0}</div>
        <div class="text-primary-600-300-token text-right">Total Deal In :</div>
        <div class="">{profile.metaData?.totalDealIn ?? 0}</div>
      </div>
    </div>
  </div>
</div>