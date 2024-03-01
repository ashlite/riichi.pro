<script lang="ts">
  //skeleton
  import { getToastStore, popup } from '@skeletonlabs/skeleton'
  import type {PopupSettings} from '@skeletonlabs/skeleton'
  //mylib
  import { dateFormater } from 'client-service/tools'
  //Icon
  import Icon from '@iconify/svelte'

  const today = new Date()
  export let maxDay: number | undefined = undefined 
  export let minDay: number | undefined = undefined
  export let longYear = false
  export let selectedDate: Date | null | undefined = new Date()
  const toast = getToastStore()
  $: buttonText = dateFormater(selectedDate, 'date')
  let modDate: Date = selectedDate ? new Date(selectedDate) : new Date()
  let totalDate = dateInMonth()

  const listMonth = [
    {id:0, name: 'Jan'},
    {id:1, name: 'Feb'},
    {id:2, name: 'Mar'},
    {id:3, name: 'Apr'},
    {id:4, name: 'May'},
    {id:5, name: 'Jun'},
    {id:6, name: 'Jul'},
    {id:7, name: 'Aug'},
    {id:8, name: 'Sep'},
    {id:9, name: 'Oct'},
    {id:10, name: 'Nov'},
    {id:11, name: 'Dec'},
  ]
  const listDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const datePop: PopupSettings = {
    event: 'click',
  	target: 'calendar',
	  placement: 'bottom',
    closeQuery: '#close-trigger'
  }

  function modYear(modifier: number){
    modDate.setFullYear(modDate.getFullYear() + modifier)
    totalDate = dateInMonth()
  }
  
  function modMonth(modifier: number){
    modDate.setMonth(modDate.getMonth() + modifier)
    totalDate = dateInMonth()
  }

  function submitDate(date: number | null){
    if (date != null) {
      const tempSelectedDate = new Date(modDate.getFullYear(),modDate.getMonth(), date)
      const diffDays = Math.ceil( (tempSelectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      //checker min and max
      if (maxDay != undefined && diffDays > maxDay) {
        console.log(tempSelectedDate.getTime())
        console.log(today.getTime())
        toast.trigger({
          message: `Maximum selected date is ${dateFormater(new Date(today.getTime() + (1000 * 60 * 60 * 24 * maxDay)), 'date')}`,
          background: "variant-filled-error"
        })
      } else if(minDay != undefined && diffDays < -(minDay)) {
        toast.trigger({
          message: `Minimum selected date is ${dateFormater(new Date(today.getTime() - (1000 * 60 * 60 * 24 * minDay)), 'date')}`,
          background: "variant-filled-error"
        })
      } else {
        selectedDate = tempSelectedDate
        buttonText = dateFormater(selectedDate, 'date')
        selectedDate = selectedDate
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    }
  }

  function dateInMonth() {
    let dateInMonthArray = []
    let weeklyArray = []
    const dateIterator = new Date(modDate.getFullYear(), modDate.getMonth(), 1)
    while (dateIterator.getMonth() == modDate.getMonth()){
      weeklyArray = []
      for(let i = 0; i < 7; i++){
        if(dateIterator.getDay() == i && dateIterator.getMonth() == modDate.getMonth()){
          weeklyArray.push(dateIterator.getDate())
          dateIterator.setDate(dateIterator.getDate() + 1)
        }
        else weeklyArray.push(null)
      }
      dateInMonthArray.push(weeklyArray)
    }
    return dateInMonthArray
  }

</script>

<button class="btn variant-filled" type="button" use:popup={datePop}>{buttonText}</button>

<div class="card p-4 variant-filled" data-popup="calendar">
	<div class="arrow variant-filled" />
  <div class="flex flex-row justify-center items-center gap-4">
    {#if longYear}
      <button class="btn-icon btn-icon-sm variant-filled-primary" type="button" on:click={() => {
        modYear(-5)
      }}>
        <Icon icon="mingcute:arrows-left-line" />  
      </button>
    {/if}
    <button class="btn-icon btn-icon-sm variant-filled-primary" type="button" on:click={() => modYear(-1)}>
      <Icon icon="mingcute:left-line" />
    </button>
    {#key totalDate}
      <div>{modDate.getFullYear().toString()}</div>
    {/key}
    <button class="btn-icon btn-icon-sm variant-filled-primary" type="button" on:click={() => modYear(+1)}>
      <Icon icon="mingcute:right-line"/>
    </button>
    {#if longYear}
      <button class="btn-icon btn-icon-sm variant-filled-primary" type="button" on:click={() => {
        modYear(5)
      }}>
        <Icon icon="mingcute:arrows-right-line" />
      </button>
    {/if}
  </div>
  <div class="flex flex-row justify-center items-center gap-4 my-2">
    <button class="btn-icon btn-icon-sm variant-filled-primary" type="button" on:click={() => modMonth(-1)}>
      <Icon icon="mingcute:left-line" />
    </button>
    {#key totalDate}
      <div>{listMonth[modDate.getMonth()].name}</div>
    {/key}
    <button class="btn-icon btn-icon-sm variant-filled-primary" type="button" on:click={() => modMonth(+1)}>
      <Icon icon="mingcute:right-line"/>
    </button>
  </div>
  <div class="grid grid-cols-7 gap-2 justify-items-center">
    {#each listDay as day}
      <div class="text-secondary-500">{day}</div>
    {/each}
    {#each totalDate as weekly}
      {#each weekly as daily}
        <div>
          {#if daily && selectedDate && daily == selectedDate.getDate() && modDate.getMonth() == selectedDate.getMonth() && modDate.getFullYear() == selectedDate.getFullYear()}
            <button class="btn btn-sm variant-outline-primary hover:variant-filled-primary active:variant-filled-success" type="button" id="close-trigger" on:click={() => submitDate(daily)}>{daily.toString()}</button>
          {:else if daily}
            <button class="btn btn-sm hover:variant-filled-primary active:variant-filled-success" id="close-trigger" type="button" on:click={() => submitDate(daily)}>{daily.toString()}</button>
          {/if}
        </div>
      {/each}
    {/each}
    {#if totalDate.length < 6}
      <div>
        <button class="btn btn-sm hover:cursor-default"></button>
      </div>
    {/if}
  </div>
</div>