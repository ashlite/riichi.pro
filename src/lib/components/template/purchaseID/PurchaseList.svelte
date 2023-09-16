<script lang="ts">
  import Button from "atom/button.svelte";
  import { priceFormater } from "$lib/service/tools"
  import globalModal from "store/modal";
  import { del, patch } from '$lib/service/api'
  import CellAction from "molecule/cellAction.svelte";
  import EditableInput from "atom/editableInput.svelte";
  import { invalidateAll } from "$app/navigation"
  import toastAlert from "store/toast"
  import type { iEditableResult } from "interface/components";
  import type { iGetHeaderPurchaseComplex } from "interface/inventory";

  export let data: iGetHeaderPurchaseComplex
  let sumData = summaryPurchase()

  $: data.list_item.length, sumData = summaryPurchase()

  function summaryPurchase(){
    let totalQty = 0
    let totalProduct = 0
    let totalIdrBuy = 0
    let totalForexBuy = 0
    data.list_item.forEach(item => {
      totalProduct++
      totalQty += item.ordered_qty
      totalIdrBuy += item.ordered_qty * item.idr_buy_price
      totalForexBuy += item.ordered_qty * (item.forex_buy ?? 1)
    });
    return {totalQty, totalProduct, totalIdrBuy, totalForexBuy}
  }

  async function removePurchaseItem(listId: number){
    const result = await del(`/purchase/items/${data.id}/${listId}`)
    if (result.ok) {
      invalidateAll()
      toastAlert.success('Success')
    } else {
      toastAlert.fetchError(result)
    }
  }

  async function updateForexPrice(e: iEditableResult) {
    const idrBuyPrice = Number(e.newValue) * (data.idr_buy_rate ?? 1)
    const result = await patch(`/purchase/items/${data.id}/${e.dataId}`, {forex_buy: e.newValue, idr_buy_price: idrBuyPrice})
    if (result.ok) {
      invalidateAll()
      toastAlert.success('Success')
    } else {
      toastAlert.fetchError(result)
    }
  }

  async function updateIdrPrice(e: iEditableResult) {
    const result = await patch(`/purchase/items/${data.id}/${e.dataId}`, {idr_buy_price: e.newValue})
    if (result.ok) {
      invalidateAll()
      toastAlert.success('Success')
    } else {
      toastAlert.fetchError(result)
    }
  }

  async function updateOrderedQty(e: iEditableResult) {
    const result = await patch(`/purchase/items/${data.id}/${e.dataId}`, {ordered_qty: e.newValue})
    if (result.ok) {
      invalidateAll()
      toastAlert.success('Success')
    } else {
      toastAlert.fetchError(result)
    }
  }

  async function changeToNew(id: number){
    const result = await patch(`/purchase/items/${data.id}/${id}`, {is_new: true})
    if (result.ok) {
      invalidateAll()
      toastAlert.success('Success')
    } else {
      toastAlert.fetchError(result)
    }
  }

  async function changeToOld(id: number){
    const result = await patch(`/purchase/items/${data.id}/${id}`, {is_new: false})
    if (result.ok) {
      invalidateAll()
      toastAlert.success('Success')
    } else {
      toastAlert.fetchError(result)
    }
  }

</script>

<div class="overflow-x-auto pb-8">
  <table class="table w-full table-fixed">
    <!-- head -->
    <thead>
      <tr>
        <th class="text-xl text-center w-7/12">Product</th>
        <th class="text-xl text-center w-1/12">Qty</th>
        {#if data.forex_symbol != undefined && data.forex_symbol != 'IDR'}
          <th class="text-xl text-center w-1/12">{data.forex_symbol}</th>
          <th class="text-xl text-center w-2/12">{data.forex_symbol != undefined ? `IDR = ${data.idr_buy_rate}` : `IDR`}</th>
        {:else}
          <th class="text-xl text-center w-3/12">IDR</th>
        {/if}
        <th class="w-1/12"></th>
      </tr>
    </thead>
    <tbody>
      {#each data.list_item.sort((a,b) => a.id - b.id) as item}
        <tr>
          <td>
            <div class="flex flex-row gap-2">
              <div class="avatar">
                <div class="w-20 rounded">
                  <img src={item.product.product_image ?? item.product.collection.cover ?? 'https://dummyimage.com/600x600/edb200/ffffff&text=NO+IMG'} alt="Product"/>
                </div>
              </div>
              <div class="flex flex-col overflow-x-clip">
                <div>
                  {#if item.is_new}
                    <Button text="NEW ITEMS" color="accent" size="xs" on:click={() => changeToOld(item.id)} />
                  {:else}
                    <Button text="RESTOCK" size="xs" on:click={() => changeToNew(item.id)} />
                  {/if}
                </div>
                <div class="text-xl font-bold text-ellipsis">{item.product.collection.name}</div>
                <div class="text-info text-ellipsis">{item.product.name}</div>
              </div>
            </div>
          </td>
          <td class="text-center text-xl">
            <EditableInput notCurrency dataId={item.id.toString()} value={item.ordered_qty.toString()} on:submit={e => updateOrderedQty(e.detail)} />
          </td>
          {#if data.forex_symbol != undefined && data.forex_symbol != 'IDR'}
            <td class="text-right">
              <div><EditableInput dataId={item.id.toString()} currency={data.forex_symbol} value={item.forex_buy?.toString()} on:submit={e => updateForexPrice(e.detail)} /></div>
              <div class="text-info">{priceFormater((item.forex_buy ?? 1) * item.ordered_qty, data.forex_symbol)}</div>
            </td>
            <td class="text-right">
              <div>{priceFormater(item.idr_buy_price)}</div>
              <div class="text-info">{priceFormater(item.idr_buy_price * item.ordered_qty)}</div>
            </td>
          {:else}
            <td class="text-right">
              <div><EditableInput dataId={item.id.toString()} value={item.idr_buy_price.toString()} on:submit={e => updateIdrPrice(e.detail)} /></div>
              <div class="text-info">{priceFormater(item.idr_buy_price * item.ordered_qty)}</div>
            </td>
          {/if}
          <td class="justify-end">
            <CellAction remove on:remove={() => removePurchaseItem(item.id)}/>
          </td>
        </tr>
      {/each}
      <tr>
        <td class="text-info font-bold text-2xl text-right">PURCHASE SUMMARY</td>
        <td class="text-info font-bold text-xl">{sumData.totalQty}</td>
        {#if data.forex_symbol != undefined && data.forex_symbol != 'IDR'}
          <td class="text-info font-bold text-xl text-right">
            {priceFormater(sumData.totalForexBuy, data.forex_symbol)}
          </td>
        {/if}
        <td class="text-info font-bold text-xl text-right">
          {priceFormater(sumData.totalIdrBuy)}
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <div class="flex flex-row gap-4 justify-end">
    <div class="w-1/4">
      <Button icon="uil:plus" text="Product" color="primary" key="KeyN" kbd="N" block on:click={() => globalModal.open({
        title: 'Add Product to this purchase',
        template: 'formAddPurchaseProduct',
        data: {
          buyRate: data.idr_buy_rate,
          headerId: data.id
        }
      })} />
    </div>
  </div>
</div>