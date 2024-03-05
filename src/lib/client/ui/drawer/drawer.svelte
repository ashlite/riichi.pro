<script>
  //Icon
  import Icon from '@iconify/svelte';
  //skeleton
  import {Drawer, getDrawerStore, LightSwitch, Avatar, getToastStore} from '@skeletonlabs/skeleton'
  //mylib
  import NavList from 'ui/navigation/navList.svelte';
  import Navitem from 'ui/navigation/navitem.svelte';
  import { getLoginUser } from 'store/user'
  import { loginUser } from 'controller/login';
  import { getInitials } from 'client-service/tools';

  const drawerData = getDrawerStore()
  const toast = getToastStore()
  const user = getLoginUser()

</script>

<Drawer>
  {#if $drawerData.id === 'navigation'}
    <nav class="flex flex-col justify-between h-screen">
      <div class="flex flex-col content-between mb-4">
        {#if $user}
          <header class="bg-primary-500 p-4 flex flex-row gap-2">
            <Avatar src={$user.avatarUrl ?? ''} width="w-24" initials={getInitials($user.fullName)} />
            <div class="flex flex-col">
              <h2 class="h2 font-bold">
                {$user.fullName}
              </h2>
              <p class="text-xl">{$user.rtData.name}</p>
            </div>
          </header>  
        {/if}
        <NavList />
        {#if $user}
          <Navitem href="/app/profile">Profile</Navitem>
          <Navitem href="/app/club">My Club</Navitem>
          {#if $user.roleId >= 102}
          <Navitem href="/app/official/dashboard">Official</Navitem>
          {/if}
        {/if}
        {#if !$user}
          <button class="btn hover:variant-soft-primary text-2xl font-bold" on:click={() => loginUser(toast)}>
            Login
          </button>
        {:else}
          <button class="btn hover:variant-soft-primary text-2xl font-bold">
            Logout
          </button>
        {/if}
        <button class="btn hover:variant-soft-primary text-2xl font-bold" on:click={drawerData.close}>
          Close
        </button>
      </div>
      <div class="flex flex-row-reverse p-8">
        <LightSwitch height="h-8" width="w-16" />
      </div>
    </nav>
  {/if}

</Drawer>