<script lang="ts">
  import TextInput from "molecule/textInput.svelte";
  import EmailInput from "molecule/emailInput.svelte";
  import PassInput from "molecule/passInput.svelte";
  import PassChecker, {type iPassChecker} from "molecule/passChecker.svelte";
	import Button from "atom/button.svelte";
  import CountrySelector from "molecule/countrySelector.svelte";
  import toastAlert from "store/toast";
  import type { iRegisterData } from "interface/user";
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { firebaseAuth } from 'service/firebase';
	import { goto, invalidateAll } from "$app/navigation";
  
  let processing = false
  const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/g
  const regNumber = /(?=.*\d)/g
  const regSpecial = /(?=.*[@$!%*#?&])/g
  const regLower = /(?=.*[a-z])/g
  const regUpper = /(?=.*[A-Z])/g
  let registerData: iRegisterData = {
    pass1:'',
    pass2:'',
    countryISO2:'',
    firstName:'',
    lastName:'',
    email:'',
  }
  let cekPas: iPassChecker = {lower: false, match: false, min8: false, number: false, special: false, upper: false}

  $: validatePass(registerData.pass1, registerData.pass2)

  function validatePass(passCore: string, passRepeat: string) {
    cekPas.min8 = passCore.length >= 8 && passCore.length <= 32
    cekPas.number = regNumber.test(passCore)
    cekPas.special = regSpecial.test(passCore)
    cekPas.lower = regLower.test(passCore)
    cekPas.upper = regUpper.test(passCore)
    cekPas.match = passCore == passRepeat && passCore.length > 0
  }

  async function registerEmailPass() {
    processing = true
    //test password againt
    if (registerData.pass1 != registerData.pass2) {toastAlert.error("password doesn't match")}
    else if (regPass.test(registerData.pass1)) {toastAlert.error("wrong password format")}
    else {
      try {
        const result = await createUserWithEmailAndPassword(firebaseAuth, registerData.email, registerData.pass1)
        registerData.firebaseId = result.user.uid
        registerData.firebaseIdToken = await result.user.getIdToken()
        const response = await fetch('/register', {
          method: 'POST',
          body: JSON.stringify(registerData)
        })
        const registerResult = await response.json()
        if (registerResult.ok) {
          invalidateAll()
          await goto("/")
          toastAlert.success("Register success")
        }
      } catch (e) {
        toastAlert.error(`Registration failed. Reason: ${e}`)
        processing = false
      } 
    }
  }
</script>

<form class="mx-auto w-3/5 mt-8" on:submit|preventDefault={registerEmailPass}>
  <h1 class="text-primary font-bold text-3xl">Register New User</h1>
  <div class="divider"></div>
  <div class="flex flex-row gap-4">
    <TextInput labelTL="First Name" bind:value={registerData.firstName} name="firstName" required limit={100} />
    <TextInput labelTL="Last Name" bind:value={registerData.lastName} name="lastName" required limit={100} />
  </div>
  <div class="flex flex-row gap-4">
    <CountrySelector labelTL="Nationality" bind:value={registerData.countryISO2} name="country"/>
    <EmailInput labelTL="Email Login" name="email" required limit={300} bind:value={registerData.email}/>
  </div>
  <div class="flex flex-row gap-4">
    <PassInput labelTL="Input Password" bind:value={registerData.pass1} name="pass" required />
    <PassInput labelTL="Repeat Password" bind:value={registerData.pass2} name="passCompare" required/>
  </div>
  <PassChecker bind:data={cekPas}/>
  <div class="mt-6">
    {#if cekPas.lower && cekPas.match && cekPas.min8 && cekPas.number && cekPas.special && cekPas.upper && !processing}
      <Button text="Submit" size="lg" full color="primary" type="submit"  />
    {:else if processing}
      <div class="w-full mx-auto">
        <span class="loading loading-ring loading-lg"></span>
      </div>
    {:else}
      <Button state="disabled" text="Submit" size="lg" full />
    {/if}
  </div>
</form>