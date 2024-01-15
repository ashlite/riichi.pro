<script>
  //Icon
  import Icon from '@iconify/svelte';
  //skeleton
  import {Drawer, getDrawerStore, LightSwitch, Avatar} from '@skeletonlabs/skeleton'
  //mylib
  import NavList from 'ui/navigation/navList.svelte';
  import { getLoginUser } from 'store/user'

  const drawerData = getDrawerStore()
  const user = getLoginUser()

</script>

<Drawer>
  {#if $drawerData.id === 'navigation'}
    <nav class="flex flex-col justify-between h-screen">
      <div class="flex flex-col content-between my-4">
        {#if $user}
          <header class="bg-primary-500 p-4 flex flex-row">
            <Avatar src={$user.avatarUrl ?? ''} width="w-24" fallback={`https://api.dicebear.com/7.x/initials/svg?seed=${$user.fullName}`} />
            <div class="flex flex-col">
              <h1 class="h1">
                {$user.fullName}
              </h1>
            </div>
          </header>  
        {/if}
        <NavList />
        {#if !$user}
          <button class="btn hover:variant-soft-primary text-2xl font-bold">
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