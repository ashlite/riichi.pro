<script lang="ts">
  import { invalidateAll } from "$app/navigation"
  import Button from "atom/button.svelte";
  import { del, download } from '$lib/service/api'
  import handleDownloadResponse from '$lib/service/donwloadFile'
  import toastAlert from "store/toast"
  
  export let data: {
    id: number,
    name: string
  }

  function mimeChecker(filename: string): string {
    const nameSplit = filename.split('.')
    const extension = nameSplit.at(-1)
    if (extension == 'pdf') return 'application/pdf'
    else if (extension == 'jpg' || extension == 'jpeg' || extension == 'jfif' || extension == 'pjpeg' || extension == 'pjp') return 'image/jpeg'
    else if (extension == 'gif') return 'image/gif'
    else if (extension == 'png') return 'image/png'
    else {
      toastAlert.error('Wrong file Format')
      return 'image'
    }
  }

  async function handleDownload(){
    const response = await download(`/file/download/${data.id}`)
    handleDownloadResponse(response.data, data.name)
  }

  async function handleView() {
    const response = await download(`/file/download/${data.id}`)
    const mimeType = mimeChecker(data.name)
    if (response.ok) {
      const url = window.URL.createObjectURL(new Blob([response.data], {type: mimeType}))
      window.open(url, '_blank')
    } else {
      toastAlert.fetchError(response)
    }
  }

  async function handleDelete(){
    const response = await del(`/file/${data.id}`)
    if (response.ok) {
      invalidateAll()
    } else {
      toastAlert.fetchError(response)
    }
  }
</script>

<div class="card bg-base-200 shadow-xl max-w-sm">
  <div class="card-body p-4">
    <h2 class="card-title">{data.name}</h2>
    <div class="card-actions justify-end">
      <Button size="sm" icon="uil:file-search-alt" color="info" on:click={handleView} />
      <Button size="sm" icon="uil:file-download" color="success" on:click={handleDownload} />
      <Button size="sm" icon="uil:file-times" color="error" on:click={handleDelete} />
    </div>
  </div>
</div>