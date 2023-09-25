<script lang="ts">
  import type { iUserLocal } from "interface/user";
  import globalModal from "store/modal";

  export let user: iUserLocal

  let dropState = false

  function open() {
    dropState = true
  }

  function close() {
    dropState = false
  }

  async function logout(){
    const result = await fetch('/api/v1/logout')
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
        <li><button on:click={() => globalModal.playerEditor()}>Be a Player</button></li>
        <li><a href="/app/createclub">Create a Club</a></li>
      {:else}
        <li><a href="/app/player">Player</a></li>
        <li><a href="/app/club">Club</a></li>
      {/if}
      {#if user.roleId > 101}
        <li><a href="/">Official</a></li>
      {/if}
      <li>
        <form method="post" action="/logout">
          <button>Logout</button>
        </form>
      </li>
    </ul>
  </div>
  {/if}
</div>