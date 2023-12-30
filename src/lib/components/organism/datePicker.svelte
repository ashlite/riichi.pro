<script lang="ts">
  import Button from 'atom/button.svelte'
  import BtnGroup from 'molecule/btnGroup.svelte'
  import { createEventDispatcher} from 'svelte'
  import toastAlert from 'store/toast'
  import { dateFormater } from 'service/tools'

  const today = new Date()
  export let maxDay: number | undefined = undefined 
  export let minDay: number | undefined = undefined
  export let selectedDate: Date = new Date()
  let buttonText = dateFormater(selectedDate, 'date')
  let modDate: Date = new Date(selectedDate)
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
  const listDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  const dispatch = createEventDispatcher() 
  function forward() {
    // dispatch('submit', {date: dateValue})
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
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
        toastAlert.error(`Maximum selected date is ${dateFormater(new Date(today.getTime() + (1000 * 60 * 60 * 24 * maxDay)), 'date')}`)
      } else if(minDay != undefined && diffDays < -(minDay)) {
        toastAlert.error(`Minimum selected date is ${dateFormater(new Date(today.getTime() - (1000 * 60 * 60 * 24 * minDay)), 'date')}`)
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

<div class="dropdown">
  <Button full text={buttonText} />
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div tabindex="0" class="dropdown-content card divide-x p-2 shadow bg-base-200 text-info-content w-80">
    <div class="">
      <div class="flex flex-col justify-center p-2 gap-2">
        <BtnGroup>
          <Button join text="-10" size="sm" color="info" on:click={() => modYear(-10)}/>
          <Button join text="-1" size="sm" color="info" on:click={() => modYear(-1)}/>
          {#key totalDate}
            <div class="join-item text-base-content font-bold grow text-center text-xl">{modDate.getFullYear().toString()}</div>
            <!-- <Button join text= size="sm" grow/>   -->
          {/key}
          <Button join text="+1" size="sm" color="info" on:click={() => modYear(1)}/>
          <Button join text="+10" size="sm" color="info" on:click={() => modYear(10)}/>
        </BtnGroup>
        <BtnGroup>
          <Button join icon="ph:caret-circle-left-bold" size="sm" color="info" on:click={() => modMonth(-1)}/>
          {#key totalDate}
            <div class="join-item text-base-content font-bold grow text-center text-xl">{listMonth[modDate.getMonth()].name}</div>
            <!-- <Button join text={listMonth[modDate.getMonth()].name} size="sm" grow/>   -->
          {/key}
          <Button join icon="ph:caret-circle-right-bold" size="sm" color="info" on:click={() => modMonth(1)}/>
        </BtnGroup>
        <div class="grid grid-cols-7 gap-2">
          {#each listDay as day}
            <div class="text-accent text-center">{day}</div>
          {/each}
          {#each totalDate as weekly}
            {#each weekly as daily}
              <div>
                {#if daily && daily == selectedDate.getDate() && modDate.getMonth() == selectedDate.getMonth() && modDate.getFullYear() == selectedDate.getFullYear()}
                  <Button text={daily.toString()} color="secondary" size='sm' full on:click={() => submitDate(daily)}/>
                {:else if daily}
                  <Button text={daily.toString()} color="primary" size='sm' full on:click={() => submitDate(daily)}/>
                {/if}
              </div>
            {/each}
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>