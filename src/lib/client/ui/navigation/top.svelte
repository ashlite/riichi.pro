<script lang="ts">
  //svelte
  import { env } from '$env/dynamic/public'
  import { goto, invalidateAll } from '$app/navigation'
  //icon
  import Icon from '@iconify/svelte'
  //skeleton
  import { AppBar, LightSwitch, Avatar, ListBox, ListBoxItem, popup, getDrawerStore, getToastStore } from '@skeletonlabs/skeleton'
  import type { PopupSettings, DrawerSettings } from '@skeletonlabs/skeleton';
  //mylib
  import { getLoginUser } from 'store/user'
  import NavList from './navList.svelte';
	import PlayerAvatar from 'ui/playerAvatar.svelte';
  import { loginUser } from 'controller/login';

  export let loginState: boolean
  const logo = env.PUBLIC_TEBI_CORE + 'logo.svg'
  const user = getLoginUser()
  const drawerStore = getDrawerStore()
  const toast = getToastStore()

  const drawerSetting: DrawerSettings = {
    id: 'navigation',
    position: 'right'
  }
  
  const loginMenu: PopupSettings = {
    event: 'click',
    target: 'userMenu',
    placement: 'bottom-start'
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
        {#if !loginState}
          <button class="btn hover:variant-soft-primary text-2xl font-bold" on:click={() => {
            loginUser(toast)
          }}>
            Login
          </button>
        {/if}
        <LightSwitch height="h-8" width="w-16" />
        {#if loginState}
          <div class="flex flex-row items-center gap-2 relative">
            <button use:popup={loginMenu} class="[&>*]:pointer-events-none">
              <PlayerAvatar playerAvatarUrl={$user.avatarUrl} playerId={$user.id} playerName={$user.fullName} noLink width="w-16" />
            </button>
            <div class="card p-4 variant-filled-surface" data-popup="userMenu">
              <div class="arrow variant-filled-surface" />
              <section class="flex flex-col gap-4">
                <div>
                  <p class="font-bold text-lg">{$user.fullName}</p>
                  <p class="">{$user.rtData.name}</p>
                </div>
                <div class="bg-surface-800-100-token h-1"></div>
                <a href="/app/profile" class="btn w-40 variant-filled-primary">
                  <span class="mr-2 h3"><Icon icon="mingcute:user-3-line" /></span>
                  Profile
                </a>
                <a href="/app/club" class="btn w-40 variant-filled-primary">
                  <span class="mr-2 h3"><Icon icon="mingcute:group-3-line" /></span>
                  MyClub
                </a>
                {#if $user.roleId >= 102}
                  <a href="/app/official/dashboard" class="btn w-40 variant-filled-primary">
                    <span class="mr-2 h3"><Icon icon="mingcute:certificate-line" /></span>
                    Official
                  </a>
                {/if}
                {#if $user.roleId >= 103}
                  <a href="/app/developer/dashboard" class="btn w-40 variant-filled-primary">
                    <span class="mr-2 h3"><Icon icon="mingcute:code-line" /></span>
                    Developer
                  </a>
                {/if}
                <form method="post" action="/logout">
                  <button type="submit" class="btn w-40 variant-filled-primary">
                    <span class="mr-2 h3"><Icon icon="mingcute:exit-line" /></span>
                    Logout
                  </button>
                </form>
              </section>
            </div>
          </div>
        {/if}
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