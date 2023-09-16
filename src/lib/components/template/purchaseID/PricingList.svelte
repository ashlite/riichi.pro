<script lang="ts">
  import { priceFormater, marginCalc } from "$lib/service/tools"
  import toastAlert from "store/toast";
  import { patch, post } from '$lib/service/api'
  import EditableInput from "atom/editableInput.svelte";
	import BadgePercentage from "atom/badgePercentage.svelte";
	import NumberInput from "molecule/numberInput.svelte";
  import Button from "atom/button.svelte";
	import type { iGetHeaderPurchaseComplex } from "interface/inventory";
  import type { iEditableResult } from "interface/components";
  import { invalidateAll } from "$app/navigation"

  export let data: iGetHeaderPurchaseComplex
  let sumData = summaryPurchase()
  let forexPricingRate = data.idr_sell_rate ?? 1
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

  async function updateMSRP(e: iEditableResult){
    console.log(e)
    const requestBody = {
      forex_sell: e.newValue
    }
    const result = await patch(`/purchase/items/${data.id}/${e.dataId}?pricing=1`, requestBody)
    if (result.ok) {
      invalidateAll()
      toastAlert.success('Success Updating MSRP')
    } else {
      toastAlert.fetchError(result)
    }
  }

  async function updateSell(e: iEditableResult){
    const requestBody = {
      idr_sell_price: e.newValue
    }
    const result = await patch(`/purchase/items/${data.id}/${e.dataId}?pricing=1`, requestBody)
    if (result.ok) {
      invalidateAll()
      toastAlert.success('Success Updating MSRP')
    } else {
      toastAlert.fetchError(result)
    }
  }

  async function sendDiscord() {
    const response = await post(`/purchase/announce/${data.id}`)
    if (response.ok) toastAlert.success('Send successfully to discord, please check it there.')
    else toastAlert.fetchError(response)
  }

</script>

<div class="flex flex-row justify-between mb-4 gap-4 content-center">
  <div class="w-1/2 ">
    {#if data.forex_symbol != undefined && data.forex_symbol != 'IDR'}
      <NumberInput 
        labelTL = "Forex Rate for MSRP"
        bind:value={forexPricingRate}
      />
    {/if}
  </div>
  <div class="w-1/2 pt-4">
    <Button text="Send to Discord" icon="uil:discord" size="lg" on:click={sendDiscord} />
  </div>
</div>

<div class="overflow-x-auto pb-8">
  <table class="table w-full table-fixed">
    <!-- head -->
    <thead>
      <tr>
        <th class="text-xl text-center w-6/12">Data Product</th>
        {#if data.forex_symbol != undefined && data.forex_symbol != 'IDR'}
          <th class="text-xl text-center w-2/12">MSRP</th>
          <th class="text-xl text-center w-2/12">System Price</th>
          <th class="text-xl text-center w-2/12">New Price</th>
        {:else}
          <th class="text-xl text-center w-3/12">System Price</th>
          <th class="text-xl text-center w-3/12">New Price</th>
        {/if}
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
                {#if item.is_new}
                  <div class="badge badge-md badge-accent font-bold text-accent-content">NEW ITEMS</div>
                {/if}
                <div class="text-xl font-bold text-ellipsis">{item.product.collection.name}</div>
                <div class="text-info text-ellipsis">{item.product.name}</div>
              </div>
            </div>
          </td>
          {#if data.forex_symbol != undefined && data.forex_symbol != 'IDR'}
            <td class="text-left">
              <EditableInput 
                bind:value={item.forex_sell} 
                currency={data.forex_symbol} 
                frontLabel="MSRP"
                dataId={item.id.toString()}
                on:submit={e => updateMSRP(e.detail)}  
              />
              <div>
                <span class="text-info">IDR: </span> {priceFormater((item.forex_sell ?? 1) * forexPricingRate)}
              </div>
              <BadgePercentage value={marginCalc(item.idr_buy_price, (item.forex_sell ?? 1) * forexPricingRate, 'percent')} />
            </td>
          {/if}
          <td class="text-right">
            <div>{priceFormater(item.product.sell_price)}</div>
            <div class="text-info">{priceFormater(item.product.sell_price * item.ordered_qty)}</div>
            <BadgePercentage value={marginCalc(item.idr_buy_price, item.product.sell_price, 'percent')} />
          </td>
          <td class="text-right">
            <EditableInput
              bind:value={item.idr_sell_price}
              dataId={item.id.toString()}
              on:submit={e => updateSell(e.detail)}
            />
            <div class="text-info">{priceFormater(item.idr_sell_price * item.ordered_qty)}</div>
            <BadgePercentage value={marginCalc(item.idr_buy_price, item.idr_sell_price, 'percent')} />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>