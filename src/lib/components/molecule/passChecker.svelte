<script context="module" lang="ts">
  export interface iPassChecker {
    min8: boolean
    number: boolean
    special: boolean
    lower: boolean
    upper: boolean
    match: boolean
  }
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";

  export let data: iPassChecker
</script>

<div class="grid grid-cols-2 mt-4">
  <div class="flex flex-row items-center gap-4">
    <div class={data.min8 ? "text-success" : "text-error"}>
      <Icon icon={data.min8 ? 'ph:check-circle' : 'ph:x-circle'} width={20} height={20} />
    </div>
    Password minimal 8 characters
  </div>
  <div class="flex flex-row items-center gap-4">
    <div class={data.number ? 'text-success' : 'text-error'}>
      <Icon icon={data.number ? 'ph:check-circle' : 'ph:x-circle'} width={20} height={20} />
    </div>
    Password must contain number
  </div>
  <div class="flex flex-row items-center gap-4">
    <div class={data.special ? 'text-success' : 'text-error'}>
      <Icon icon={data.special ? 'ph:check-circle' : 'ph:x-circle'} width={20} height={20} />
    </div>
    Password must contain special character (@$!%*#?&)
  </div>
  <div class="flex flex-row items-center gap-4">
    <div class={data.lower ? 'text-success' : 'text-error'}>
      <Icon icon={data.lower ? 'ph:check-circle' : 'ph:x-circle'} width={20} height={20} />
    </div>
    Password must contain lowercase letter
  </div>
  <div class="flex flex-row items-center gap-4">
    <div class={data.upper ? 'text-success' : 'text-error'}>
      <Icon icon={data.upper ? 'ph:check-circle' : 'ph:x-circle'} width={20} height={20} />
    </div>
    Password must contain uppercase letter
  </div>
  <div class="flex flex-row items-center gap-4">
    <div class={data.match ? 'text-success' : 'text-error'}>
      <Icon icon={data.match ? 'ph:check-circle' : 'ph:x-circle'} width={20} height={20} />
    </div>
    Both password in the input must match
  </div>
</div>