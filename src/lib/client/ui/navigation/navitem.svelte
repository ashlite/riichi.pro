<script lang="ts">
  //svelte
  import { page } from '$app/stores'
  //skeleton
  import {getDrawerStore} from '@skeletonlabs/skeleton'

  export let href: string
  export let menu: boolean = false
  const drawerData = getDrawerStore()
</script>

{#if menu}
  {#if $page.url.pathname.startsWith(href)}
    <a href={href} class="text-primary-600-300-token" on:click={drawerData.close}>
      <slot/>
    </a>
  {:else}
    <a href={href} class="hover:text-primary-600-300-token" on:click={drawerData.close}>
      <slot/>
    </a>
  {/if}
{:else}
  {#if $page.url.pathname.startsWith(href)}
    <a href={href} class="btn variant-outline-primary hover:variant-soft-primary text-2xl font-bold" on:click={drawerData.close}>
      <slot/>
    </a>
  {:else}
    <a href={href} class="btn hover:variant-soft-primary text-2xl font-bold" on:click={drawerData.close}>
      <slot/>
    </a>
  {/if}
{/if}