<script lang="ts">
  import ModalSubmit from "molecule/modalSubmit.svelte";
  import type { iMemberAction } from "interface/club";
  import type { iGlobalResponse } from "interface/utils";
  import { invalidateAll } from "$app/navigation";
  import toastAlert from "store/toast";
  import globalModal from "store/modal";
  import LoadingSpinner from "atom/loadingSpinner.svelte";
  
  export let name: string
  export let memberId: number
  export let slug: string
  let processing = false
  
  async function kick() {
    processing = true
    const payload: iMemberAction = {action: 'kick', targetId: memberId}
    const response = await fetch(`/api/v1/private/club/${slug}/actionmember`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const result = await response.json() as iGlobalResponse
    if (result.header.ok) {
      toastAlert.success(`Success kicking ${name}`)
      invalidateAll()
      globalModal.close()
    } else {
      toastAlert.responseError(result)
    }
    processing = false
  }
  
  </script>
  
  <div>
    {#if processing}
      <div class="flex flex-row justify-center">
        <LoadingSpinner />
      </div>
    {:else}
      <p>Are you sure you want to kick member <span class="font-bold text-primary">{name}</span></p>
      <ModalSubmit on:submit={kick} />
    {/if}
  </div>