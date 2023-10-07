<script lang="ts">
  import type { PageData } from "./$types";
  import Avatar from "atom/avatar.svelte";
  import { dateFormater } from "service/tools";

  export let data: PageData
  let listMember = data.listMember
</script>

<div class="overflow-x-auto mb-8">
  <table class="table">
    <thead>
      <tr>
        <th>User Data</th>
        <th>Join Date</th>
        <th>Roles</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each listMember as member}
        <tr>
          <td>
            <div class="flex flex-row gap-4">
              <Avatar seed={member.userData.uuid} />
              <div class="flex flex-col">
                <div class="font-bold text-primary text-xl">{member.userData.fullName}</div>
                <div class="text-secondary">{member.userData.rtData.name} - {member.userData.currentRP}</div>
              </div>
            </div>
          </td>
          <td>{dateFormater(member.createdAt, 'date')}</td>
          <td class="font-bold text-accent">{member.roleData.name}</td>
        </tr>
      {/each}
    </tbody>
    <!-- foot -->
    <tfoot>
      <tr>
        <th>User Data</th>
        <th>Join Date</th>
        <th>Roles</th>
        <th>Action</th>
      </tr>
    </tfoot>
    
  </table>
</div>