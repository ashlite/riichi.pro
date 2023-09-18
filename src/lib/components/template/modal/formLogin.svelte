<script lang="ts">
  import TextInput from "molecule/textInput.svelte";
  import PassInput from "molecule/passInput.svelte";
  import Button from "atom/button.svelte";
	import globalModal from "store/modal";
  import { goto } from "$app/navigation";
  import toastAlert from "store/toast";

  let emailInput: string
  let password: string

  function registerUser() {
    goto("/register")
    globalModal.close()
  }
</script>

<div>
  <form class="flex flex-col gap-2">
    <TextInput labelTL="Login Email" bind:value={emailInput} />
    <PassInput labelTL="Login Password" bind:value={password} />
    <div class="flex flex-row-reverse">
      <Button text="Login" color="primary" />
    </div>
  </form>
  <!-- <div class="divider">Social Login</div>
  <div class="flex flex-row gap-4 justify-center">
    <div class="tooltip" data-tip="Google">
      <Button icon="ph:google-logo-bold" square color="primary" />
    </div>
    <div class="tooltip" data-tip="Facebook">
      <Button icon="ph:facebook-logo-bold" square color="primary" />
    </div>
    <div class="tooltip" data-tip="Twitch">
      <Button icon="ph:twitch-logo-bold" square color="primary" />
    </div>
    <div class="tooltip" data-tip="Discord">
      <Button icon="ph:discord-logo-bold" square color="primary" />
    </div>
  </div> -->
  <div class="divider"></div>
  <div class="grid grid-cols-2 gap-4">
    <Button full text="REGISTER" color="accent" on:click={registerUser} />
    <Button full text="Help Me Login" color="secondary" on:click={() => toastAlert.warning('work in progress feature')} />
  </div>
</div>