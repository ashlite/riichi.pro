<script lang="ts">
  export let listPage: string[] = []
  export let selectedPage: number = 0
  export let size: 'xs' | 'sm' | 'md' | 'lg' = 'lg'

  let classBuilder: string
  switch(size) {
    case "xs":
      classBuilder = 'tab tab-xs tab-lifted'
      break
    case "sm":
      classBuilder = 'tab tab-sm tab-lifted'
      break
    case "lg":
      classBuilder = 'tab tab-lg tab-lifted'
      break
    default:
      classBuilder = 'tab tab-lifted'
  }
</script>

<div class="tabs mb-8">
  {#each listPage as subPage, i }
    {#if selectedPage == i}
      <button class={`${classBuilder} tab-active text-primary`}>{subPage}</button> 
    {:else}
      <button class={`${classBuilder}`} on:click={() => selectedPage = i}>{subPage}</button>
    {/if}
  {/each}
</div>