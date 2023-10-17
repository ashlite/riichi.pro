<script lang="ts">
  import Button from 'atom/button.svelte';
  import AvatarBtn from 'molecule/avatarBtn.svelte';
  import type { iUserLocal } from 'interface/user';
  import type { iGlobalResponse } from 'interface/utils';
  import { env } from '$env/dynamic/public'
  import { goto, invalidateAll } from '$app/navigation';
  import { signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
  import { firebaseAuth, googleProvider } from "service/firebase";
  import toastAlert from 'store/toast';

  export let user: iUserLocal | undefined
  export let status: 'login' | 'register' | undefined
  const logo = env.PUBLIC_TEBI_CORE + 'logo.svg'

  async function loginUser() {
    signInWithPopup(firebaseAuth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      signInWithCredential(firebaseAuth, credential!)
      .then( async (result) => {
        const loginApp = await fetch('/api/v1/login', {
          method: 'POST',
          body: await result.user.getIdToken()
        })
        const loginResult = await loginApp.json() as iGlobalResponse
        if (loginResult.header.ok) {
          toastAlert.success('Login Success')
          invalidateAll()
        } else {
          toastAlert.responseError(loginResult)
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toastAlert.error(`ERROR ${errorCode}, ${errorMessage}`)
      })
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toastAlert.error(`ERROR ${errorCode}, ${errorMessage}`)
    });
  }
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
      <li><Button color="ghost text-primary" text="Clubs" icon="ph:buildings" href="/club" /></li>
      <!-- <li><Button color="ghost text-primary" text="Tournament" icon="ph:trophy" href="/tournament"/></li> -->
      <!-- <li><Button color="ghost text-primary" text="Match" icon="ph:handshake" href="/match"/></li> -->
      {#if user}
        <AvatarBtn user={user} />
      {:else if status == 'register'}
        <li id="Login">
          <Button color="ghost" text="Register Player" icon="ph:user" href="/register" />
        </li>
      {:else}
        <li id="Login">
          <Button color="ghost" text="Login" icon="ph:user" on:click={loginUser} />
        </li>
      {/if}
    </ul>
  </div>
</div>
<br>
<br>