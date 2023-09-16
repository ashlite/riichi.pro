<script>
  import { toggleMainDrawer } from 'store/utils'
  import shortcut from '$lib/service/shortcut'
  import { fade } from 'svelte/transition'
  import Icon from '@iconify/svelte'

  function toggleDrawerMenu(){
    toggleMainDrawer.update(value => !value)
  }

</script>

<button use:shortcut={{alt:true, shift:true, code:'KeyH' }} class="btn btn-outline btn-primary content-center" on:click={() => toggleDrawerMenu()}>
  {#if $toggleMainDrawer}
    <Icon icon="uil:signin" width="40" height="40"/>  
  {:else}
    <Icon icon="uil:signout" width="40" height="40" />
  {/if}
</button>