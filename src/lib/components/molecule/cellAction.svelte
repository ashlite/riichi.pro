<script lang="ts">
  // import BtnIcon from "$lib/components/atom/BtnIcon.svelte"
  import Button from "atom/button.svelte"
  import BtnGroup from "molecule/btnGroup.svelte"
  import { createEventDispatcher } from 'svelte'
  export let info = false
  export let edit = false
  export let remove = false
  export let file = false

  const dispatch = createEventDispatcher()

  function forward(type: string){
    dispatch(type)
  }
</script>

<BtnGroup>
  {#if info}
    <Button join size="sm" color="info" icon="uil:info-circle" on:click={() => forward('info')}/>
  {/if}
  {#if edit}
    <Button join size="sm" color="warning" icon="uil:edit" on:click={() => forward('edit')}/>
  {/if}
  {#if remove}
    <Button join size="sm" color="error" icon="uil:trash-alt" on:click={() => forward('remove')}/>
  {/if}
  {#if file}
    <Button join size="sm" color="accent" icon="uil:file-alt" on:click={() => forward('file')}/>
  {/if}
</BtnGroup>