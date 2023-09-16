<script lang="ts">
  export let labelTR: string | null = null
  export let labelTL: string | null = null 
  export let labelBL: string | null = null
  export let placeholder: string | null = null
  export let value: string | undefined
  export let required = false
  export let skipFocus = false
  export let name: string | null = null
  let remainingLimit: number


</script>

<div class="form-control w-full">
  {#if labelTL || labelTR}
    <label for="" class="label">
      <span class="label-text">{labelTL ? labelTL : ''}</span>
      <span class="label-text-alt">{labelTR ? labelTR : ''}</span>
    </label>
  {/if}
  
  <input
    type="password"
    name={name}
    placeholder={placeholder}
    class="input input-bordered w-full"
    bind:value={value}
    tabindex={skipFocus ? -1 : 0}
    required={required}/>
  {#if labelBL}
    <label for="" class="label">
      <span class="label-text">{labelBL}</span>
    </label>
  {/if}
</div>