<script lang="ts">
  export let labelTR: string | null = null
  export let labelTL: string | null = null 
  export let labelBL: string | null = null
  export let labelBR: string | null = null
  export let selectStyle: 'bordered' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' = "bordered"
  export let size: 'lg' | 'md' | 'sm' | 'xs' = 'md'
  export let disabled = false
  export let placeholder: string | null = null
  export let value: any | undefined
</script>

<div class="form-control w-full max-w-xs">
  {#if labelTL || labelTR}
    <label for="" class="label">
      <span class="label-text">{labelTL ? labelTL : ''}</span>
      <span class="label-text-alt">{labelTR ? labelTR : ''}</span>
    </label>
  {/if}
  <select class={`select text-base-content select-${selectStyle} select-${size}`} disabled={disabled} bind:value={value}>
    {#if placeholder}
      <option disabled selected class={`text-base-content`} value={undefined}>{placeholder}</option>
    {/if}
    <slot />
  </select>
  {#if labelBL || labelBR}
    <label for="" class="label">
      <span class="label-text-alt">{labelBL ? labelBL : ''}</span>
      <span class="label-text-alt">{labelBR ? labelBR : ''}</span>
    </label>  
  {/if}
</div>