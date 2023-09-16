<script lang="ts">
  export let labelTR: string | null = null
  export let labelTL: string | null = null 
  export let labelBL: string | null = null
  export let placeholder: string | null = null
  export let limit = 0
  export let value: string = ''
  export let uppercase = false
  export let disabled = false
  export let required = false
  export let skipFocus = false
  export let h = 32
  let remainingLimit: number

  $: if (value?.length > 0) {
    remainingLimit = limit - value.length
  } else {
    remainingLimit = limit
  }

</script>

<div class="form-control w-full">
  {#if labelTL || labelTR}
    <label for="" class="label">
      <span class="label-text">{labelTL ? labelTL : ''}</span>
      <span class="label-text-alt">{labelTR ? labelTR : ''}</span>
    </label>
  {/if}

  {#if limit > 0}
    <textarea 
      placeholder={placeholder}
      class={`textarea textarea-bordered w-full h-${h} ${uppercase && 'uppercase'}`}
      maxlength={limit}
      bind:value={value}
      disabled={disabled}
      tabindex={skipFocus ? -1 : 0}
      required={required} />
    <label for="" class="label">
      <span class="label-text"></span>
      <span class="label-text-alt">{`${remainingLimit}/${limit}`}</span>
    </label>
  {:else}
    <textarea
      placeholder={placeholder}
      class={`textarea textarea-bordered w-full h-${h} ${uppercase && 'uppercase'}`}
      bind:value={value}
      disabled={disabled}
      tabindex={skipFocus ? -1 : 0}
      required={required}/>
    {#if labelBL}
      <label for="" class="label">
        <span class="label-text">{labelBL}</span>
      </label>
    {/if}
  {/if}
</div>