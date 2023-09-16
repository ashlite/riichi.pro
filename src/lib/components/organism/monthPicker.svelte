<script lang="ts">
  import Button from 'atom/button.svelte'
  import BtnGroup from 'molecule/btnGroup.svelte'
  import { createEventDispatcher} from 'svelte'
  import toastAlert from 'store/toast'
  import { dateFormater } from '$lib/service/tools'
  import type { iMonthPickerResult } from 'interface/components'

  const today = new Date()
  let dateValue = new Date()
  let buttonText = `${dateFormater(dateValue, 'monthly')}`
  let year = dateValue.getFullYear()
  const listMonth = [
    {id:0, name: 'January'},
    {id:1, name: 'February'},
    {id:2, name: 'March'},
    {id:3, name: 'April'},
    {id:4, name: 'May'},
    {id:5, name: 'June'},
    {id:6, name: 'July'},
    {id:7, name: 'August'},
    {id:8, name: 'September'},
    {id:9, name: 'October'},
    {id:10, name: 'November'},
    {id:11, name: 'December'},
  ]

  const dispatch = createEventDispatcher<{'submit': iMonthPickerResult}>()  
  function forward(){
    dispatch('submit', {date: dateValue})
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  function modYear(modifier: number){
    if (dateValue.getFullYear() <= 2021 && modifier < 0){
      toastAlert.warning('Waktu minimal adalah setelah tahun 2021')
    } else {
      dateValue.setFullYear(year + modifier)
      year = dateValue.getFullYear()
    }
  }

  function submitMonth(id: number){
    dateValue.setMonth(id)
    buttonText = `${dateFormater(dateValue, 'monthly')}`
    forward()
  }
</script>

<div class="dropdown">
  <Button full text={buttonText} />
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div tabindex="0" class="dropdown-content card divide-x p-2 shadow bg-base-200 text-info-content">
    <div class="min-w-max">
      <div class="flex flex-col justify-center p-2 gap-2 min-w-72" >
        <BtnGroup>
          <Button join icon="uil:angle-left" size="sm" color="info" on:click={() => modYear(-1)}/>
          <Button join text={year.toString()} size="sm" grow/>
          <Button join icon="uil:angle-right" size="sm" color="info" on:click={() => modYear(1)}/>
        </BtnGroup>
        <div class="grid grid-cols-3 gap-2">
          {#each listMonth as month}
            {#if month.id == today.getMonth() && year == today.getFullYear()}
              <Button text={month.name} color="primary" size="sm" on:click={() => submitMonth(month.id)} outline />
            {:else}
              <Button text={month.name} size="sm" on:click={() => submitMonth(month.id)} outline />
            {/if}
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>