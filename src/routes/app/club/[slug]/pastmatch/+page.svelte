<script lang="ts">
  //svelte
  import { page } from "$app/stores";
	import { goto } from "$app/navigation";
  //skeleton
  import { Paginator, Avatar } from '@skeletonlabs/skeleton'
  //mylib
  import DatePicker from 'ui/datePicker.svelte'
  import {dateFormater} from 'client-service/tools.js'
	import PlayerAvatar from "ui/playerAvatar.svelte";

  export let data
  const curentUrl = new URL($page.url)
  const today = new Date()
  let fromDate = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)
  let toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)

  function onPageChange(e: CustomEvent): void {
    const url = new URL($page.url)
    url.searchParams.set('page', e.detail)
    goto(url)
  }

  function onAmountChange(e: CustomEvent): void {
    const url = new URL($page.url)
    url.searchParams.set('limit', e.detail)
    goto(url)
  }

  function onStartDateChange(): void {
    const url = new URL($page.url)
    url.searchParams.set('startDate', fromDate.toDateString())
    goto(url)
  }

  function onEndDateChange(): void {
    const url = new URL($page.url)
    url.searchParams.set('endDate', toDate.toDateString())
    goto(url)
  }

</script>

<div class="flex flex-row gap-4">
  <!-- <div>
    <span>Start Date</span>
    <DatePicker name="startDate" bind:selectedDate={fromDate} on:dateSubmit={onStartDateChange} />
  </div>
  <div>
    <span>End Date</span>
    <DatePicker name="endDate" bind:selectedDate={toDate} on:dateSubmit={onEndDateChange}/>
  </div> -->
  <Paginator bind:settings={data.paginationSetting} on:amount={onAmountChange} on:page={onPageChange} showFirstLastButtons />
</div>
<p>List all recorded match sort by created date</p>

<div class="my-8 flex flex-col gap-4">
  {#each data.listPastMatch as match}
    <div class="card bg-gradient-to-br from-red-500 to-amber-400 shadow-xl">
      <header class="card-header h3 font-bold text-primary-50">{match.id}</header>
      <div class="flex flex-row gap-4 mx-4">
        <div><span class="font-bold">Create At: </span>{dateFormater(match.createdAt, 'date')}</div>
        <div><span class="font-bold">Match At: </span>{dateFormater(match.matchAt, 'date')}</div>
        <div><span class="font-bold">Cost: </span>{match.costCC} CC</div>
        <div><span class="font-bold">Deposit: </span>{match.deposit}</div>
        <div><span class="font-bold">Submitter: </span>{match.creatorMemberData?.userData.fullName}</div>
      </div>
      <div class="grid grid-cols-2 p-2 gap-4">
        {#each match.participantList as participant}
          <div class={participant.position == 0 ? "card p-2 bg-gradient-to-br from-lime-500 to-green-500" : "card p-2"}>
            <div class="flex flex-row gap-2 items-center">
              <PlayerAvatar playerAvatarUrl={participant.userData.avatarUrl} playerId={participant.userData.id} playerName={participant.userData.fullName} width="w-20" />
              <div class="flex flex-col">
                <h3 class="h3">
                  <span class="font-bold">({participant.seatRefData.name})</span> {participant.userData.fullName}</h3>
                <h4>{participant.matchRt.name}</h4>
              </div>
            </div>
            <div class="flex flex-row gap-4">
              <div><span class="font-bold">Position: </span>{participant.position + 1}</div>
              <div><span class="font-bold">Score: </span>{participant.score}</div>
              <div><span class="font-bold">Net: </span>{participant.gainUma}</div>
              <div><span class="font-bold">Chombo: </span>{participant.chombo}</div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>