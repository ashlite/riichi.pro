<script>
  import { page } from '$app/stores';
  import Button from 'atom/button.svelte';
  import { invalidateAll } from "$app/navigation";
	import { onMount } from "svelte";

  onMount(invalidateAll)
</script>


<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl text-error font-bold">{$page.status}</h1>
      <h2 class="text-xl py-6">{$page.error?.message}</h2>
      <Button color="primary" text="Back to Home" href="/" />
    </div>
  </div>
</div>