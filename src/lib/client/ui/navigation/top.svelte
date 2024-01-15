<script lang="ts">
  //svelte
  import { env } from '$env/dynamic/public'
  import { goto, invalidateAll } from '$app/navigation'
  //icon
  import Icon from '@iconify/svelte'
  //skeleton
  import { AppBar, LightSwitch, Avatar, ListBox, ListBoxItem, popup, getDrawerStore } from '@skeletonlabs/skeleton'
  import type { PopupSettings, DrawerSettings } from '@skeletonlabs/skeleton';
  //mylib
  import { getLoginUser } from 'store/user'
  import NavList from './navList.svelte';
	import Navitem from 'ui/navigation/navitem.svelte';

  export let loginState: boolean
  const logo = env.PUBLIC_TEBI_CORE + 'logo.svg'
  const user = getLoginUser()
  const drawerStore = getDrawerStore()

  const drawerSetting: DrawerSettings = {
    id: 'navigation',
    position: 'right'
  }
  
  const loginMenu: PopupSettings = {
    event: 'click',
    target: 'loginMenu',
    placement: 'bottom'
  };
					
</script>

<AppBar padding="px-4 py-2" slotTrail="place-self-end">
  <svelte:fragment slot="lead">
    <div class="flex items-center space-x-4">
      <a href="/" class="lg:!ml-0 lg:w-auto overflow-hidden" >
        <img src={logo} alt="Logo Janshi Pro" class="h-8 lg:h-14 cursor-pointer" />
      </a>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <!-- large screen -->
    <div class="hidden lg:block">
      <div class="flex flex-row items-center gap-4">
        <NavList />
        {#if loginState}
          <div class="flex flex-row items-center gap-2 relative">
            <button use:popup={loginMenu}>
              <Avatar src={$user.avatarUrl ?? undefined} initials={$user.fullName} />
            </button>
            <div class="flex flex-col gap-2" data-popup="loginMenu">
              <a href="/">Profile</a>
              <a href="/">MyClub</a>
              <a href="/">Official</a>
            </div>
          </div>
        {:else}
          <button class="btn hover:variant-soft-primary text-2xl font-bold">
            Login
          </button>
        {/if}
        <LightSwitch height="h-8" width="w-16" />
      </div>
    </div>

    <!-- small screen -->
    <div class="block lg:hidden">
      <button on:click={() => drawerStore.open(drawerSetting)} class="text-3xl">
        <Icon icon="mingcute:menu-line"/>
      </button>
    </div>
  </svelte:fragment>
</AppBar>