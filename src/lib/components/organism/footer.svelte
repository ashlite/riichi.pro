<script lang="ts">
  import globalModal from "store/modal";
  
  export let appVersion: string

</script>

<footer class="flex flex-col py-4 items-center bottom-0 bg-primary text-primary-content">
  <div>v{appVersion} - Early build, expect some errors and bug</div>
  <div class="font-bold underline hover:cursor-pointer" on:click={globalModal.webCredit}>Created and developed by David</div>
</footer>