<script lang="ts">
import type { iParticipant } from "interface/match";
import TextInput from "molecule/textInput.svelte";
import NumberInput from "molecule/numberInput.svelte";
import { createEventDispatcher } from "svelte";
import Icon from "@iconify/svelte";

export let data: iParticipant
export let index: number

const dispatch = createEventDispatcher()
function changeScore(e: Event) {
  dispatch('scoreChange', (e.target as HTMLInputElement).value)
}

</script>

<div class="card bg-base-200 shadow-xl">
  <div class="card-body gap-0">
    <div class="grid grid-cols-2 ">
      <h1 class="card-title">{data.fullName}</h1>
      <button class="btn btn-square btn-error justify-self-end" on:click={() => dispatch('remove')}><Icon icon="uil:multiply" height={30}/></button>
      <h2 class="text-secondary">{data.playerRtName}</h2>
      <h2 class="text-accent justify-self-end text-2xl">{index == 0 ? 'East' : index == 1 ? 'South' : index == 2 ? 'North' : 'West'}</h2>
    </div>
    <div class="divider my-0"></div>
    <div class="grid grid-cols-3 gap-2">
      <div >
        <NumberInput labelTL="Game Score*" step={100} min={-500000} labelTR="in thousand" bind:value={data.score} on:change={changeScore} />
      </div>
      <div >
        <NumberInput labelTL="Chombo*" step={1} bind:value={data.chombo} />
      </div>
      <div>
        <NumberInput labelTL="Yakuman*" step={1} bind:value={data.yakuman} />
      </div>
      <div>
        <NumberInput labelTL="Total Ron" bind:value={data.ron} />
      </div>
      <div>
        <NumberInput labelTL="Total Tsumo" bind:value={data.tsumo} />
      </div>
      <div>
        <NumberInput labelTL="Total Deal In" bind:value={data.dealIn} />
      </div>
    </div>
  </div>
</div>