<script lang="ts">
  import Icon from '@iconify/svelte'
  export let text = 'Alert information'
  export let color = 'base'
  export let icon: string | null = null

</script>

<div class={`alert alert-${color} shadow-lg`}>
  <div>
    {#if icon}
      <Icon icon={icon} width=30 height=30 />
    {/if}
    <span>{text}</span>
  </div>
</div>