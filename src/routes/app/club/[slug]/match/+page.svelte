<script lang="ts">
  import type { PageData } from "./$types";
  import TextArea from "molecule/textArea.svelte";
  import DatePicker from "organism/datePicker.svelte";
  import ClubMemberPicker from "organism/clubMemberPicker.svelte"
  import type { iMatchInput } from "interface/match";
  import type { iMemberPicker } from "interface/club";
	import toastAlert from "store/toast";
  import ParticipantCard from "organism/participantCard.svelte";
	import NumberInput from "molecule/numberInput.svelte";
  import { priceFormater } from "service/tools";
  import Button from "atom/button.svelte";
  
  export let data: PageData
  let deposit = 0
  const matchData = { matchAt: new Date, type: 1, officialRule: true,  playerUniqueCode: '', note: undefined, participantList:[] } as iMatchInput
  let playerList: number[] = []
  let scoreList: number[] = []
  $: totalScore = deposit + scoreList.reduce((a,b) => a + b, 0)

  
  function addPlayer(event: any) {
    const member: iMemberPicker = event.detail
    if (!playerList.includes(member.id)) {
      matchData.participantList = [...matchData.participantList, {
        chombo: 0,
        fullName: member.userData.fullName,
        playerRtId: member.userData.rtId,
        playerRtName: member.userData.rtData.name,
        draw: false,
        score: 30000,
        userId: member.id,
      }]
      playerList = [...playerList, member.id]
      scoreList = [...scoreList, 30000]
    } else {
      toastAlert.error('Player already inputed')
    }
  }

  function removePlayer(index: number) {
    toastAlert.warning(`Player ${matchData.participantList[index].fullName} removed from this match`)
    playerList = playerList.filter((v,i) => {return i != index})
    scoreList = scoreList.filter((v,i) => {return i != index})
    matchData.participantList = matchData.participantList.filter((v,i) => {
      return i != index
    })
  }

</script>

<div>
  <h1 class="text-4xl font-bold text-primary">Record a Match</h1>
  <div class="divider"></div>
  <p class="mb-4 text-secondary">Record a match for this club. Recorded match will have effect to player overall ranks and record, while it will be recorded to club standings. Please start by selecting participant player in the match. It is recomended to start inputing player in seat sequence <span class="font-bold">(EAST - SOUTH - WEST - NORTH)</span></p>
  {#if playerList.length < 4}
    <div class="w-3/5">
      <ClubMemberPicker clubSlug={data.userMemberData.clubData.slug} on:memberSelected={addPlayer} />
    </div>
  {/if}
  <div class="divider mt-8">Match Data</div>
  <div class="grid grid-cols-12 gap-4 items-center">
    <div class="col-span-3 form-control w-full ">
      <label class="label">
        <span class="label-text">Match Date?</span>
      </label>
      <DatePicker bind:selectedDate={matchData.matchAt} maxDay={0} />
    </div>
    <div class="col-span-9 row-span-2">
      <TextArea labelTL="Notes" bind:value={matchData.note} />
    </div>
    <div class="col-span-3 form-control">
      <label class="label cursor-pointer">
        <span class="label-text">Using Official Rule</span> 
        <input type="checkbox" class="toggle toggle-secondary" bind:checked={matchData.officialRule} />
      </label>
    </div>
    <div class="col-span-3 row-start-2">
      <NumberInput labelTL="Deposit" bind:value={deposit} step={100} />
    </div>
    <div class="col-span-3 font-bold">
      Total Score: <span class={`text-2xl ${totalScore == 120000 ? 'text-success' : 'text-error'}`}>{priceFormater(totalScore, 'none')}</span>
    </div>
    <div class="col-span-3">
      CC usage: <span class="text-2xl">200 - 15</span>
    </div>
    <div class="col-span-3">
      {#if playerList.length >= 4 && totalScore == 120000}
        <Button color="success" text="Submit Match" full />
      {:else if playerList.length < 4}
        <Button full color="base no-animation" text={`${playerList.length}/4 players`} />
      {:else if totalScore != 120000}
        <Button full color="base no-animation" text={`total score must 120.000`} />
      {/if}
    </div>
  </div>
  <div class="divider mt-8">Participant</div>
  <div class="grid grid-cols-2 gap-4 mb-8">
    {#each matchData.participantList as participant, i}
      <ParticipantCard data={participant} index={i} on:scoreChange={(event) => scoreList[i] = Number(event.detail)} on:remove={() => removePlayer(i)}/>
    {/each}
  </div>
</div>