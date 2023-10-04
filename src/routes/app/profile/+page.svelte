<script lang="ts">
  import type { PageData } from "./$types";
  import { objCountries } from "service/country";
  import { dateFormater } from "service/tools";
  import Button from "atom/button.svelte";
  import { firebaseAuth } from "service/firebase";
  import { sendEmailVerification } from "firebase/auth";
	import toastAlert from "store/toast";

  export let data: PageData
  const country = objCountries[data.profileData.countryCode as keyof typeof objCountries]
  const phoneCountry = "+"+ country.phone
  const playerData = data.profileData.playerData
  let showPhone = false
  let showId = false

  async function emailVerification() {
    try {
      toastAlert.warning('A verification email has been send to your email, check your inbox or spam folders')
      await sendEmailVerification(firebaseAuth.currentUser!)
    } catch (e) {
      console.log(e)
    }
  }
</script>

<div class="mt-8 w-4/5 mx-auto">
  <h1 class="text-3xl font-bold text-primary">User Profile (id: {data.profileData.id})</h1>
  <div class="divider my-0"></div>
  <div class="grid grid-cols-4 text-lg gap-4">
    <div class="text-secondary text-right">Name :</div>
    <div class="">{data.profileData.firstName} {data.profileData.lastName}</div>
    <div class="text-secondary text-right">Nationality :</div>
    <div class="">{country.name}</div>
    <div class="text-secondary text-right">Gender :</div>
    <div class="">{data.profileData.genderData?.name}</div>
    <div class="text-secondary text-right">Date of birth :</div>
    <div class="">{data.profileData.dob ? dateFormater(data.profileData.dob, 'date') : '--'}</div>
    <div class="text-secondary text-right">Address :</div>
    <div class="">{data.profileData.address}</div>
    <div class="text-secondary text-right">District/State/Province :</div>
    <div class="">{data.profileData.district}</div>
    <div class="text-secondary text-right">Phone :</div>
    <div class="" 
      on:mouseover={() => showPhone = true} 
      on:mouseleave={() => showPhone = false}>
        {showPhone ? `${phoneCountry} ${data.profileData.phone}` : `--hover to reveal--`}
    </div>
    <div class="text-secondary text-right">{data.profileData.sourceRealId} :</div>
    <div class="" 
      on:mouseover={() => showId = true}
      on:mouseleave={() => showId = false}>
        {showId ? `${data.profileData.realId}` : `--hover to reveal--`}
    </div>
    <div class="text-secondary text-right">Email ({data.profileData.emailVerified ? 'verified' : 'unverified'}) :</div>
    <div class="">{data.profileData.email}</div>
    <div class="text-secondary text-right">Joined at :</div>
    <div class="">{dateFormater(data.profileData.joinedAt,'datetime')}</div>
    <div class="text-secondary text-right">Status :</div>
    <div class="">{data.profileData.banStatus ? `Banned: ${data.profileData.banReason}` : 'active'}</div>
  </div>
  {#if playerData}
    <h1 class="text-3xl font-bold text-primary mt-8">Player Data (id: {playerData.id})</h1>
    <div class="divider my-0"></div>
    <div class="grid grid-cols-4 text-lg gap-4">
      <div class="text-secondary text-right">Total Match :</div>
      <div class="">{playerData.totalMatch}</div>
      <div class="text-secondary text-right">Total Chombo :</div>
      <div class="">{playerData.totalChombo}</div>
      <div class="text-secondary text-right">Current Rank :</div>
      <div class="">{playerData.rtData.name} - {playerData.currentRP}</div>
      <div class="text-secondary text-right">Total Match Point :</div>
      <div class="">{playerData.currentMP}</div>
      <div class="text-secondary text-right">Total first / second / third / last :</div>
      <div class="">{playerData.totalFirst} / {playerData.totalSecond} / {playerData.totalThird} / {playerData.totalFourth}</div>
      <div class="text-secondary text-right">Rate Ron / Tsumo / Deal In:</div>
      <div class="">{playerData.avgRon * 100}% / {playerData.avgTsumo * 100}% / {playerData.avgDealIn * 100}%</div>
    </div>
  {/if}
  <h1 class="text-3xl font-bold text-primary mt-8">Actions</h1>
  <div class="divider my-0"></div>
  <div class="flex flex-row gap-4">
    <Button text="Reset Password" color="accent" on:click={() => toastAlert.warning("Feature Work In Progress")} />
    <Button text="Verify Email" color="accent" on:click={() => toastAlert.warning("Feature Work In Progress")} />
    <Button text="Update Profile" color="accent" on:click={() => toastAlert.warning("Feature Work In Progress")} />
  </div>
</div>