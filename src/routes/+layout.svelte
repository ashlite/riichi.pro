<script lang="ts">
  import "../app.css"
  import { onMount } from 'svelte';
  import TopNavbar from 'organism/topNavbar.svelte'
  import { themeChange } from 'theme-change'
  import ToastAlert from 'molecule/toastAlert.svelte'
  import Modal from 'organism/modal.svelte'
  import Footer from "organism/footer.svelte"
  import type { LayoutData } from "./$types";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"

  export let data: LayoutData
  let appVersion = data.appVersion
  injectSpeedInsights();

  onMount(() => {
    themeChange(false)
  })
</script>

<svelte:head>
  <title>Janshi Pro</title>
</svelte:head>

<ToastAlert />
<Modal />
<TopNavbar user={data.user} status={data.status}  />

<div class="p-0 m-0 min-h-screen">
  <slot />
</div>

<Footer {appVersion} />