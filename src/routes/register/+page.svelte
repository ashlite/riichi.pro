<script lang="ts">
  import TextInput from "molecule/textInput.svelte";
  import EmailInput from "molecule/emailInput.svelte";
  import PassInput from "molecule/passInput.svelte";
  import PassChecker, {type iPassChecker} from "molecule/passChecker.svelte";
	import Button from "atom/button.svelte";
  
  let cekPas: iPassChecker = {lower: false, match: false, min8: false, number: false, special: false, upper: false}
  let password: string = ''
  let password2: string = ''

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
</script>

<form>
  <div class="mx-auto w-3/5 mt-8">
    <h1 class="text-primary font-bold text-3xl">Register New User</h1>
    <div class="divider"></div>
    <div class="flex flex-row gap-4">
      <TextInput labelTL="First Name" />
      <TextInput labelTL="Last Name" />
    </div>
    <EmailInput labelTL="Email Login" />
    <div class="flex flex-row gap-4">
      <PassInput labelTL="Input Password" bind:value={password} />
      <PassInput labelTL="Repeat Password" bind:value={password2} />
    </div>
    <PassChecker bind:data={cekPas}/>
    <div class="mt-6">
      <Button text="Submit" size="lg" full color="primary" />
    </div>
  </div>
</form>