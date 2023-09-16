<script lang="ts">
  export let data: any[]
  import Button from 'atom/button.svelte'
  import globalModal from 'store/modal'
  import { decodeXML, decodeHTML } from 'entities'
</script>

<div class="max-w-full">
  <table class="table table-fixed table-zebra w-full">
    <!-- head -->
    <thead>
      <tr>
        <th class="w-4">ID</th>
        <th class="w-4">Year</th>
        <th class="w-60">Name</th>
        <th class="w-24">Action</th>
      </tr>
    </thead>
    <tbody>
      {#if data.length > 0}
        {#each data as bg}
          <tr>
            <td>{bg.id}</td>
            {#if bg.yearpublished === undefined}
            <td>--</td>
            {:else}
            <td>{bg.yearpublished.value}</td>
            {/if}
            <td class="overflow-hidden">{decodeHTML(decodeXML(bg.name.value))}</td>
            <td>
              <div class="flex flex-row gap-4">
                <Button href={`https://boardgamegeek.com/boardgame/${bg.id}`} color='info' icon="uil:external-link-alt" />
                <Button text="Collection" color="primary" icon="uil:plus" on:click={() => globalModal.open({
                  title: 'Add New Collection',
                  template: 'formCollection',
                  data: {
                    bggId: bg.id
                  }
                })} />
              </div>
            </td>
          </tr>
        {/each}
      {:else}
          <tr>
            <td colspan="4">
              No Result found, use another query.
            </td>
          </tr>
      {/if}
    </tbody>
  </table>
</div>