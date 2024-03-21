<script lang="ts">
  //skeleton
  import {getToastStore} from '@skeletonlabs/skeleton'
  //mylib
  import ClubMemberPicker from "ui/clubMemberPicker.svelte"
  import type { iMatchInput } from "interface/match";
  import type { iMemberPicker } from "interface/club";
  import type { iGlobalResponse } from "interface/utils";
  import DatePicker from 'ui/datePicker.svelte'
  import { priceFormater } from "client-service/tools.js";
	import ParticipantCard from "ui/participantCard.svelte";

  
  export let data
  const toast = getToastStore()
  const matchData = { matchAt: 0, deposit: 0, type: 1, matchRuleId: 0,  playerUniqueCode: '', note: undefined, participantList:[], participantIdList:[] } as iMatchInput
  let matchDate = new Date()
  let scoreList: number[] = []
  let totalNovice = 0
  let totalAmateur = 0
  let totalPro = 0
  let selectedRule = 0
  let processing = false
  $: totalScore = matchData.deposit + scoreList.reduce((a,b) => a + b, 0)
  $: totalCC = data.listMatchType[selectedRule].ccBase + (totalNovice*data.listMatchType[selectedRule].ccNovice) + (totalAmateur*data.listMatchType[selectedRule].ccAmateur) + (totalPro*data.listMatchType[selectedRule].ccPro)
  
  function addPlayer(event: any) {
    const member: iMemberPicker = event.detail
    if (!matchData.participantIdList.includes(member.id)) {
      matchData.participantList = [...matchData.participantList, {
        chombo: 0,
        fullName: member.userData.fullName,
        playerRtId: member.userData.rtId,
        playerRtName: member.userData.rtData.name,
        playerRtGroup: member.userData.rtData.groupRefId,
        score: data.listMatchType[selectedRule].totalScore/4,
        clubMemberId: member.id,
        yakuman: 0,
        avatarUrl: member.userData.avatarUrl
      }]
      matchData.participantIdList = [...matchData.participantIdList, member.id]
      if (member.userData.rtData.groupRefId == 201) totalNovice++
      else if (member.userData.rtData.groupRefId == 202) totalAmateur++
      else totalPro++
      scoreList = [...scoreList, 30000]
    } else {
      toast.trigger({
        message: 'Player already inputed',
        background: 'variant-filled-error'
      })
    }
  }

  function removePlayer(index: number) {
    toast.trigger({
      message: `Player ${matchData.participantList[index].fullName} removed from this match`,
      background: 'variant-filled-warning'
    })
    
    if (matchData.participantList[index].playerRtGroup == 201) totalNovice--
    else if (matchData.participantList[index].playerRtGroup == 202) totalAmateur--
    else totalPro--

    scoreList = scoreList.filter((v,i) => {return i != index})
    matchData.participantIdList = matchData.participantIdList.filter((v,i) => {return i != index})
    matchData.participantList = matchData.participantList.filter((v,i) => {return i != index})
  }

  async function submitMatch() {
    processing = true
    matchData.matchRuleId = data.listMatchType[selectedRule].id
    matchData.matchAt = matchDate.getTime()

    const response = await fetch(`/api/v1/private/club/${data.userMemberData.clubData.slug}/match`, {
      method: 'POST',
      body: JSON.stringify(matchData)
    })
    if (response.ok) {
      totalNovice = 0
      totalAmateur = 0
      totalPro = 0
      selectedRule = 0
      matchData.deposit = 0
      matchData.type = 1
      matchData.matchRuleId = 0
      matchData.note = undefined
      matchData.participantList = []
      matchData.participantIdList = []
      scoreList = []
      toast.trigger({
        message: 'Match recorded',
        background: 'variant-filled-success'
      })
    } else {
      toast.trigger({
        message: response.statusText,
        background: 'variant-filled-error'
      })
    }
    processing = false
  }

</script>

<div>
  <h1 class="h1 font-bold text-primary-500">Record a Match</h1>
  <p class="mb-4 text-secondary">Record a match for this club. Recorded match will have effect to player overall ranks and record, while it will be recorded to club standings. Please start by selecting participant player in the match. It is recomended to start inputing player in seat sequence <span class="font-bold">(EAST - SOUTH - WEST - NORTH)</span></p>
  <h1 class="h1 font-bold text-primary-500 mt-8">Match Data</h1>
  <div class="grid grid-cols-3 gap-4 items-center">
    <label for="matchdate" class="label flex flex-col">
      <span>Match Date?</span>
      <DatePicker bind:selectedDate={matchDate} maxDay={0} />
    </label>
    <label class="">
      <span>DEPOSIT</span>
      <input step="100" class="input p-3 variant-filled" type="number" />
    </label>
    <div class="font-bold flex flex-col">
      Total Score: 
      <span class={`h2 ${totalScore == 120000 ? 'text-success-500' : 'text-error-500'}`}>{priceFormater(totalScore, 'none')}</span>
    </div>
    <label for="notes" class="col-span-2 label">
      <span>Notes</span>
      <textarea class="textarea variant-filled p-2" rows="4" bind:value={matchData.note} />
    </label>
    <label class="label">
      <span>Ruleset</span>
      <select bind:value={selectedRule} size=3 class="select p-1" >
        {#each data.listMatchType as matchType, i}
          <option value={i}>{matchType.name}</option>
        {/each}
      </select>
    </label>
    <div class="col-start-2">
      Estimate Use of Credit: <span class="text-2xl">{totalCC}</span>
    </div>
    <div class="">
      {#if processing}
        <button class="btn w-full variant-ghost" disabled>Processing</button>
      {:else if data.userMemberData.clubData.clubStatusId != 502}
        <button class="btn w-full variant-filled-success" disabled>Non-active club</button>
      {:else if matchData.participantIdList.length < 4}
        <button class="btn w-full variant-filled-success" disabled>{`${matchData.participantIdList.length}/4 players`}</button>  
      {:else if totalScore != data.listMatchType[selectedRule].totalScore}
        <button class="btn w-full variant-filled-success" disabled>total score must 120.000</button>
      {:else}
        <button class="btn w-full variant-filled-success" on:click={submitMatch}>Submit Match</button>
      {/if}
    </div>
  </div>
  <h1 class="h1 font-bold text-primary-500 mt-8">Participant List</h1>
  {#if matchData.participantIdList.length < 4}
    <div class="w-4/5 mx-auto my-4">
      <ClubMemberPicker clubSlug={data.userMemberData.clubData.slug} on:memberSelected={addPlayer} />
    </div>
  {/if}
  <div class="grid grid-cols-2 gap-4 mb-8">
    {#each matchData.participantList as participant, i}
      <ParticipantCard data={participant} index={i} on:scoreChange={(event) => scoreList[i] = Number(event.detail)} on:remove={() => removePlayer(i)}/>
    {/each}
  </div>
</div>