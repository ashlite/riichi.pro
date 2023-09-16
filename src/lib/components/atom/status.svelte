<script lang="ts">
  export let title: string | null
  export let value: string | number | null
  export let titleSize: 'sm' | 'md' | 'lg' | 'xl' = 'xl'
  export let valueSize: 'xl' | '2xl' | '3xl' | '4xl' = '4xl'
  export let valueColor = 'primary'
  export let detail: string | null = null
  export let detailSize: 'sm' | 'md' | 'lg' = 'md'
</script>

<div class="stat w-32">
  <div class={`stat-title text-${titleSize}`}>{title}</div>
  <div class={`stat-value text-${valueColor} text-${valueSize}`}>{value}</div>
  {#if detail}
    <div class={`stat-desc text-${detailSize}`}>{detail}</div>
  {/if}
</div>