<script lang="ts">
  import { page } from '$app/stores'
	import { env } from '$env/dynamic/public';

  $: {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'MEASUREMENT_ID', {
        page_title: document.title,
        page_path: $page.url.pathname,
      })
    }
  }
</script>

<svelte:head>
  <!-- Google tag (gtag.js) -->
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${env.PUBLIC_FIREBASE_MEASUREMENT_ID}`}></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', env.PUBLIC_FIREBASE_MEASUREMENT_ID);
  </script>
</svelte:head>
