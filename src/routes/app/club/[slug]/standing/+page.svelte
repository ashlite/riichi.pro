<script lang="ts">
  //svelte
  import { page } from "$app/stores";
	import { goto } from "$app/navigation";
  //skeleton
  import { Paginator } from "@skeletonlabs/skeleton"

  export let data
  const today = new Date()
  const curentUrl = new URL($page.url)
  const yearRange: number[] = []
  for (let i = 2023; i <= today.getFullYear(); i++) {
    yearRange.push(i);
  }
  let selectedMonth = curentUrl.searchParams.get('month') ?? today.getMonth()
  let selectedYear = curentUrl.searchParams.get('year') ?? today.getFullYear()

  async function updateDate() {
    const url = new URL($page.url)
    url.searchParams.set('year', selectedYear.toString())
    url.searchParams.set('month', selectedMonth.toString())
    url.searchParams.set('page', '1')
    goto(url)
  }

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

</script>


<div class="w-full flex flex-col md:flex-row gap-4 mb-4 items-center md:items-end">
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
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">
    <span>Pagination</span>
    <Paginator
      bind:settings={data.paginationSetting}
      on:amount={onAmountChange}
      on:page={onPageChange}
      showFirstLastButtons showPreviousNextButtons 
    />
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