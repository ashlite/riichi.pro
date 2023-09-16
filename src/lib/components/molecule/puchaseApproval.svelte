<script lang="ts">
  import Icon from "@iconify/svelte"
  import TextInput from "molecule/textInput.svelte"
  import Button from "atom/button.svelte"
  import { post, del } from '$lib/service/api'
  import toastAlert from 'store/toast'
	import { dateFormater } from "$lib/service/tools"
  import { invalidateAll } from "$app/navigation"

  export let data: any | null = null // object approval purchase
  export let type: string | null
  export let headerId = 0 // purchase header id
  export let subText = 'Please approve this section if finish.'
  let noteInput = false
  let approvalNote = ''

  async function handleSubmit(){
    if (headerId > 0){
      const requestBody = {
        notes: approvalNote,
        approval_type: type
      }
      const result = await post(`/purchase/approval/${headerId}`, requestBody)
      if (result.ok) {
        invalidateAll()
      } else {
        toastAlert.fetchError(result)
      }
      noteInput = false
    } else toastAlert.error('Invalid Header Purchase ID')
  }
  async function handleCancelApprove(){
    const result = await del(`/purchase/approval/${headerId}?type=${type}`)
    if (result.ok) {
      invalidateAll()
    } else {
      toastAlert.fetchError(result)
    }
  }
</script>

{#if data == undefined}
  {#if noteInput == false}
    <div class="alert alert-error shadow-lg">
      <div>
        <Icon icon="uil:file-lock-alt" width="30" height="30" />
        <div>
          <h3 class="font-bold">Not Aprrove</h3>
          <div class="text-xs">{subText}</div>
        </div>
      </div>
      <div class="flex-none">
        <Button text="Approve" on:click={() => noteInput=true} />
      </div>
    </div>
  {:else}
    <form on:submit|preventDefault={() => handleSubmit()}>
      <div class="alert shadow-lg">
        <div class="w-3/5 gap-4">
          <Icon icon="uil:file-lock-alt" width="30" height="30" />
          <TextInput labelTL="Input Approval notes" labelTR="leave blank if there is no note" bind:value={approvalNote} limit={1000} />
        </div>
        <div class="flex-none">
          <Button text="Submit" type="submit" color="success" />
          <Button text="Cancel" color="warning" on:click={() => noteInput=false}/>
        </div>
      </div>
    </form>
  {/if}
{:else}
  <div class="alert alert-success shadow-lg">
    <div>
      <Icon icon="uil:file-lock-alt" width="30" height="30" />
      <div>
        <h3 class="font-bold">{`Approve by: ${data.user.first_name} ${data.user.last_name} (${data.user.email})`}</h3>
        <div class="text-xs">
          <span class="font-bold">Date: </span> {dateFormater(data.created_at, 'date')} - 
          <span class="font-bold">Notes: </span> {data.notes}
        </div>
      </div>
    </div>
    <div class="flex-none">
      <button class="btn" on:click={() => handleCancelApprove()}>Cancel Approval</button>
    </div>
  </div>
{/if}