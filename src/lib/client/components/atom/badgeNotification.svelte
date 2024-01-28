<script lang="ts">
  export let total: number = 0
</script>

{#if total == 0}
  <span class="badge">0</span>
{:else}
  <span class="badge badge-secondary">{total}</span>
{/if}