<script lang="ts">
import type { PageServerData } from "./$types";
import Button from "atom/button.svelte";

export let data: PageServerData
const listApproval = data.listApproval

async function approveClub(uuid: string) {
  
}

</script>

<div class="overflow-x-auto">
  <table class="table">
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
          <td>{club.countryISO2}</td>
          <td>
            <div class="flex flex-col">
              <div>email: {club.emailContact ?? '-none-'}</div>
              <div>phone: {club.phoneContact ?? '-none-'}</div>
              <div>website: {club.website ?? '-none-'}</div>
            </div>
          </td>
          <td>{club.memberList[0].playerId}</td>
          <td>
            <Button text="Approve" color="success bg-success text-success-content hover:bg-success" icon="ph:check" on:click={() => approveClub(club.id)} />
            <Button text="Reject" color="error" icon="ph:x"/>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>