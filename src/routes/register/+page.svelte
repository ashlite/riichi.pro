<script lang="ts">
  import TextInput from "molecule/textInput.svelte";
  import EmailInput from "molecule/emailInput.svelte";
  import PassInput from "molecule/passInput.svelte";
  import PassChecker, {type iPassChecker} from "molecule/passChecker.svelte";
	import Button from "atom/button.svelte";
  import CountrySelector from "molecule/countrySelector.svelte";
  import Icon from "@iconify/svelte";
  import type { ActionData } from "./$types";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
  
  export let form: ActionData
  
  let cekPas: iPassChecker = {lower: false, match: false, min8: false, number: false, special: false, upper: false}
  let password: string = ''
  let password2: string = ''
  let countryISO2: string
  let province: string
  let firstName: string
  let lastName: string

  $: validatePass(password, password2)

  function validatePass(passCore: string, passRepeat: string) {
    const regMin8 = /.{8,}/g
    const regNumber = /\d/g
    const regSpecial = /[@$!%*#?&]/g
    const regLower = /[a-z]/g
    const regUpper = /[A-Z]/g
    cekPas.min8 = regMin8.test(passCore)
    cekPas.number = regNumber.test(passCore)
    cekPas.special = regSpecial.test(passCore)
    cekPas.lower = regLower.test(passCore)
    cekPas.upper = regUpper.test(passCore)
    cekPas.match = passCore == passRepeat && passCore.length > 0
  }

  onMount(() => {
    if (form?.success) {
      goto('/app')
    }
  })
</script>

<form class="mx-auto w-3/5 mt-8" method="POST" action="/register?/registerEmailPass">
  <h1 class="text-primary font-bold text-3xl">Register New User</h1>
  <div class="divider"></div>
  {#if form?.troubledPart}
    <div class="alert alert-error">
      <Icon icon="ph:exclamation"/>
      <span>Error registering new user, please check {form.troubledPart}</span>
    </div>
  {/if}
  {#if form?.message}
    <div class="alert alert-error">
      <Icon icon="ph:exclamation"/>
      <span>Error: {form.message}</span>
    </div>
  {/if}
  <div class="flex flex-row gap-4">
    <TextInput labelTL="First Name" bind:value={firstName} name="firstName" required />
    <TextInput labelTL="Last Name" bind:value={lastName} name="lastName" required/>
  </div>
  <div class="flex flex-row gap-4">
    <CountrySelector labelTL="Country of Residence" bind:value={countryISO2} name="country" />
    <EmailInput labelTL="Email Login" name="email" required />
  </div>
  <div class="flex flex-row gap-4">
    <PassInput labelTL="Input Password" bind:value={password} name="pass" required />
    <PassInput labelTL="Repeat Password" bind:value={password2} name="passCompare" required/>
  </div>
  <PassChecker bind:data={cekPas}/>
  <div class="mt-6">
    <Button text="Submit" size="lg" full color="primary" type="submit" />
  </div>
</form>