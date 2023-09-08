<script lang="ts">
let scoreError = false
let simulated = false
$: totalScore = players[0].score + players[1].score + players[2].score + players[3].score

interface Player {
  name: string
  score: number
  rank_i: number
  placement?: number
  bonus?: number
  basePoint?: number
  ca?:number
  multiplier?:number
  rankPoint?:number
}

interface Match {
  rule_i: number
  match_i: number
}

const players: Player[] = [{
  name: 'Player A',
  score: 30000,
  rank_i: 1
},{
  name: 'Player B',
  score: 30000,
  rank_i: 1
},{
  name: 'Player C',
  score: 30000,
  rank_i: 1
},{
  name: 'Player D',
  score: 30000,
  rank_i: 1
}]
const matchData: Match = {rule_i: 1.0, match_i: 1}
const bonusPoint = [[20,10,5,0], [40,20,0,-10], [40,20,-5,-20], [40,20,-10,-30], [90,30,-20,-40], [90,30,-20,-50], [90,30,-20,-60], [90,30,-30,-70], [90,30,-30,-80], [90,30,-30,-90]]

async function Simulate() {
  if (totalScore != 120000) {
    scoreError = true
    simulated = false
  } else {
    scoreError = false
    await Scoring()
    simulated = true
  }
}

function Scoring() {
  for (let i = 0; i < 4; i++) {
    let placementPoint = 4
    let sumIndex = 0
    // let draw = 0
    for (let x = 0; x < 4; x++) {
      sumIndex += players[x].rank_i
      if (i != x) {
        if (players[i].score > players[x].score) placementPoint--
        // else if (players[i].score == players[x].score) draw++
      }
    }
    
    players[i].placement = placementPoint
    players[i].bonus = bonusPoint[players[i].rank_i - 1][placementPoint - 1]
    players[i].basePoint = (players[i].score - 30000)/1000
    let skillIndex = (sumIndex/4)-players[i].rank_i
    if (skillIndex < -1) players[i].ca = (players[i].bonus!*skillIndex)/10
    else players[i].ca = 0

    if (players[i].score > 99999) players[i].multiplier = matchData.match_i + 0.6
    else if (players[i].score > 49999) players[i].multiplier = matchData.match_i + 0.3
    else players[i].multiplier = matchData.match_i

    players[i].rankPoint = Math.round((players[i].basePoint!*players[i].multiplier!) + (players[i].bonus!*matchData.match_i) + (players[i].ca!*matchData.match_i))
    // if (draw == 0){
    // } else if (draw == 1) {

    // }

  }
}
</script>

<div class="mt-4 mx-6">
  <h1 class="text-4xl font-bold my-4">Simulasi</h1>
  <div class="grid grid-cols-12 gap-4">
    <div class="card bg-primary shadow-xl col-span-4">
      <div class="card-body text-primary-content">
        <h2 class="card-title">Match Information</h2>
        <div class="form-control w-full" id="match">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text text-primary-content">Match Type</span>
          </label>
          <select class="select select-bordered" bind:value={matchData.match_i}>
            <option selected value={1}>Casual</option>
            <option value={10}>Tournament T1</option>
            <option value={20}>Tournament T2</option>
            <option value={30}>Tournament T3</option>
          </select>
        </div>
        <div class="form-control w-full" id="rule">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text text-primary-content">Rule use</span>
          </label>
          <select class="select select-bordered" bind:value={matchData.rule_i}>
            <option selected value={1.0}>(1.0) Hanchan Official</option>
            <option value={0.7}>(0.7) Tonpuusen Official</option>
            <option value={0.5}>(0.5) Other</option>
            <option value={1.5}>(1.5) Other High</option>
          </select>
        </div>
        {#each players as player}
          <div class="form-control w-full" id="player A">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
              <span class="label-text text-primary-content">{player.name}</span>
            </label>
            <div class="flex flex-row gap-4">
              <select class="select select-bordered w-full" bind:value={player.rank_i}>
                <option selected disabled>Rank</option>
                <option value={1}>Novice</option>
                <option value={2}>Adept 1</option>
                <option value={3}>Adept 2</option>
                <option value={4}>Adept 3</option>
                <option value={5}>Expert 1</option>
                <option value={6}>Expert 2</option>
                <option value={7}>Expert 3</option>
                <option value={8}>Expert 4</option>
                <option value={9}>Expert 5</option>
                <option value={10}>Master</option>
              </select>
              <input type="number" step={100} placeholder="Score" class="input input-bordered" bind:value={player.score} />
            </div>
          </div>
        {/each}
        <div class="flex flex-row-reverse font-bold">
          Total Score: {totalScore}
        </div>
        {#if scoreError}
          <div class="alert alert-error font-bold text-error-content">
            <span>Total score harus 120000</span>
          </div>
        {/if}
        <div class="card-actions justify-end">
          <button class="btn btn-accent" on:click={Simulate}>Submit</button>
        </div>
      </div>
    </div>
    {#if simulated}
      <div class="card bg-secondary shadow-xl col-span-8">
        <div class="card-body text-secondary-content">
          <h2 class="card-title">Result</h2>
          <div class="overflow-x-auto">
            <table class="table">
              <thead class="text-primary-content">
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Placement</th>
                  <th>Base Point</th>
                  <th>Bonus Point</th>
                  <th>Coeficient Adjustment</th>
                  <th>Multiplier</th>
                  <th>Rank Point Gain</th>
                </tr>
              </thead>
              <tbody>
                {#each players as player}
                  <tr>
                    <td>{player.name}</td>
                    <td>{player.score}</td>
                    <td>{player.placement}</td>
                    <td>{player.basePoint}</td>
                    <td>{player.bonus}</td>
                    <td>{player.ca}</td>
                    <td>{player.multiplier}</td>
                    <td>{player.rankPoint}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>