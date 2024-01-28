<script lang="ts">
  //skeleton
  import { Stepper, Step, SlideToggle, getToastStore, ProgressRadial } from '@skeletonlabs/skeleton';
  //mylib
  import type {iRegisterClub} from 'interface/club'
  import {arrCountries} from 'client-service/country'
  //svelte
  import {goto} from '$app/navigation'

  let agreementTNC = false, validName = false, processing = false
  const toast = getToastStore()
  const clubData: iRegisterClub = {
    name:'',
    slug:'',
    countryISO2:'',
    district:'',
    address:''
  }

  function checkInputName() {
    let checker = 0
    if(clubData.name.length > 1) checker++
    if(clubData.slug.length >= 4) checker++
    if(clubData.slug.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/g)) checker++
    
    if (checker == 3) validName = true
    else validName = false
  }

  async function handleSubmit() {
    processing = true
    try {
      //check
      if(clubData.address.length < 2 || clubData.countryISO2.length < 2 || clubData.district.length < 2) throw 'Address, country, and district must be filled'

      const response = await fetch('/api/v1/private/createclub',{
        method:'POST',
        body: JSON.stringify(clubData)
      })
      if (response.ok) {
        goto('/app/club')
        toast.trigger({
          message: 'Club creation is in request',
          background: 'variant-filled-success'
        })
      } else {
        toast.trigger({
          message: 'Club creation failed',
          background: 'variant-filled-error'
        })
        processing = false
      }
    } catch(e:any) {
      toast.trigger({
        message: e,
        background: 'variant-filled-error'
      })
      processing = false
    }
  }

</script>

<div class="w-4/5 md:w-3/5 mx-auto py-4">
  {#if processing}
    <ProgressRadial width="w-1/5" />
  {:else}
    <Stepper on:complete={handleSubmit}>
      <Step locked={!agreementTNC}>
        <svelte:fragment slot="header">Term and Rules</svelte:fragment>
        <ul class="list-outside list-disc">
          <li>To create a club, <span class="font-bold">you must not</span> own or a main member to any other club.</li>
          <li>There will be a one time fees to create a club.</li>
          <li>Clubs have its own currency name <span class="italic">Clubs Credit (CC)</span> that will be use to record a match or to join a club tournament. This currency can be gain from buying it directly to Janshi Pro or any other events that provide CC as a reward.</li>
          <li>Club can only submit a match when all player in a match join the said club.</li>
          <li>There is no limit to a club member amount. But each player have a limit to how many club they can join depending on their ranks.</li>
          <li>Officials can forcefully shutdown or disband a club if there is an indication of scam, abuse, and criminal activity within the club</li>
          <li>Respect other clubs and members.</li>
        </ul>
        <aside class="alert variant-filled-success">
          <div class="alert-message">
              <p>Agree to terms and conditions?</p>
          </div>
          <div class="alert-actions">
            <SlideToggle name="tncAgreement" bind:checked={agreementTNC} active="bg-primary-500" />
          </div>
      </aside>
      </Step>
      <Step locked={!validName}>
        <svelte:fragment slot="header">Club Identity</svelte:fragment>        
        <label class="label">
          <span>What is the name of the club?</span>
          <input class="input p-2" type="text" placeholder="Club's name" bind:value={clubData.name} on:change={checkInputName}/>
        </label>
        <p>Club links in janshi.pro? (Alphanumeric and hypen (-) only, minimal 4 characters)</p>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
          <div class="input-group-shim">https://janshi.pro/club/</div>
          <input class="input p-2" type="text" placeholder="club's slugs" bind:value={clubData.slug} on:change={checkInputName}/>
        </div>
      </Step>
      <Step >
        <svelte:fragment slot="header">Club MetaData</svelte:fragment>        
        <label class="label">
          <span>Club community address*</span>
          <input class="input p-2" type="text" bind:value={clubData.address}/>
        </label>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label class="label">
            <span>Club country*</span>
            <select class="select" bind:value={clubData.countryISO2}>
              {#each arrCountries as country}
                <option value={country.code}>{country.name}</option>
              {/each}  
            </select>
          </label>
          <label class="label">
            <span>Club district/province*</span>
            <input class="input p-2" type="text" bind:value={clubData.district}/>
          </label>
          <label class="label">
            <span>Country phone code</span>
            <select class="select" bind:value={clubData.phoneCode}>
              {#each arrCountries as country}
                <option value={country.code}>{country.name}(+{country.phone})</option>
              {/each}  
            </select>
          </label>
          <label class="label">
            <span>Club number contact</span>
            <input class="input p-2" type="text" bind:value={clubData.phoneContact}/>
          </label>
          <label class="label">
            <span>Club email contact</span>
            <input class="input p-2" type="email" bind:value={clubData.emailContact}/>
          </label>
          <label class="label">
            <span>Club website</span>
            <input class="input p-2" type="text" bind:value={clubData.website}/>
          </label>
        </div>
      </Step>
    </Stepper>
  {/if}
</div>
			