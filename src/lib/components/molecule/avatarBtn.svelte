<script lang="ts">
  import { getLoginUser } from "store/user";
  import Avatar from "atom/avatar.svelte";

  const user = getLoginUser()

  let dropState = false

  function open() {
    dropState = true
  }

  function close() {
    dropState = false
  }

</script>

<div class="p-0 bg-base-300" on:mouseover={open} on:focus={open} on:mouseleave={close} role="navigation">
  <div class="flex flex-row items-center py-0 mx-4 rounded-none" >
    <div class="flex flex-col items-start mx-2 my-2">
      <h1 class="text-xl text-base-content text-ellipsis">{`${user.fullName}`}</h1>
      <div class="flex flex-row text-secondary font-bold gap-4">
        <div>{user.rtData.name}</div>
      </div>
    </div>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <Avatar seed={user.uuid} size="w-12" />
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  </div>
  {#if dropState}
  <div class="absolute top-16">
    <ul class="menu menu-sm bg-base-200 text-base-content w-56 shadow">
      <li><a href="/app/profile" data-sveltekit-preload-data>Profile</a></li>
      <li><a href="/app/club" data-sveltekit-preload-data="tap">Club</a></li>
      <li class="disabled" data-sveltekit-preload-data="tap"><a href="#">My Match (WIP)</a></li>
      {#if user.roleId > 101}
        <li><a href="/app/official/dashboard" data-sveltekit-preload-data="tap">Official</a></li>
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