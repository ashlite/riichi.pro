<script lang="ts">
//mylib
import type { iParticipant } from "interface/match";
import {getInitials} from 'client-service/tools'
//skeleton
import {Avatar} from '@skeletonlabs/skeleton'
//svelte
import { createEventDispatcher } from "svelte";
//icon
import Icon from "@iconify/svelte";

export let data: iParticipant
export let index: number

const dispatch = createEventDispatcher()
function changeScore(e: Event) {
  dispatch('scoreChange', (e.target as HTMLInputElement).value)
}

</script>

<div class="card variant-ghost">
  <header class="card-header flex flex-row gap-4">
    <div>
      <Avatar src={data.avatarUrl ?? ''} initials={getInitials(data.fullName)} />
    </div>
    <div>
      <h2 class="h2">{data.fullName}</h2>
      <h3 class="h3 text-secondary-600-300-token">{index == 0 ? 'East' : index == 1 ? 'South' : index == 2 ? 'North' : 'West'} - {data.playerRtName}</h3>
    </div>
  </header>
  <section class="p-4">
    <div class="grid grid-cols-3 gap-2">
      <label class="labe">
        <span>Game Score</span>
        <input class="input p-2" step="100" min={-500000} type="number" bind:value={data.score} on:change={changeScore} />
      </label>
      <label class="label">
        <span>Chombo</span>
        <input class="input p-2" min={0} type="number" bind:value={data.chombo} />
      </label>
      <label class="label">
        <span>Yakuman</span>
        <input class="input p-2" min={0} type="number" bind:value={data.yakuman} />
      </label>
      <label class="label">
        <span>Total Ron</span>
        <input class="input p-2" type="number" min="0" bind:value={data.ron} />
      </label>
      <label class="label">
        <span>Total Tsumo</span>
        <input class="input p-2" type="number" min="0" bind:value={data.tsumo} />
      </label>
      <label class="label">
        <span>Total Deal In</span>
        <input class="input p-2" type="number" min="0" bind:value={data.dealIn} />
      </label>
    </div>
  </section>
  <footer class="card-footer flex flex-row-reverse">
    <button class="btn variant-filled-error justify-self-end h2" on:click={() => dispatch('remove')}><Icon icon="mingcute:user-remove-2-line"/></button>
  </footer>
</div>