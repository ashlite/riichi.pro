<script lang="ts">
  import type { iUserLocal } from "interface/user";

  export let user: iUserLocal

  let dropState = false

  function open() {
    dropState = true
  }

  function close() {
    dropState = false
  }
</script>

<div class="p-0" on:mouseover={open} on:focus={open} on:mouseleave={close} role="navigation">
  <div class="flex flex-row items-center py-0 mx-4 rounded-none" >
    <div class="flex flex-col items-start mx-2 my-2">
      <h1 class="text-xl text-primary-content text-ellipsis">{`${user.firstName} ${user.lastName}`}</h1>
      <div class="flex flex-row text-primary-content font-bold gap-4">
        <div>{user.countryCode}</div>
        <div>{user.playerData?.rtData.name ?? 'non-player'}</div>
      </div>
    </div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div class="avatar">
      <div class="w-12 rounded-full">
        <img src="https://xsgames.co/randomusers/avatar.php?g=male" alt="avatar" />
      </div>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  </div>
  {#if dropState}
  <div class="absolute top-16">
    <ul class="menu menu-sm bg-base-300 text-base-content w-56 shadow">
      <li><a href="/">Account</a></li>
      {#if !user.playerData}
        <li><a href="/app/becomeplayer">Be a Player</a></li>
        <li><a href="/app/createclub">Create a Club</a></li>
      {:else}
        <li><a href="/">Player</a></li>
        <li><a href="/">Club</a></li>
      {/if}
      {#if user.roleId > 101}
        <li><a href="/">Official</a></li>
      {/if}
      {#if user.roleId > 102}
        <li><a href="/">Developer</a></li>
      {/if}
      <li><a href="/logout">Logout</a></li>
    </ul>
  </div>
  {/if}
</div>