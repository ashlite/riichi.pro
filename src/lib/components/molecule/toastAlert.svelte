<script>
  import toastAlert from "store/toast"
  import { fade} from 'svelte/transition'
</script>

<div class="fixed z-[100] w-auto">
  <div class='toast toast-start toast-bottom'>
    {#each $toastAlert as toast}
      <div class="alert shadow-lg my-2 {toast.type == 'info' ? 'alert-info' : toast.type == 'error' ? 'alert-error' : toast.type == 'warning' ? 'alert-warning' : 'alert-success'}" transition:fade>
        <div>
          <span>{toast.message}</span>
        </div>
      </div>
    {/each}
  </div>
</div>