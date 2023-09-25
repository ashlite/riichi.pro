<script lang="ts">
  import EmailInput from "molecule/emailInput.svelte";
  import PassInput from "molecule/passInput.svelte";
  import Button from "atom/button.svelte";
	import globalModal from "store/modal";
  import { goto, invalidateAll } from "$app/navigation";
  import toastAlert from "store/toast";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { firebaseAuth } from "service/firebase";

  let emailInput: string
  let password: string
  let processing = false

  function registerUser() {
    goto("/register")
    globalModal.close()
  }

  async function loginUser() {
    processing = true
    const result = await signInWithEmailAndPassword(firebaseAuth, emailInput, password)
    const idToken = await result.user.getIdToken()
    const loginApp = await fetch('/login', {
      method: 'POST',
      body: idToken
    })
    const loginResult = await loginApp.json()
    if (loginResult.ok) {
      toastAlert.success('Login Success')
      invalidateAll()
      globalModal.close()
    }
    processing = false
  }
</script>

<div>
  <form class="flex flex-col gap-2" on:submit|preventDefault={loginUser}>
    <EmailInput labelTL="Login Email" bind:value={emailInput} required />
    <PassInput labelTL="Login Password" bind:value={password} required />
    <div class="flex flex-row-reverse">
      {#if processing}
        <span class="loading loading-ring loading-lg"></span>
      {:else}
        <div class="w-1/2">
          <Button text="Login" color="primary" type="submit" full />
        </div>
      {/if}
    </div>
  </form>
  <div class="divider"></div>
  <div class="grid grid-cols-2 gap-4">
    <Button full text="REGISTER" color="accent" on:click={registerUser} />
    <Button full text="Help Me Login" color="secondary" on:click={() => toastAlert.warning('work in progress feature')} />
  </div>
</div>