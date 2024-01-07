<script lang="ts">
  import type { PageData } from "./$types";
  import Avatar from "atom/avatar.svelte";
  import { dateFormater } from "service/tools";
  import Button from "atom/button.svelte";
	import globalModal from "store/modal";
  import { getLoginUser } from "store/user";

  export let data: PageData
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
      {#each data.listMember as member}
        <tr>
          <td>
            <div class="flex flex-row gap-4">
              <Avatar user={member.userData} />
              <div class="flex flex-col">
                <div class="font-bold text-primary text-xl">{member.userData.fullName}</div>
                <div class="text-secondary">{member.userData.rtData.name} - {member.userData.currentRP}</div>
              </div>
            </div>
          </td>
          <td>{dateFormater(member.createdAt, 'date')}</td>
          <td class="font-bold">
            {#if member.roleData.id == 301}
              <span class="text-primary">{member.roleData.name}</span>
            {:else if member.roleData.id == 302}
              <span class="text-secondary">{member.roleData.name}</span>
            {:else if member.roleData.id == 303}
              <span class="text-warning">{member.roleData.name}</span>
            {:else}
              <span class="text-accent">{member.roleData.name}</span>
            {/if}
          </td>
          <td class="flex flex-row">
            {#if data.userMemberData.roleId > 303 && data.userMemberData.roleId > member.roleId && data.userMemberData.userId != member.userId}
              <div>
                <Button text="kick" color="error" size="sm" icon="ph:gavel" on:click={() => globalModal.kickMember(member.id, member.userData.fullName, data.userMemberData.clubData.slug)}/>
              </div>  
            {/if}
          </td>
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