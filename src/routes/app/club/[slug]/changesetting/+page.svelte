<script lang="ts">
  //svelte
	import { invalidateAll } from "$app/navigation";
  //skeleton
  import {Avatar, getToastStore, SlideToggle, ProgressRadial} from '@skeletonlabs/skeleton'
  import type { iGlobalResponse } from 'interface/utils.js'
  //Icon
  import Icon from '@iconify/svelte'

  export let data
  const toast = getToastStore()
  $: clubSetting = data.clubSetting
  let processing = false

  async function saveSetting() {
    processing = true
    const response = await fetch(`/api/v1/private/club/${data.userMemberData.clubData.slug}/setting`, {
      method: 'PATCH',
      body: JSON.stringify(clubSetting)
    })
    const result = await response.json()
    if (response.ok) {
      toast.trigger({
        message:'Club setting updated',
        background: 'variant-filled-success'
      })
      invalidateAll()
    } else {
      toast.trigger({
        message: result.statusText,
        background: 'variant-filled-error'
      })
    }
    processing = false
  }
</script>


<div class="mb-8">
  <h1 class="h1 font-bold text-primary-600-300-token">Adjust Club Settings</h1>
  <div class="flex flex-col gap-4">
    <form class="card p-4 my-4 flex flex-col gap-4">
      <div>
        <SlideToggle name="slide" active="bg-primary-500" bind:checked={clubSetting.autoApproveMember}>
          <h3 class="h3 font-bold">Auto Approve Member</h3>
        </SlideToggle>
        <div class="">
          When enabled, any user who apply to join your club will be automatically accepted as basic member.
        </div>
      </div>
      <div>
        <SlideToggle name="slide" active="bg-primary-500" bind:checked={clubSetting.hideContact}>
          <h3 class="h3 font-bold">Hide contact info</h3>
        </SlideToggle>
        <div class="">
          When enabled, your email and phone number will be hidden for non-member.
        </div>
      </div>
      <div>
        <SlideToggle name="slide" active="bg-primary-500" bind:checked={clubSetting.acceptAutotable}>
          <h3 class="h3 font-bold">Accept Autotable</h3>
        </SlideToggle>
        <div class="">
          When enabled, your club will be shown to accept autotable match entries. This entry will have reduce rank point.
        </div>
      </div>
      <div>
        <h3 class="h3 font-bold">Uma Score</h3>
        <div class="">
          Uma bonus for clubs internal monthly uma standing. Please note that we use 100 multiplier instead of 1000 multiplier. So bonus uma 15 point will be 150 point in here.
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <label class="label">
            <span>First Position</span>
            <input class="input p-2" type="number" step="10" bind:value={clubSetting.firstUma} />
          </label>
          <label class="label">
            <span>Second Position</span>
            <input class="input p-2" type="number" step="10" bind:value={clubSetting.secondUma} />
          </label>
          <label class="label">
            <span>Third Position</span>
            <input class="input p-2" type="number" step="10" bind:value={clubSetting.thirdUma} />
          </label>
          <label class="label">
            <span>Fourth Position</span>
            <input class="input p-2" type="number" step="10" bind:value={clubSetting.fourthUma} />
          </label>
        </div>
      </div>
      <div>
        <h3 class="h3 font-bold">Chombo Penalty</h3>
        <div class="">
          Penalty given to a player that get a chombo when inputing match. The left input is for uma point penalty that will be calculate for monthly uma standing, while the right input is for any other penalty.
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="label">
            <span>Uma Penalty</span>
            <input class="input p-2" type="number" step="10" bind:value={clubSetting.chomboPenalty} />
          </label>
          <label class="label">
            <span>Other Penalty</span>
            <input class="input p-2" type="text" bind:value={clubSetting.chomboPenaltyOther} />
          </label>
        </div>
      </div>
      <div>
        <h3 class="h3 font-bold">Yakuman Bonus</h3>
        <div class="">
          Bonus given to a player that can make a yakuman when inputing match. The left input is for uma point bonus that will be calculate for monthly uma standing, while the right input is for any other bonus.
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="label">
            <span>Uma Bonus</span>
            <input class="input p-2" type="number" step="10" bind:value={clubSetting.yakumanBonus} />
          </label>
          <label class="label">
            <span>Other Bonus</span>
            <input class="input p-2" type="test" bind:value={clubSetting.yakumanBonusOther} />
          </label>
        </div>
      </div>
      <div class="flex flex-row-reverse mt-4">
        {#if processing}
          <ProgressRadial width="w-16" />
        {:else}
          <button class="btn btn-lg variant-filled-success" on:click={saveSetting}>
            <span class="h3 mr-2"><Icon icon="mingcute:save-2-line" /></span>
            Save
          </button>
        {/if}
      </div>
    </form>
  </div>
</div>