<script lang="ts">
  //svelte
  import { page } from '$app/stores'
  export let href: string
</script>

{#if $page.url.pathname.startsWith(href)}
  <a href={href} class="btn variant-outline-primary hover:variant-soft-primary text-2xl font-bold">
    <slot/>
  </a>
{:else}
  <a href={href} class="btn hover:variant-soft-primary text-2xl font-bold">
    <slot/>
  </a>
{/if}