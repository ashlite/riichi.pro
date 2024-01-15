<script>
  //svelte
  import { page } from '$app/stores';
  import { invalidateAll } from "$app/navigation";
	import { onMount } from "svelte";
  //icon
  import Icon from '@iconify/svelte'

  onMount(invalidateAll)
</script>

<div class="h-screen relative overflow-hidden bg-gradient-to-br from-red-500 to-orange-400">
  <div class="card w-4/5 md:w-3/5 p-4 variant-filled-surface absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <header class="mx-auto">
      <h1 class="text-center text-4xl md:text-8xl font-black">
        <span class="bg-gradient-to-br from-red-500 to-orange-400 bg-clip-text text-transparent box-decoration-clone">
          {$page.status}
        </span>
      </h1>
    </header>
    <section class="text-white mx-auto flex flex-col items-center">
      <p class="py-6 text-center text-xl">{$page.error?.message}</p>
      <a class="btn variant-filled-success" href="/">
        <span class="mr-2 text-3xl">
          <Icon icon="mingcute:home-3-line" />
        </span>
        Back to Home
      </a>
    </section>
  </div>
</div>