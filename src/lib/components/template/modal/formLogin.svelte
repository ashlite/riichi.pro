<script lang="ts">
  import TextInput from "molecule/textInput.svelte";
  import PassInput from "molecule/passInput.svelte";
  import Button from "atom/button.svelte";
	import globalModal from "store/modal";
  import { goto } from "$app/navigation";

  let emailInput: string
  let password: string

  function registerUser() {
    goto("/register")
    globalModal.close()
  }
</script>

<form>
  <div class="divider">Email - Password</div>
  <div class="flex flex-col gap-2">
    <TextInput labelTL="Login Email" bind:value={emailInput} />
    <PassInput labelTL="Login Password" bind:value={password} />
    <div class="flex flex-row-reverse">
      <Button text="Login" color="success" />
    </div>
  </div>
  <div class="divider">Social Login</div>
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
  </div>
  <div class="divider"></div>
  <Button full text="REGISTER" color="accent" on:click={registerUser} />
</form>