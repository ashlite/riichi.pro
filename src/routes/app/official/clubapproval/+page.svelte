<script lang="ts">
import { invalidateAll } from "$app/navigation";
import type { PageData } from "./$types";
import Button from "atom/button.svelte";
import { objCountries } from "service/country";
import toastAlert from "store/toast";

export let data: PageData
const listApproval = data.listApproval

function countryFromCode(code: string): string {
  return objCountries[code as keyof typeof objCountries].name
}

async function approveClub(uuid: string) {
  const response = await fetch(`/api/v1/official/approveclub/${uuid}`,{
    method: 'POST'
  })
  const result = await response.json()

  if (result.ok) {
    toastAlert.success('Success approving club')
    invalidateAll()
  } else {
    toastAlert.error(result.message)
  }
}

</script>

<div class="overflow-x-auto">
  <table class="table table-zebra">
    <!-- head -->
    <thead class="bg-secondary text-secondary-content">
      <tr>
        <th>Club</th>
        <th>Country</th>
        <th>Contact</th>
        <th>Owner</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each listApproval as club}
        <tr>
          <td>{club.name}</td>
          <td>{countryFromCode(club.countryISO2)}</td>
          <td>
            <div class="flex flex-col">
              <div>email: {club.emailContact ?? '-none-'}</div>
              <div>phone: {club.phoneContact ?? '-none-'}</div>
              <div>website: {club.website ?? '-none-'}</div>
            </div>
          </td>
          <td>{club.memberList[0].playerData.username}</td>
          <td>
            <Button text="Approve" color="success bg-success text-success-content hover:bg-success" icon="ph:check" on:click={() => approveClub(club.id)} />
            <Button text="Reject" color="error" icon="ph:x" on:click={() => toastAlert.warning('WIP')}/>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>