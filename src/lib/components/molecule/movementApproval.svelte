<script lang="ts">
  import Icon from "@iconify/svelte"
  import Button from "atom/button.svelte"
  // import { refreshPage } from "$lib/helper/store";
  import { post} from '$lib/service/api'
	import { dateFormater } from "$lib/service/tools";
  import type { iGetHeaderMovementComplex } from "interface/inventory";
  import { invalidateAll } from "$app/navigation"
  import toastAlert from "store/toast"

  export let data: iGetHeaderMovementComplex

  async function finishing(){
    const result = await post(`/inventory/header/${data.id}/finalize`)
    if (result.ok) {
      invalidateAll()
      toastAlert.success('Success Approving')
    } else {
      toastAlert.fetchError(result)
    }
  }

  async function canceling(){
    const result = await post(`/inventory/header/${data.id}/cancel`)
    if (result.ok) {
      invalidateAll()
      toastAlert.warning('Movement report is back to not approve')
    } else {
      toastAlert.fetchError(result)
    }
  }
</script>

{#if data.id != undefined}
  {#if data.finish_at != undefined && data.finalized_user}
    <div class="alert alert-success shadow-lg">
      <div>
        <Icon icon="uil:file-lock-alt" width="30" height="30" />
        <div>
          <h3 class="font-bold">Finished by {data.finalized_user.first_name} {data.finalized_user.last_name}</h3>
          <div class="text-xs">
            <span class="font-bold">Finalized at: </span> {dateFormater(data.finish_at, 'date')}
          </div>
          <div class="text-xs">
            Movement is <span class="font-bold">applied</span> to count total product stock.
          </div>
        </div>
      </div>
      <div class="flex-none">
        <Button text="Revokes" on:click={() => finishing()} color="secondary" />
      </div>
    </div>
  {:else if data.canceled_at != undefined && data.canceled_user}
    <div class="alert alert-error shadow-lg">
      <div>
        <Icon icon="uil:file-lock-alt" width="30" height="30" />
        <div>
          <h3 class="font-bold">Canceled by {data.canceled_user.first_name} {data.canceled_user.last_name}</h3>
          <div class="text-xs">
            <span class="font-bold">Canceled at: </span> {dateFormater(data.canceled_at, 'date')}
          </div>
          <div class="text-xs">
            Movement is <span class="font-bold">not applied</span> to count product stock. The movement is canceled
          </div>
        </div>
      </div>
      <div class="flex-none">
        <Button text="Revokes" on:click={() => canceling()} color="secondary" />
      </div>
    </div>
  {:else}
    <div class="alert shadow-lg">
      <div>
        <Icon icon="uil:file-lock-alt" width="30" height="30" />
        <div>
          <h3 class="font-bold">On Progress</h3>
          <div class="text-xs">
            <span class="font-bold">Create at: </span> {dateFormater(data.create_at, 'date')}
          </div>
          <div class="text-xs">
            Movement is <span class="font-bold">not applied</span> to count product stock. Please proceed with clicking the right button.
          </div>
        </div>
      </div>
      <div class="flex-none">
        <Button text="Finish and Applied" on:click={() => finishing()} color="success" />
        <Button text="Cancel" on:click={() => canceling()} color="error" />
      </div>
    </div>
  {/if}
{/if}