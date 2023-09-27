<script lang="ts">
  export let seed: string
  export let size: string = 'w-12'
</script>

<div class="avatar">
  <div class={`${size} shadow rounded-full border-2 border-secondary`}>
    <img src={`https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=${seed}`} alt="avatar" />
  </div>
</div>

