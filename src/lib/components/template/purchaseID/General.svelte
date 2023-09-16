<script lang="ts">
  import SupplierCard from "molecule/supplierCard.svelte"
  import Button from "atom/button.svelte";
  import { priceFormater, dateFormater } from "$lib/service/tools"
  import globalModal from "store/modal";
  import toastAlert from "store/toast";
  import { upload } from '$lib/service/api'
  import Status from "atom/status.svelte";
  import FileCard from "molecule/fileCard.svelte";
  import type { iGetHeaderPurchaseComplex } from "interface/inventory";
  import { invalidateAll } from "$app/navigation"
	
  export let data: iGetHeaderPurchaseComplex
  let statusPurchase = data.canceled ? `${dateFormater(data.canceled_at!, 'date')} - ${data.canceled_user!.first_name} ${data.canceled_user!.last_name}` : data.finish_at ? `${dateFormater(data.finish_at, 'date')}` : 'Waiting'
  let fileInput: HTMLInputElement
  
  function approvalTitle(type:number): string {
    switch(type) {
      case 1:
        return 'Invoice'
      case 2:
        return 'Pricing'
      case 3:
        return 'Inventory'
      case 4:
        return 'Finance'
      default:
        return 'Wrong Approval'
    }
  }
  function editHeader(){
    if (data.canceled) toastAlert.error('Purchase already canceled, can not be edit/update anymore')
    else globalModal.open({
      title: 'Edit Purchase Data',
      template: 'formPurchase',
      data: data
    })
  }

  async function uploadFile(e: Event){
    if (data.canceled) toastAlert.error('Purchase already canceled, can not be edit/update anymore')
    else {
      let formData = new FormData()
      if (e.target) {
        const fileData = (e.target as HTMLInputElement).files![0]
        formData.append("payload", fileData)
        const result = await upload(`/file/upload?header_purchase=${data.id}`, formData)
        if (result.ok) {
          invalidateAll()
          toastAlert.success('Success uploading file')
        } else {
          toastAlert.fetchError(result)
        }
      } else {
        toastAlert.error('Failed to upload a file')  
      }
    }
    // refreshPage.set(true)
  }
</script>

<div class="flex flex-row justify-between">
  <div class="text-2xl font-bold text-primary">ID: {data.id}</div>
  <div class="text-xl font-bold">Create by {`${data.creator && data.creator.first_name} ${data.creator && data.creator.last_name}`}</div>
  <div class="text-xl font-bold mr-4 text-right">Date: {data.header_date && dateFormater(data.header_date, 'date')}</div>
</div>
<div class="flex flex-row my-4 justify-between content-center gap-4">
  <SupplierCard data={data.supplier}/>
  <div class="w-1/3 bg-base-200 text-base-content p-4 rounded-2xl shadow-xl">
    <h1 class="font-bold text-3xl ml-6">{data.forex_symbol}</h1>
    <h1><span class="font-bold ml-6">Buy Rate: </span>{priceFormater(data.idr_buy_rate ?? 0)}</h1>
    <h1><span class="font-bold ml-6">Sell Rate: </span>{priceFormater(data.idr_sell_rate ?? 0)}</h1>
    <Status 
      title="Purchase Status" 
      value={data.canceled ? 'Cancel' : data.finish_at ? 'Finish' : 'Progress'}
      valueColor={data.canceled ? 'error' : data.finish_at ? 'success' : 'info'} 
      detail={statusPurchase} />
  </div>
</div>

<h1 class="text-2xl font-bold text-secondary">Purchase Notes</h1>
<div class="flex flex-row gap-4">
  {#if data.purchase_notes != undefined}
    <div class="text-xl">
      {data.purchase_notes}
    </div>
  {:else}
    <h1 class="text-xl">None</h1>
  {/if}
</div>

<h1 class="text-2xl font-bold mt-4 text-secondary">Approval Status</h1>
<div class="flex flex-row gap-4">
  {#if data.approval_purchase && data.approval_purchase.length > 0}
    {#each data.approval_purchase as approval}
      <Status
        title={approvalTitle(approval.approval_type)}
        value={approval.user.first_name}
        valueColor="success"
        detail={dateFormater(approval.created_at, 'date')}
      />
    {/each}
  {:else}
    <h1 class="text-xl">Purchase not having approval at all.</h1>
  {/if}
</div>

<h1 class="text-2xl font-bold mt-4 text-secondary">Purchase Document</h1>
{#if data.list_doc != undefined && data.list_doc.length > 0}
  <div class="flex flex-row flex-wrap gap-4">
    {#each data.list_doc as fileData}
      <FileCard data={fileData} />
    {/each}
  </div>
{:else}
  <h1 class="text-xl">Purchase not having any file uploaded.</h1>
{/if}

<div class="flex flex-row my-4 justify-end gap-4">
  <Button color="warning" icon="uil:file-edit-alt" text="Edit Purchase" on:click={editHeader} />
  <input type="file" id="fileUpload" name="fileUpload" class="hidden"
    on:change={e =>uploadFile(e)} 
    bind:this={fileInput}  />
  <Button color="info" icon="uil:file-upload-alt" text="Upload Document" on:click={() => fileInput.click()}/>
  {#if data.canceled}
    <Button icon="uil:file-exclamation-alt" text="Re-Enabled Purchase" on:click={() => globalModal.cancelConfirmation(data.id)}/>
  {:else}
    <Button color="error" icon="uil:file-block-alt" text="Cancel Purchase" on:click={() => globalModal.cancelConfirmation(data.id)}/>
  {/if}
</div>