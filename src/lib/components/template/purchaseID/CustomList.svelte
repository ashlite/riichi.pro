<script>
  import { priceFormater } from "$lib/service/tools"
  import TextInput from "molecule/textInput.svelte"

  export let data
  let customPercent = 55
  let sumData = summaryPurchase()

  $: customPercent, sumData = summaryPurchase()

  function summaryPurchase(){
    let totalQty = 0
    let totalForexBuy = 0
    let totalCustomBuy = 0
    data.list_item.forEach(item => {
      totalQty += item.ordered_qty
      totalForexBuy += item.ordered_qty * item.forex_buy
      totalCustomBuy += Math.floor(item.forex_buy * 100 * customPercent / 100) * item.ordered_qty
    });
    totalCustomBuy = totalCustomBuy / 100
    return {totalQty, totalForexBuy, totalCustomBuy}
  }

</script>

<div class="overflow-x-auto">
  <table class="table w-full table-compact">
    <!-- head -->
    <thead>
      <tr>
        <th rowspan="2" class="text-xl text-center">Product</th>
        <th rowspan="2" class="text-xl text-center">Qty</th>
        <th colspan="2" class="text-xl text-center">{data.forex_symbol}</th>
        <th colspan="2">
          <TextInput labelTL="Calculate in %" bind:value={customPercent} />
        </th>
        <th rowspan="2"></th>
      </tr>
      <tr>
        <th class="text-xl text-center">Single</th>
        <th class="text-xl text-center">Total</th>
        <th class="text-xl text-center">Single</th>
        <th class="text-xl text-center">Total</th>
      </tr>
    </thead>
    <tbody>
      {#each data.list_item as item}
        <tr>
          <td>
            <div class="flex flex-row gap-2">
              <div class="avatar">
                <div class="w-20 rounded">
                  <img src={item.product.product_image != undefined ? item.product.product_image : item.product.collection.cover} alt="Product"/>
                </div>
              </div>
              <div class="flex flex-col">
                {#if item.is_new}
                  <div class="badge badge-md badge-accent font-bold text-accent-content">NEW ITEMS</div>
                {/if}
                <div class="text-xl font-bold text-ellipsis">{item.product.collection.name}</div>
                <div class="text-info text-ellipsis">{item.product.name}</div>
              </div>
            </div>
          </td>
          <td class="tex-center text-xl">
            {item.ordered_qty}
          </td>
          <td class="text-right">
            {priceFormater(item.forex_buy, data.forex_symbol)}
          </td>
          <td class="text-right">
            {priceFormater(item.forex_buy * item.ordered_qty, data.forex_symbol)}
          </td>
          <td class="text-right">
            {priceFormater(Math.floor(item.forex_buy * 100 * customPercent / 100)/100, data.forex_symbol)}
          </td>
          <td class="text-right">
            {priceFormater(Math.floor(item.forex_buy * 100 * customPercent / 100) * item.ordered_qty / 100, data.forex_symbol)}
          </td>
        </tr>
      {/each}
      <tr>
        <td class="text-info font-bold text-2xl text-right">PURCHASE SUMMARY</td>
        <td class="text-info font-bold text-xl">{sumData.totalQty}</td>
        <td class="text-info font-bold text-xl text-right" colspan="2">
          {priceFormater(sumData.totalForexBuy, 'USD')}
        </td>
        <td class="text-info font-bold text-xl text-right" colspan="2">
          {priceFormater(sumData.totalCustomBuy, 'USD')}
        </td>
      </tr>
    </tbody>
  </table>
</div>