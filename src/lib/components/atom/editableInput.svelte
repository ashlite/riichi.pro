<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { priceFormater } from '$lib/service/tools'
  import type { iEditableResult } from 'interface/components';
  export let value: string | number | undefined
  export let dataId: string | undefined
  export let currency: string | undefined = 'IDR'
  export let frontLabel: string | undefined = ''
  export let notCurrency: boolean = false
  export let action: string | undefined = ''
  
  let editing = false
  const dispatch = createEventDispatcher<{'submit': iEditableResult}>()

  function submitValue(){
    editing = false
    if (value != undefined) {
      dispatch('submit', {
        newValue: value,
        dataId: dataId!
      })
    }
  }
</script>

<div class="w-full">
  {#if editing}
    <form on:submit|preventDefault={submitValue}>
      <input autofocus type="text" class="input input-bordered input-sm" bind:value={value} on:blur={() => editing = false}/>
    </form>
  {:else}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => editing = true} class="cursor-pointer underline decoration-dotted decoration-1 underline-offset-2 font-bold">
      {#if notCurrency}
        {`${frontLabel} ${value}`}
      {:else}
        {`${frontLabel} ${priceFormater(Number(value), currency)}`}
      {/if}
    </div>
  {/if}
</div>