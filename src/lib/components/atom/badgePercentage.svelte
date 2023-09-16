<script lang="ts">
  export let value: number
  export let type = 1
  // type = 1 > based on sell - buy / sell with >25 green, >5 yellow, else red
</script>

{#if type == 1}
  {#if value > 25}
    <div class="badge badge-success font-bold">{`${value}%`}</div>
  {:else if value > 5}
    <div class="badge badge-warning font-bold">{`${value}%`}</div>
  {:else}
    <div class="badge badge-error font-bold">{`${value}%`}</div>
  {/if}
{/if}