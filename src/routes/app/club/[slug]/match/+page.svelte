<script lang="ts">
  import type { PageData } from "./$types";
  import TextInput from "molecule/textInput.svelte";
  import TextArea from "molecule/textArea.svelte";
  import DatePicker from "organism/datePicker.svelte";
  import ClubMemberPicker from "organism/clubMemberPicker.svelte"
  import type { iMatchInput } from "interface/match";
  import type { iMemberPicker } from "interface/club";
  
  export let data: PageData

  const matchData = { matchAt: new Date, type: 1, officialRule: true,  playerUniqueCode: '', note: undefined, participantList:[] } as iMatchInput
  const playerList: number[] = []

  function addPlayer(event: any) {
    const member: iMemberPicker = event.detail
    matchData.participantList.push({
      chombo: 0,
      fullName: member.userData.fullName,
      playerRtId: member.userData.rtId,
      playerRtName: member.userData.rtData.name,
      position: 1,
      score: 30000,
      userId: member.id, 
    })
    playerList.push(member.id)
  }

  function removePlayer(index: number) {
    
  }

</script>

<div>
  <h1 class="text-4xl font-bold text-primary">Record a Match</h1>
  <div class="divider"></div>
  <p class="mb-4 text-secondary">Record a match for this club. Recorded match will have effect to player overall ranks and record, while it will be recorded to club standings. Please start by selecting participant player in the match. It is recomended to start inputing player in seat sequence <span class="font-bold">(EAST - SOUTH - WEST - NORTH)</span></p>
  <div class="w-3/5">
    <ClubMemberPicker clubSlug={data.userMemberData.clubData.slug} on:memberSelected={addPlayer} />
  </div>
  <div class="divider mt-8">Match Data</div>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-3 form-control w-full ">
      <label class="label">
        <span class="label-text">Match Date?</span>
      </label>
      <DatePicker bind:selectedDate={matchData.matchAt} />
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
  </div>
  <div class="divider mt-8">Participant</div>
</div>