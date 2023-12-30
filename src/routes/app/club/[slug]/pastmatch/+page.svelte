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

</script>

<!-- <div class="w-full flex flex-row gap-4 mb-4">
  
</div>
<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Metadata</th>
        <th>Participant</th>
      </tr>
    </thead>
    <tbody>
      
    </tbody>
  </table>
</div> -->

<h1>WORK IN PROGRESS</h1>