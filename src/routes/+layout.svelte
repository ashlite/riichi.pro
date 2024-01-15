<script lang="ts">
  //svelte
  import "../app.css"
  import { dev } from '$app/environment';
  import type { AfterNavigate } from '@sveltejs/kit';
  import { afterNavigate } from '$app/navigation';
  //vercel
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"
  import { inject } from '@vercel/analytics';
  //skeleton
  import { AppShell, storePopup, Emerald, initializeStores, Toast } from '@skeletonlabs/skeleton'
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  //mylib
  import { setLoginUser } from "store/user";
  import TopNav from 'ui/navigation/top.svelte'
  import Footer from 'ui/navigation/footer.svelte'
  import Drawer from 'ui/drawer/drawer.svelte'
  
  export let data
  if (data.loginState && data.user) {
    setLoginUser(data.user)
  }
  
  initializeStores()
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  inject({ mode: dev ? 'development' : 'production' });
  injectSpeedInsights();

  afterNavigate((params: AfterNavigate) => {
    const isNewPage = params.from?.url.pathname !== params.to?.url.pathname
    const elemPage = document.querySelector('#page')
    if (isNewPage && elemPage !== null) {
      elemPage.scrollTop = 0
    }
  })

</script>

<svelte:head>
  <title>Janshi Pro</title>
</svelte:head>

<!-- <ToastAlert />
<Modal />
<TopNavbar loginState={data.loginState} user={data.user}/> -->
<Toast />
<Drawer />
<Emerald />

<AppShell>
	<svelte:fragment slot="header">
    <TopNav loginState={data.loginState} />
  </svelte:fragment>
	<!-- <svelte:fragment slot="sidebarRight">
    <div id="sidebar-right" class="sm:block lg:hidden">
      Sidebar Right
    </div>
  </svelte:fragment> -->
	<slot />
	<svelte:fragment slot="pageFooter">
    <Footer appVersion={data.appVersion} />
  </svelte:fragment>
</AppShell>

<!-- <Footer appVersion={data.appVersion} /> -->