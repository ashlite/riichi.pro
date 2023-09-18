<script lang="ts">
import { listCountries} from 'countries-ts';

export let labelTR: string | null = null
export let labelTL: string | null = null 
export let selectStyle: 'bordered' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost' = "bordered"
export let size: 'lg' | 'md' | 'sm' | 'xs' = 'md'
export let disabled = false
export let value: string | undefined
export let name: string | null = null

const listCountry = listCountries()
</script>

<div class="form-control w-full">
  {#if labelTL || labelTR}
    <label for="" class="label">
      <span class="label-text">{labelTL ? labelTL : ''}</span>
      <span class="label-text-alt">{labelTR ? labelTR : ''}</span>
    </label>
  {/if}
  <select class={`select text-base-content select-${selectStyle} select-${size}`} name={name} disabled={disabled} bind:value={value}>
    {#each listCountry as country}
      <option value={country.countryCode}>{country.label}</option>
    {/each}
  </select>
</div>