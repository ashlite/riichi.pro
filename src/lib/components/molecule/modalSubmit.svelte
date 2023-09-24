<script lang="ts">
  import Button from "atom/button.svelte"
  import globalModal from "store/modal"
  import { createEventDispatcher } from 'svelte'
  
  export let form = false
  export let reverse = false
  export let file = false
  let fileInput: any

  const dispatch = createEventDispatcher()

  function forward(){
    dispatch('submit')
  }

</script>

<div class={`flex gap-4 ${reverse ? 'flex-row' : 'flex-row-reverse'} my-4`}>
  {#if form}
    <Button color="primary" on:click={() => forward()} icon="uil:save" text="Proceed" iconSize={40} type='submit' />
  {:else}
    <Button color="primary" on:click={() => forward()} icon="uil:save" text="Proceed" iconSize={40} />
  {/if}
  {#if form}
    <Button color="warning" icon="uil:file-slash" text="Reset" iconSize={40} type="reset" />
  {/if}
  {#if file}
    <Button color="info" icon="uil:file-upload-alt" text="Upload Document" on:click={() => fileInput.click()}/>
    <input type="file" id="fileUpload" name="fileUpload" class="hidden"
      on:change={e => {dispatch('fileUpload', e)}} 
      bind:this={fileInput}  />
  {/if}
  <Button type="button" color="error" on:click={() => globalModal.close()} icon="uil:cancel" text="Cancel" iconSize={40} />
</div>