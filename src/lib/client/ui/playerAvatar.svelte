<script lang="ts">
  //skeleton
  import { Avatar, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton'
  //mylib
  import { getInitials } from 'client-service/tools'
  
  export let playerId: string
  export let playerAvatarUrl: string | null = ''
  export let playerName: string
  export let noLink: boolean = false
  export let width: string = 'w-24 md:w-32'
  const playerInitial = getInitials(playerName)

  const modalStore = getModalStore()
  const modal: ModalSettings = {
    type: 'component',
    component: 'PlayerModal',
    meta: {playerId: playerId}
  }
</script>

{#if noLink}
  <Avatar src={playerAvatarUrl ?? ''} width={width} rounded="rounded-full" initials={playerInitial} />
{:else}
  <button on:click={() => modalStore.trigger(modal)}>
    <Avatar src={playerAvatarUrl ?? ''} width={width} rounded="rounded-full" initials={playerInitial} />
  </button>
{/if}