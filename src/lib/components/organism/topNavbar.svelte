<script lang="ts">
  import Button from 'atom/button.svelte';
  import globalModal from 'store/modal';
  import AvatarBtn from 'molecule/avatarBtn.svelte';
  import type { iUserLocal } from 'interface/user';
  import { env } from '$env/dynamic/public'
  import { goto } from '$app/navigation';

  export let user: iUserLocal | undefined
  const logo = env.PUBLIC_TEBI_CORE + 'logo.svg'
</script>

<div class="navbar fixed top-0 bg-base-200 z-50 px-4 h-16">
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div class="flex-1">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img src={logo} alt="Logo Janshi Pro" class="max-h-16 cursor-pointer" on:click={() => goto("/")} />
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal menu-lg gap-4 p-0 items-center">
      <li><Button color="ghost text-primary" text="Players" icon="ph:users-four" href="/players" /></li>
      <li><Button color="ghost text-primary" text="Club" icon="ph:buildings" href="/club" /></li>
      <!-- <li><Button color="ghost text-primary" text="Tournament" icon="ph:trophy" href="/tournament"/></li> -->
      <li><Button color="ghost text-primary" text="Match" icon="ph:handshake" href="/match"/></li>
      {#if user}
        <AvatarBtn user={user} />
      {:else}
        <li id="Login">
          <Button color="ghost" text="Login/Register" icon="ph:user" on:click={() => globalModal.loginForm()} />
        </li>
      {/if}
    </ul>
  </div>
</div>
<br>
<br>