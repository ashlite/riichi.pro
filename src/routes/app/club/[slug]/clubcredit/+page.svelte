<script lang="ts">
  //icon
  import Icon from '@iconify/svelte'
  //mylib
  import { dateFormater } from 'client-service/tools.js'

  export let data
</script>

<div>
  <h3 class="h3">Club Credits: <span class="font-bold">{data.userMemberData.clubData.currentCC}</span></h3>
  <button class="btn variant-filled-success">
    <span class="mr-2 h3"><Icon icon="mingcute:add-line" /></span>
    Top up credit
  </button>
</div>

<h1>Credit Usage History</h1>
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Date</th>
				<th>Transaction</th>
				<th>New Balance</th>
				<th>Usage</th>
			</tr>
		</thead>
		<tbody>
			{#each data.clubCC as clubCC}
				<tr>
					<td>{dateFormater(clubCC.createdAt, 'datetime')}</td>
					<td class={clubCC.ccMove < 0 ? 'text-error-500' : 'text-success-500'}>
            {clubCC.ccMove}
          </td>
					<td>{clubCC.ccAfter}</td>
					<td>{clubCC.typeRef.name}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
