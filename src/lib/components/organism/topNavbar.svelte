<script lang="ts">
  import Button from 'atom/button.svelte';
  import AvatarBtn from 'molecule/avatarBtn.svelte';
  import type { iUserLocal } from 'interface/user';
  import type { iGlobalResponse } from 'interface/utils';
  import { env } from '$env/dynamic/public'
  import { goto, invalidateAll } from '$app/navigation';
  import { signInWithPopup, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
  import { firebaseAuth, googleProvider } from "service/firebase";
  import toastAlert from 'store/toast'

  export let loginState: boolean
  export let user: iUserLocal | null
  const logo = env.PUBLIC_TEBI_CORE + 'logo.svg'

  async function loginUser() {
    try {
      const signResult = await signInWithPopup(firebaseAuth, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(signResult)
      const credentialSignIn = await signInWithCredential(firebaseAuth, credential!)
      const loginApp = await fetch('/api/v1/public/login', {
        method: 'POST',
        body: await credentialSignIn.user.getIdToken()
      })
      const loginResult = await loginApp.json() as iGlobalResponse
      if (loginResult.header.ok) {
        toastAlert.success('Login Success')
        invalidateAll()
      } else {
        toastAlert.responseError(loginResult)
      }
    } catch (e: any) {
      console.log(e)
      toastAlert.error(`ERROR ${e.code}, ${e.message}`)
    }
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
      {#if loginState && user}
        <AvatarBtn user={user} />
      {:else}
        <li>
          <Button color="ghost" text="Login" icon="ph:user" on:click={loginUser} />
        </li>
      {/if}
    </ul>
  </div>
</div>
<br>
<br>