<script lang="ts">
  import type { PageData } from "./$types";
  import Select from "molecule/select.svelte";
  import SelectItem from "atom/selectItem.svelte";
  import PaginationNav from "organism/paginationNav.svelte";
  import { page } from "$app/stores";
	import { goto } from "$app/navigation";

  export let data: PageData
  const curentUrl = new URL($page.url)
  const today = new Date()
  const yearRange: number[] = []
  for (let i = 2023; i <= today.getFullYear(); i++) {
    yearRange.push(i);
  }
  let selectedMonth = curentUrl.searchParams.get('month') ?? today.getMonth()
  let selectedYear = curentUrl.searchParams.get('year') ?? today.getFullYear()

  async function updateDate() {
    const url = new URL($page.url)
    url.searchParams.set('month', selectedMonth.toString())
    url.searchParams.set('year', selectedYear.toString())
    goto(url)
  }

</script>

<div class="w-full flex flex-row gap-4 mb-4">
  <Select labelTL="Select Month" bind:value={selectedMonth} on:change={updateDate}>
    <SelectItem text="January" value=0 />
    <SelectItem text="February" value=1 />
    <SelectItem text="March" value=2 />
    <SelectItem text="April" value=3 />
    <SelectItem text="May" value=4 />
    <SelectItem text="June" value=5 />
    <SelectItem text="July" value=6 />
    <SelectItem text="August" value=7 />
    <SelectItem text="September" value=8 />
    <SelectItem text="October" value=9 />
    <SelectItem text="November" value=10 />
    <SelectItem text="December" value=11 />
  </Select>

  <Select labelTL="Select Year" bind:value={selectedYear} on:change={updateDate}>
    {#each yearRange as year}
      <SelectItem text={year} value={year} />      
    {/each}
  </Select>

  <!-- <PaginationNav /> -->
</div>
<div class="overflow-x-auto">
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