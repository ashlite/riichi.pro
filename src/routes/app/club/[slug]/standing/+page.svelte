<script lang="ts">
  import type { PageData } from "./$types";
  // import Select from "molecule/select.svelte";
  // import SelectItem from "atom/selectItem.svelte";
  // import PaginationNav from "organism/paginationNav.svelte";
  import { page } from "$app/stores";
	import { goto } from "$app/navigation";

  export let data: PageData
  const curentUrl = new URL($page.url)
  const today = new Date()
  const yearRange: number[] = []
  for (let i = 2023; i <= today.getFullYear(); i++) {
    yearRange.push(i);
  }
  let selectedMonth = Number(curentUrl.searchParams.get('month')) ?? today.getMonth()
  let selectedYear = curentUrl.searchParams.get('year') ?? today.getFullYear()

  async function updateDate() {
    const url = new URL($page.url)
    url.searchParams.set('month', selectedMonth.toString())
    url.searchParams.set('year', selectedYear.toString())
    goto(url)
  }

</script>

<div class="w-full flex flex-row gap-4 mb-4">
  <label class="label">
    <span>Select Month</span>
    <select class="select" bind:value={selectedMonth} on:change={updateDate}>
      <option value=0>January</option>
      <option value=1>February</option>
      <option value=2>March</option>
      <option value=3>April</option>
      <option value=4>May</option>
      <option value=5>June</option>
      <option value=6>July</option>
      <option value=7>August</option>
      <option value=8>September</option>
      <option value=9>October</option>
      <option value=10>November</option>
      <option value=11>December</option>
    </select>
  </label>

  <label class="label">
    <span>Select Year</span>
    <select class="select" bind:value={selectedYear} on:change={updateDate}>
      {#each yearRange as year}
        <option value={year}>{year}</option>      
      {/each}
    </select>
  </label>
</div>
<div class="overflow-x-auto my-4">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>Rank</th>
        <th>Player</th>
        <th>Total Uma</th>
        <th>Total Recorded Match</th>
      </tr>
    </thead>
    <tbody>
      {#each data.listStanding as standing, i}
        <tr>
          <td>{i+1}</td>
          <td>{standing.userData.fullName}</td>
          <td>{standing.totalUma}</td>
          <td>{standing.totalMatch}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>