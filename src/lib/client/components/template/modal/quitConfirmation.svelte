<script lang="ts">
import ModalSubmit from "molecule/modalSubmit.svelte";
import type { iMemberAction } from "interface/club";
import type { iGlobalResponse } from "interface/utils";
import { goto } from "$app/navigation";
import toastAlert from "store/toast";
import globalModal from "store/modal";
import LoadingSpinner from "atom/loadingSpinner.svelte";

export let clubName: string
export let memberId: number
export let slug: string
let processing = false

async function quit() {
  processing = true
  const payload: iMemberAction = {action: 'quit', targetId: memberId}
  const response = await fetch(`/api/v1/private/club/${slug}/actionmember`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  const result = await response.json() as iGlobalResponse
  if (result.header.ok) {
    goto('/')
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
    <p>Are you sure you want to quit <span class="font-bold text-primary">{clubName}</span></p>
    <ModalSubmit on:submit={quit} />
  {/if}
</div>