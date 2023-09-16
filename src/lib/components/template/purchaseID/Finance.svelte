<script lang="ts">
  import CellAction from "molecule/cellAction.svelte";
  import BadgePercentage from "atom/badgePercentage.svelte";
  import { dateFormater, priceFormater } from "$lib/service/tools";
	import { onMount } from "svelte";
  import Button from "atom/button.svelte";
	// import BtnAddNew from "$lib/components/atom/BtnAddNew.svelte";
  import globalModal from "store/modal";
	import Icon from '@iconify/svelte';
  import type { iGetHeaderPurchaseComplex } from "interface/inventory"
  import type { iCreateCashflow } from 'interface/cashflow';
  export let data: iGetHeaderPurchaseComplex
  let invoiceAmount = totalAmount()
  
  const defaultCashflow: iCreateCashflow = {
    flow_amount: 0,
    type_id: 1,
    header_purchase_id: data.id
  }
  
  function totalAmount() {
    let totalForex = 0
    let totalIdr = 0
    let totalSellForex = 0
    let totalSellIdr = 0
    let totalCashflowForex = 0
    let totalCashflowIdr = 0
    if (data.list_item && data.list_item.length > 0) {
      data.list_item.forEach(item => {
        totalForex += (item.forex_buy ?? 1) * item.ordered_qty
        totalIdr += item.idr_buy_price * item.ordered_qty
        totalSellForex += (item.forex_sell ?? 1) * item.ordered_qty
        totalSellIdr += item.idr_sell_price * item.ordered_qty
      })
    }
    if (data.cashflow.length > 0){
      data.cashflow.forEach(item => {
        totalCashflowForex += (item.forex_amount ?? 1)
        totalCashflowIdr += item.flow_amount
      })
    }
    
    return {buyForex: totalForex, buyIdr: totalIdr, sellForex: totalSellForex, sellIdr: totalSellIdr, cashflowForex: totalCashflowForex, cashflowIdr: totalCashflowIdr}
  }
</script>

<div class="mt-4 text-xl font-bold text-accent">
  Based on Product Only
</div>
<div class="overflow-x-auto my-4">
  <table class="table w-full">
    <thead>
      <tr>
        <th>Description</th>
        <th>Amount Forex</th>
        <th>Amount IDR</th>
        <th>Action/Info</th>
      </tr>
    </thead>
    <tbody>
      <tr class='text-secondary'>
        <td>
          Total Selling Value for all items
        </td>
        <td>{priceFormater(invoiceAmount.sellForex, data.forex_symbol)}</td>
        <td>{priceFormater(invoiceAmount.sellIdr)}</td>
        <td>Calculated</td>
      </tr>
      <tr class='text-secondary'>
        <td>
          Total Cost of purchased items
        </td>
        <td>{priceFormater(invoiceAmount.buyForex, data.forex_symbol)}</td>
        <td>{priceFormater(invoiceAmount.buyIdr)}</td>
        <td>Calculated</td>
      </tr>
      <tr>
        <td>
          Net Margin with percentage
        </td>
        <td>{priceFormater(invoiceAmount.sellForex - invoiceAmount.buyForex, data.forex_symbol)}</td>
        <td>{priceFormater(invoiceAmount.sellIdr - invoiceAmount.buyIdr)}</td>
        <td><BadgePercentage value={Math.round((invoiceAmount.sellIdr - invoiceAmount.buyIdr)/invoiceAmount.sellIdr*100)} /></td>
      </tr>
    </tbody>
  </table>
</div>

<div class="mt-6 flex flex-row justify-between items-center">
  <div class="text-xl font-bold text-accent">
    Based on Real Cashflow
  </div>
  <Button color="primary" icon="uil:plus" kbd="N" key="KeyN" text="cashflow" on:click={() => globalModal.open({
    title: 'Add Cashflow',
    template: 'formCashFlow',
    data: defaultCashflow
  })} />
</div>
<div class="overflow-x-auto my-4">
  <table class="table w-full">
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Amount Forex</th>
        <th>Amount IDR</th>
        <th>Action/Info</th>
      </tr>
    </thead>
    <tbody>
      {#each data.cashflow as cashflow}
        <tr class={cashflow.type.is_negative ? 'text-error' : 'text-success'}>
          <td>{dateFormater(cashflow.created_at, 'date')}</td>
          <td class="tooltip cursor-help tooltip-accent flex flex-row" data-tip={cashflow.notes}>
            {cashflow.type.flow_type}
            {#if cashflow.list_doc.length > 0}
              <Icon icon="uil:paperclip" width=26 height=26 />
            {/if}
          </td>
          {#if cashflow.forex_symbol != undefined && cashflow.forex_symbol != 'IDR'}
          <td>{priceFormater((cashflow.forex_amount ?? 1), cashflow.forex_symbol)}</td>
          {:else}
          <td>0</td>
          {/if}
          <td>{priceFormater(cashflow.flow_amount)}</td>
          <td><CellAction remove 
            on:remove={() => globalModal.deleteConfirmation('/cashflow', `cashflow id ${cashflow.id}`, cashflow.id)}
          /></td>
        </tr>
      {/each}
      <tr class='text-secondary'>
        <td colspan="2">
          Total Selling Value for all items
        </td>
        <td>{priceFormater(invoiceAmount.sellForex, data.forex_symbol)}</td>
        <td>{priceFormater(invoiceAmount.sellIdr)}</td>
        <td>Calculated</td>
      </tr>
      <tr>
        <td colspan="2">
          Net Margin with percentage
        </td>
        <td>{priceFormater(invoiceAmount.sellForex - invoiceAmount.cashflowForex, data.forex_symbol)}</td>
        <td>{priceFormater(invoiceAmount.sellIdr + invoiceAmount.cashflowIdr)}</td>
        <td><BadgePercentage value={Math.round((invoiceAmount.sellIdr + invoiceAmount.cashflowIdr)/invoiceAmount.sellIdr*100)} /></td>
      </tr>
    </tbody>
  </table>
</div>