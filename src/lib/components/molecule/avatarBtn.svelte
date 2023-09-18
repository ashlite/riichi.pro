<script lang="ts">
  export let userName: string = "David Santoso"

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
      <h1 class="text-xl text-primary-content">{userName}</h1>
      <div class="text-primary-content font-bold">Master</div>
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
    <ul class="shadow menu menu-sm bg-base-300 text-base-content w-48">
      <li><a>Profile</a></li>
      <li><a>Administrator</a></li>
      <li><a>Official</a></li>
      <li><a>Logout</a></li>
    </ul>
  </div>
  {/if}
</div>