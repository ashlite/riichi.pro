<script lang="ts">
  import Icon from '@iconify/svelte';
  import Button from 'atom/button.svelte';
  import globalModal from 'store/modal';
  import AvatarBtn from 'molecule/avatarBtn.svelte';
  import type { iUserLocal } from 'interface/user';

  export let user: iUserLocal | undefined
</script>

<div class="navbar fixed top-0 bg-primary z-50 px-4 text-primary-content h-16">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost font-bold text-4xl">KAZERYU</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal menu-lg gap-4 p-0 items-center">
      <li><Button color="ghost" text="Players" icon="ph:users-four" href="/players" /></li>
      <li><Button color="ghost" text="Club" icon="ph:buildings" href="/club" /></li>
      <li><Button color="ghost" text="Tournament" icon="ph:trophy" href="/tournament"/></li>
      <li><Button color="ghost" text="Match" icon="ph:handshake" href="/match"/></li>
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