<script lang="ts">
  import Icon from "@iconify/svelte";

  export let labelTR: string | null = null
  export let labelTL: string | null = null 
  export let placeholder: string | null = null
  export let value: string | undefined
  export let required = false
  export let skipFocus = false
  export let name: string | null = null
  let remainingLimit: number

  let peek:boolean = false

</script>

<div class="form-control w-full">
  {#if labelTL || labelTR}
  <label for="" class="label">
    <span class="label-text">{labelTL ? labelTL : ''}</span>
    <span class="label-text-alt">{labelTR ? labelTR : ''}</span>
  </label>
  {/if}
  
  <div class="join">
    {#if peek}
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        class="input input-bordered w-full join-item"
        bind:value={value}
        tabindex={skipFocus ? -1 : 0}
        required={required}/>
    {:else}  
      <input
        type="password"
        name={name}
        placeholder={placeholder}
        class="input input-bordered w-full join-item"
        bind:value={value}
        tabindex={skipFocus ? -1 : 0}
        required={required}/>
    {/if}
    <button class="btn join-item" on:click={() => peek = !peek}><Icon icon={peek ? "ph:eye-slash": "ph:eye"} /></button>
  </div>
</div>