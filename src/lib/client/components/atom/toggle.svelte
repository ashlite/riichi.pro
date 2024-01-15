<script lang="ts">
  export let checked = false
  export let label = ''
  export let color = 'base'
  export let size = 'md'
  export let disabled = false
  export let vertical: boolean = false

  function checkEnter(e: KeyboardEvent){
    if (e.key == 'Enter') checked = !checked
  }
</script>

<div class={`form-control w-full`}>
  {#if label == '' }
    <input type="checkbox" class="toggle" bind:checked={checked} />
  {:else}
    <label class={`label cursor-pointer flex gap-2 ${vertical? 'flex-col' : 'flex-row'}`}>
      <span class="label-text">{label}</span> 
      <input 
        type="checkbox" 
        class={`toggle toggle-${color} toggle-${size}`} 
        bind:checked={checked} 
        disabled={disabled}
        on:keypress|preventDefault={ e => checkEnter(e) }
      />
    </label>
  {/if}
</div>