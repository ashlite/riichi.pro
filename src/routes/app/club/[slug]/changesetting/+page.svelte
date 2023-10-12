<script lang="ts">
  import type { PageData } from "./$types";
  import type { iGlobalResponse } from "interface/utils";
  import Button from "atom/button.svelte";
  import SettingBoolCard from "molecule/settingBoolCard.svelte";
  import SettingInputCard from "molecule/settingInputCard.svelte";
	import toastAlert from "store/toast";
	import { invalidateAll } from "$app/navigation";

  export let data: PageData
  let clubSetting = data.clubSetting
  let processing = false

  async function saveSetting() {
    processing = true
    const response = await fetch(`/api/v1/club/${data.userMemberData.clubData.slug}/setting`, {
      method: 'PATCH',
      body: JSON.stringify(clubSetting)
    })
    const result = await response.json() as iGlobalResponse
    if (result.header.ok) {
      toastAlert.success('Club setting updated')
      invalidateAll()
    } else {
      toastAlert.responseError(result)
    }
    processing = false
  }
</script>


<div class="mb-8">
  <h1 class="text-5xl font-bold text-primary">Adjust Club Settings</h1>
  <div class="divider"></div>
  <div class="flex flex-col gap-4">
    <SettingBoolCard 
      title="Auto Approve Member"
      description="When enabled, any user who apply to join your club will be automatically accepted as basic member"
      bind:value={clubSetting.autoApproveMember}
    />
    <SettingBoolCard 
      title="Hide contact"
      description="When enabled, your email and phone number will be hidden for non-member."
      bind:value={clubSetting.hideContact}
    />
    <SettingBoolCard 
      title="Accept Autotable"
      description="When enabled, your club will be shown to accept autotable match entries. This entry will have reduce rank point"
      bind:value={clubSetting.acceptAutotable}
    />
    <SettingInputCard 
      title="Uma Bonus"
      description="Uma bonus for clubs internal monthly uma standing. Please note that we use 100 multiplier instead of 1000 multiplier. So bonus uma 15 point will be 150 point in here."
      type='uma'
      bind:uma1={clubSetting.firstUma}
      bind:uma2={clubSetting.secondUma}
      bind:uma3={clubSetting.thirdUma}
      bind:uma4={clubSetting.fourthUma}
    />
    <SettingInputCard 
      title="Chombo Penalty"
      description="Penalty given to a player that get a chombo when inputing match. The left input is for uma point penalty that will be calculate for monthly uma standing, while the right input is for any other penalty."
      type='chombo'
      bind:main={clubSetting.chomboPenalty}
      bind:extra={clubSetting.chomboPenaltyOther}
    />
    <SettingInputCard 
      title="Yakuman Bonus"
      description="Bonus given to a player that can make a yakuman when inputing match. The left input is for uma point bonus that will be calculate for monthly uma standing, while the right input is for any other bonus."
      type='yakuman'
      bind:main={clubSetting.yakumanBonus}
      bind:extra={clubSetting.yakumanBonusOther}
    />
    <div class="w-1/2 self-end">
      {#if processing}
        <button class="btn btn-disabled btn-lg w-full"><span class="loading loading-dots"></span>Saving</button>
      {:else}
        <Button size='lg' text="Save" color="success" icon="ph:floppy-disk-fill" full on:click={saveSetting} />
      {/if}
    </div>
  </div>
</div>