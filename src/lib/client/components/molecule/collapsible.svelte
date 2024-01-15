<script lang="ts">
  export let title = 'Open secret'
  export let color: 'primary' | 'secondary' | 'accent' = 'primary'
</script>

<div class={`collapse collapse-arrow`}>
  <input type="checkbox" /> 
  <div class={`collapse-title font-bold bg-${color} text-${color}-content`}>
    {title}
  </div>
  <div class={`collapse-content bg-${color} text-${color}-content`}> 
    <slot />
  </div>
</div>