<script lang='ts'>
  import Icon from "@iconify/svelte";

  export let value: boolean = false
  export let title: string = ''
  export let description: string = ''
</script>

<div class=" w-full rounded-xl min-h-16 shadow-md border-2 border-secondary">
  <div class="grid grid-cols-7 w-full">
    <div class="col-span-6 flex flex-col py-4 pl-6 rounded-xl bg-base-200">
      <h1 class="text-xl font-bold text-secondary">{title}</h1>
      <p>{description}</p>
    </div>
    <div class="flex flex-col items-center">
      <label class="swap swap-flip">
        <input type="checkbox" bind:checked={value} />
        <div class="swap-on text-success"><Icon icon="ph:check-fill" width={80} height={80} /></div>
        <div class="swap-off text-error"><Icon icon="ph:x-fill" width={80} height={80} /></div>
      </label>
    </div>
  </div>
</div>