<script lang='ts'>
  import Icon from "@iconify/svelte";
  import NumberInput from "./numberInput.svelte";
  import TextInput from "./textInput.svelte";

  export let uma1: number = 0
  export let uma2: number = 0
  export let uma3: number = 0
  export let uma4: number = 0
  export let main: number = 0
  export let extra: string | null = null
  export let title: string = ''
  export let description: string = ''
  export let type: 'uma' | 'chombo' | 'yakuman'
</script>

<div class=" w-full rounded-xl min-h-16 shadow-md border-2 border-secondary">
  <div class="flex flex-col py-4 px-6 rounded-xl bg-base-200">
    <h1 class="text-xl font-bold text-secondary">{title}</h1>
    <p>{description}</p>
    {#if type == 'uma'}
      <div class="flex flex-row gap-4 mt-4">
        <NumberInput labelTL="first bonus" bind:value={uma1} min={-10000} max={10000}/>
        <NumberInput labelTL="second bonus" bind:value={uma2} min={-10000} max={10000}/>
        <NumberInput labelTL="third bonus" bind:value={uma3} min={-10000} max={10000}/>
        <NumberInput labelTL="fourth bonus" bind:value={uma4} min={-10000} max={10000}/>
      </div>
    {:else if type == 'chombo'}
      <div class="grid grid-cols-4 gap-4 mt-4">
        <div>
          <NumberInput labelTL="chombo uma penalty" bind:value={main} min={-10000} max={10000}/>
        </div>
        <div class="col-span-3">
          <TextInput labelTL="chombo other penalty" bind:value={extra}/>
        </div>
      </div>
    {:else if type == 'yakuman'}
      <div class="grid grid-cols-4 gap-4 mt-4">
        <div>
          <NumberInput labelTL="yakuman uma bonus" bind:value={main} min={-10000} max={10000}/>
        </div>
        <div class="col-span-3">
          <TextInput labelTL="yakuman other bonus" bind:value={extra}/>
        </div>
      </div>
    {/if}
  </div>
</div>