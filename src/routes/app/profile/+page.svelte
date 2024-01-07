<script lang="ts">
  import type { PageData } from "./$types";
  import { countryNameFromCode, countryPhoneFromCode } from "service/country";
  import { dateFormater } from "service/tools";
  import Button from "atom/button.svelte";
	import toastAlert from "store/toast";

  export let data: PageData
  $: profile = data.profileData
  let showPhone = false
  let showId = false
</script>

<div class="mt-8 w-4/5 mx-auto">
  <h1 class="text-3xl font-bold text-primary">User Profile</h1>
  <div class="divider my-0"></div>
  <div class="grid grid-cols-4 text-lg gap-4">
    <div class="text-secondary text-right">ID :</div>
    <div class="">{profile.id}</div>
    <div class="text-secondary text-right"># ID :</div>
    <div class="text-sm self-center">{profile.seqId}</div>
    <div class="text-secondary text-right">Name :</div>
    <div class="">{profile.fullName}</div>
    <div class="text-secondary text-right">Nationality :</div>
    <div class="">{profile.nationalityCountryCode ? countryNameFromCode(profile.nationalityCountryCode) : 'none'}</div>
    <div class="text-secondary text-right">Gender :</div>
    <div class="">{profile.genderData?.name}</div>
    <div class="text-secondary text-right">Date of birth :</div>
    <div class="">{profile.dob ? dateFormater(profile.dob, 'date') : '--'}</div>
    <div class="text-secondary text-right">Address :</div>
    <div class="">{profile.address}</div>
    <div class="text-secondary text-right">District/State/Province :</div>
    <div class="">{profile.district}</div>
    <div class="text-secondary text-right">Residence Country :</div>
    <div class="">{profile.residenceCountryCode ? countryNameFromCode(profile.residenceCountryCode) : 'none'}</div>
    <div class="text-secondary text-right">Phone :</div>
    <div class="" 
      on:mouseover={() => showPhone = true} 
      on:mouseleave={() => showPhone = false}>
        {showPhone ? `+${countryPhoneFromCode(profile.phoneCountry ?? 'ID')} ${profile.phone}` : `--hover to reveal--`}
    </div>
    {#if profile.realId && profile.sourceRealId}
      <div class="text-secondary text-right">{profile.sourceRealId} :</div>
      <div class="" 
        on:mouseover={() => showId = true}
        on:mouseleave={() => showId = false}>
          {showId ? `${profile.realId}` : `--hover to reveal--`}
      </div>
    {:else}
      <div class="text-warning text-center col-span-2">No Real ID inputed</div>
    {/if}
    <div class="text-secondary text-right">Email :</div>
    <div class="">{profile.email}</div>
    <div class="text-secondary text-right">Joined at :</div>
    <div class="">{dateFormater(profile.joinedAt,'datetime')}</div>
    <div class="text-secondary text-right">Status :</div>
    <div class="">{profile.banStatus ? `Banned: ${profile.banReason}` : 'active'}</div>
  </div>
  <h1 class="text-3xl font-bold text-primary mt-8">Player Data</h1>
  <div class="divider my-0"></div>
  <div class="grid grid-cols-4 text-lg gap-4">
    <div class="text-secondary text-right">Total Match :</div>
    <div class="">{profile.metaData?.totalMatch}</div>
    <div class="text-secondary text-right">Total Chombo :</div>
    <div class="">{profile.metaData?.totalChombo}</div>
    <div class="text-secondary text-right">Current Rank :</div>
    <div class="">{profile.rtData.name} - {profile.currentRP}</div>
    <div class="text-secondary text-right">Total Tournament Point :</div>
    <div class="">{profile.currentTP}</div>
    <div class="text-secondary text-right">Total first / second / third / last :</div>
    <div class="">{profile.metaData?.totalFirst} / {profile.metaData?.totalSecond} / {profile.metaData?.totalThird} / {profile.metaData?.totalFourth}</div>
  </div>
  <h1 class="text-3xl font-bold text-primary mt-8">Actions</h1>
  <div class="divider my-0"></div>
  <div class="flex flex-row gap-4">
    <Button text="Update Profile" color="accent" on:click={() => toastAlert.warning("Feature Work In Progress")} />
  </div>
</div>