<script lang="ts">
  import { page } from '$app/stores'
  import shortcut from '$lib/service/shortcut'
  import ToggleMenuDrawer from 'atom/toggleMenuDrawer.svelte'
  import { base } from '$app/paths'
  import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
  import Button from 'atom/button.svelte';
  import globalModal from 'store/modal';
  import AvatarBtn from 'molecule/avatarBtn.svelte';

  const login: boolean = true
</script>

<footer class="flex flex-col py-4 items-center bottom-0 bg-primary text-primary-content">
  <div>Created by David</div>
</footer>