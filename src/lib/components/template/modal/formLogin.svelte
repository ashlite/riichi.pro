<script lang="ts">
  import EmailInput from "molecule/emailInput.svelte";
  import PassInput from "molecule/passInput.svelte";
  import Button from "atom/button.svelte";
	import globalModal from "store/modal";
  import { goto, invalidateAll } from "$app/navigation";
  import toastAlert from "store/toast";
  import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
  import { firebaseAuth, googleProvider } from "service/firebase";

  let emailInput: string
  let password: string
  let processing = false

  function registerUser() {
    goto("/register")
    globalModal.close()
  }

  async function loginUser() {
    processing = true

    signInWithPopup(firebaseAuth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = googleProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
      // const result = await signInWithEmailAndPassword(firebaseAuth, emailInput, password)
      // const idToken = await result.user.getIdToken()
      // const loginApp = await fetch('/login', {
      //   method: 'POST',
      //   body: idToken
      // })
      // const loginResult = await loginApp.json()
      // if (loginResult.ok) {
      //   toastAlert.success('Login Success')
      //   invalidateAll()
      //   globalModal.close()
      // }
    processing = false
  }
</script>

<div>
  <Button text="Google Login" on:click={loginUser} />
  <!-- <form class="flex flex-col gap-2" on:submit|preventDefault={loginUser}>
    <EmailInput labelTL="Login Email" labelBL="Unique login link will be send to your email" bind:value={emailInput} required />
    <div class="flex flex-row-reverse">
      {#if processing}
        <span class="loading loading-ring loading-lg"></span>
      {:else}
        <div class="w-1/2">
          <Button text="Login" color="primary" type="submit" full />
        </div>
      {/if}
    </div>
  </form> -->
  <div class="divider"></div>
  <div class="grid grid-cols-2 gap-4">
    <Button full text="REGISTER" color="accent" on:click={registerUser} />
    <Button full text="Help Me Login" color="secondary" on:click={() => toastAlert.warning('work in progress feature')} />
  </div>
</div>