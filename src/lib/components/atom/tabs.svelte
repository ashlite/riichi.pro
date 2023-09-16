<script lang="ts">
  export let options: string[]
  export let value: number
  export let size = 'lg'
</script>

<div class="tabs">
  {#each options as option,i}
    {#if value == i}
      <button class={`tab tab-${size} tab-bordered tab-active`}>{option}</button> 
    {:else}
      <button class="tab tab-bordered" on:click={() => value = i}>{option}</button>
    {/if}
  {/each}
</div>