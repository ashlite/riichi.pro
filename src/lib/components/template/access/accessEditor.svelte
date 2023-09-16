<script>
  import Collapsible from "$lib/components/molecule/collapsible.svelte";
	import { onMount } from "svelte";
  import Toggle from "$lib/components/atom/toggle.svelte";
  import TextInput from "$lib/components/molecule/textInput.svelte";
  export let access

  onMount(() =>{
    access.inventory.purchase.approval = access.inventory.purchase.approval.toString()
  })

</script>

<div class="flex flex-col w-1/2">
  <Collapsible title="catalogue">
    <Toggle label="root" color="primary" bind:checked={access['catalogue'].root} />
    <Toggle label="collection-create" color="primary" bind:checked={access['catalogue'].collection.create}/>
    <Toggle label="collection-update" color="primary" bind:checked={access['catalogue'].collection.update}/>
    <Toggle label="product-create" color="primary" bind:checked={access['catalogue'].product.create}/>
    <Toggle label="product-update" color="primary" bind:checked={access['catalogue'].product.update}/>
  </Collapsible>
  <Collapsible title="crm">
    <Toggle label="root" color="primary" bind:checked={access['crm'].root} />
    <Toggle label="customer-create" color="primary" bind:checked={access['crm'].customer.create}/>
    <Toggle label="customer-update" color="primary" bind:checked={access['crm'].customer.update}/>
    <Toggle label="supplier-create" color="primary" bind:checked={access['crm'].supplier.create}/>
    <Toggle label="supplier-update" color="primary" bind:checked={access['crm'].supplier.update}/>
    <Toggle label="venue-create" color="primary" bind:checked={access['crm'].venue.create}/>
    <Toggle label="venue-update" color="primary" bind:checked={access['crm'].venue.update}/>
  </Collapsible>
  <Collapsible title="inventory">
    <Toggle label="root" color="primary" bind:checked={access['inventory'].root} />
    <Toggle label="purchase-create" color="primary" bind:checked={access['inventory'].purchase.create}/>
    <Toggle label="purchase-update" color="primary" bind:checked={access['inventory'].purchase.update}/>
    <Toggle label="purchase-canceled" color="primary" bind:checked={access['inventory'].purchase.canceled}/>
    <Toggle label="purchase-invoice-create" color="primary" bind:checked={access['inventory'].purchase.invoice.create}/>
    <Toggle label="purchase-invoice-update" color="primary" bind:checked={access['inventory'].purchase.invoice.update}/>
    <Toggle label="purchase-invoice-delete" color="primary" bind:checked={access['inventory'].purchase.invoice.delete}/>
    <Toggle label="purchase-pricing-update" color="primary" bind:checked={access['inventory'].purchase.pricing.update}/>
    <Toggle label="purchase-pricing-bot" color="primary" bind:checked={access['inventory'].purchase.pricing.bot}/>
    <TextInput labelTL="Purchase approval" bind:value={access['inventory'].purchase.approval} />
    <Toggle label="report-create" color="primary" bind:checked={access['inventory'].report.create}/>
    <Toggle label="report-canceled" color="primary" bind:checked={access['inventory'].report.canceled}/>
    <Toggle label="report-finalized" color="primary" bind:checked={access['inventory'].report.finalized}/>
    <Toggle label="report-movement-create" color="primary" bind:checked={access['inventory'].report.movement.create}/>
    <Toggle label="report-movement-delete" color="primary" bind:checked={access['inventory'].report.movement.delete}/>
  </Collapsible>
  <!-- <Collapsible title="sale">
    <Toggle label="root" color="primary" bind:checked={access.sale.root} />
    <Toggle label="sale-create" color="primary" bind:checked={access.sale.create}/>
    <Toggle label="sale-update" color="primary" bind:checked={access.sale.update}/>
    <Toggle label="sale-canceled" color="primary" bind:checked={access.sale.canceled}/>
    <Toggle label="sale-finishing" color="primary" bind:checked={access.sale.finishing}/>
  </Collapsible> -->
  <Collapsible title="cashflow">
    <Toggle label="root" color="primary" bind:checked={access['cashflow'].root} />
    <Toggle label="ledger-create" color="primary" bind:checked={access['cashflow'].ledger.create}/>
    <Toggle label="ledger-update" color="primary" bind:checked={access['cashflow'].ledger.update}/>
    <Toggle label="ledger-delete" color="primary" bind:checked={access['cashflow'].ledger.delete}/>
  </Collapsible>
  <Collapsible title="setting">
    <Toggle label="root" color="primary" bind:checked={access['setting'].root} />
    <Toggle label="forex-create" color="primary" bind:checked={access['setting'].forex.create}/>
    <Toggle label="forex-update" color="primary" bind:checked={access['setting'].forex.update}/>
  </Collapsible>
  <Collapsible title="access">
    <Toggle label="root" color="primary" bind:checked={access['access'].root} />
    <Toggle label="update" color="primary" bind:checked={access['access'].update}/>
  </Collapsible>
  <Collapsible title="file">
    <Toggle label="upload" color="primary" bind:checked={access.file.upload}/>
    <Toggle label="download" color="primary" bind:checked={access.file.download} />
    <Toggle label="delete" color="primary" bind:checked={access.file.delete}/>
  </Collapsible>
</div>