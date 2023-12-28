<script lang="ts">
  import type { PageData } from "./$types";
  import TextArea from "molecule/textArea.svelte";
  import DatePicker from "organism/datePicker.svelte";
  import ClubMemberPicker from "organism/clubMemberPicker.svelte"
  import type { iMatchInput } from "interface/match";
  import type { iMemberPicker } from "interface/club";
  import type { iGlobalResponse } from "interface/utils";
	import toastAlert from "store/toast";
  import ParticipantCard from "organism/participantCard.svelte";
	import NumberInput from "molecule/numberInput.svelte";
  import { priceFormater } from "service/tools";
  import Button from "atom/button.svelte";
  import Select from "molecule/select.svelte";
  import SelectItem from 'atom/selectItem.svelte';
  import { invalidateAll } from "$app/navigation";
  
  export let data: PageData
  const matchData = { matchAt: new Date, deposit: 0, type: 1, matchRuleId: 0,  playerUniqueCode: '', note: undefined, participantList:[] } as iMatchInput
  let playerList: number[] = []
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
    if (!playerList.includes(member.id)) {
      matchData.participantList = [...matchData.participantList, {
        chombo: 0,
        fullName: member.userData.fullName,
        playerRtId: member.userData.rtId,
        playerRtName: member.userData.rtData.name,
        draw: 0,
        score: data.listMatchType[selectedRule].totalScore/4,
        userId: member.id,
        playerRtGroup: member.userData.rtData.groupRefId,
        playerSkillIndex: member.userData.rtData.skillIndex,
        position: 4,
        yakuman: 0
      }]
      if (member.userData.rtData.groupRefId == 201) totalNovice++
      else if (member.userData.rtData.groupRefId == 202) totalAmateur++
      else totalPro++
      playerList = [...playerList, member.id]
      scoreList = [...scoreList, 30000]
    } else {
      toastAlert.error('Player already inputed')
    }
  }

  function removePlayer(index: number) {
    toastAlert.warning(`Player ${matchData.participantList[index].fullName} removed from this match`)
    
    if (matchData.participantList[index].playerRtGroup == 201) totalNovice--
    else if (matchData.participantList[index].playerRtGroup == 202) totalAmateur--
    else totalPro--

    playerList = playerList.filter((v,i) => {return i != index})
    scoreList = scoreList.filter((v,i) => {return i != index})
    matchData.participantList = matchData.participantList.filter((v,i) => {
      return i != index
    })
  }

  async function submitMatch() {
    processing = true
    matchData.matchRuleId = data.listMatchType[selectedRule].id
    //adjust position
    matchData.participantList.forEach((participant,i) => {
      participant.position = 3
      for (let x = 0; x < 4; x++) {
        if (i != x) {
          if (participant.score > matchData.participantList[x].score) {
            participant.position--
          } else if (participant.score == matchData.participantList[x].score) {
            participant.position--
            participant.draw++
          }
        }
      }
    })

    const response = await fetch(`/api/v1/club/${data.userMemberData.clubData.slug}/match`, {
      method: 'POST',
      body: JSON.stringify(matchData)
    })
    const result: iGlobalResponse = await response.json()
    if (result.header.ok) {
      invalidateAll()
      toastAlert.success('Match Recorded')
    } else {
      toastAlert.responseError(result)
    }
    processing = false
  }

</script>

<div>
  <h1 class="text-4xl font-bold text-primary">Record a Match</h1>
  <div class="divider"></div>
  <p class="mb-4 text-secondary">Record a match for this club. Recorded match will have effect to player overall ranks and record, while it will be recorded to club standings. Please start by selecting participant player in the match. It is recomended to start inputing player in seat sequence <span class="font-bold">(EAST - SOUTH - WEST - NORTH)</span></p>
  {#if playerList.length < 4}
    <div class="w-3/5 mx-auto">
      <ClubMemberPicker clubSlug={data.userMemberData.clubData.slug} on:memberSelected={addPlayer} />
    </div>
  {/if}
  <div class="divider mt-8">Match Data</div>
  <div class="grid grid-cols-12 gap-4 items-center">
    <div class="col-span-3 form-control w-full z-10 ">
      <label class="label">
        <span class="label-text">Match Date?</span>
      </label>
      <DatePicker bind:selectedDate={matchData.matchAt} maxDay={0} />
    </div>
    <div class="col-span-9 row-span-2">
      <TextArea labelTL="Notes" bind:value={matchData.note} />
    </div>
    <div class="col-span-3 form-control">
      <Select bind:value={selectedRule} labelTL="Ruleset" >
        {#each data.listMatchType as matchType, i}
          <SelectItem value={i} text={matchType.name} />
        {/each}
      </Select>
    </div>
    <div class="col-span-1 row-start-3 text-end">
      DEPOSIT:
    </div>
    <div class="col-span-2 row-start-3">
      <NumberInput bind:value={matchData.deposit} step={100} />
    </div>
    <div class="col-span-3 font-bold">
      Total Score: <span class={`text-2xl ${totalScore == 120000 ? 'text-success' : 'text-error'}`}>{priceFormater(totalScore, 'none')}</span>
    </div>
    <div class="col-span-3">
      Estimate Use of Credit: <span class="text-2xl">{totalCC}</span>
    </div>
    <div class="col-span-3">
      {#if processing}
        <Button color="warning" text="Processing" full />
      {:else if playerList.length >= 4 && totalScore == data.listMatchType[selectedRule].totalScore}
        <Button color="success" text="Submit Match" full on:click={submitMatch} />
      {:else if playerList.length < 4}
        <Button full color="base no-animation" text={`${playerList.length}/4 players`} />
      {:else if totalScore != data.listMatchType[selectedRule].totalScore}
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