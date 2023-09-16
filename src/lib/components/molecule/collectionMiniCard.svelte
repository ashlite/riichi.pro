<script lang="ts">
  import Button from 'atom/button.svelte'
  import { goto } from "$app/navigation"
  import { createEventDispatcher } from "svelte"
  import { base } from '$app/paths'
  export let data: any, type: any
  
  const dispatch = createEventDispatcher()

  function removeConnection(){
    dispatch("removeConnection", {
      addOnId: data.id,
      type: type
    })
  }
</script>

<div class="card w-60 shadow-xl border border-primary">
  <figure class="max-h-40 overflow-hidden">
    {#if data.cover}
      <img src={data.cover} alt="Game Cover" class="object-contain" />
    {:else}
      <img src="https://dummyimage.com/1000x1000/edb200/ffffff&text=NO+IMG" alt="No Img Fallback" class="object-contain"/>
    {/if}
  </figure>
  <div class="card-body p-4 ">
    <div class="badge badge-primary">{data.released}</div>
    <h2 class="text-md font-bold">{data.name}</h2>
    <div class="card-actions justify-end">
      <button class="btn btn-error" on:click={() => removeConnection()}>
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path xmlns="http://www.w3.org/2000/svg" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM7.79289 7.79289C8.18342 7.40237 8.81658 7.40237 9.20711 7.79289L12 10.5858L14.7929 7.79289C15.1834 7.40237 15.8166 7.40237 16.2071 7.79289C16.5976 8.18342 16.5976 8.81658 16.2071 9.20711L13.4142 12L16.2071 14.7929C16.5976 15.1834 16.5976 15.8166 16.2071 16.2071C15.8166 16.5976 15.1834 16.5976 14.7929 16.2071L12 13.4142L9.20711 16.2071C8.81658 16.5976 8.18342 16.5976 7.79289 16.2071C7.40237 15.8166 7.40237 15.1834 7.79289 14.7929L10.5858 12L7.79289 9.20711C7.40237 8.81658 7.40237 8.18342 7.79289 7.79289Z" fill="#0D0D0D"></path>
        </svg>
      </button>
      <button class="btn btn-warning" on:click={() => goto(`${base}/app/catalogue/collection/${data.id}`)}>
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path xmlns="http://www.w3.org/2000/svg" d="M4 4C4 2.89543 4.89543 2 6 2H14C14.2652 2 14.5196 2.10536 14.7071 2.29289L19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4ZM17.5858 8L14 4.41421V8H17.5858ZM12 4L6 4V20H18V10H13C12.4477 10 12 9.55228 12 9V4ZM8 13C8 12.4477 8.44772 12 9 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H9C8.44772 14 8 13.5523 8 13ZM8 17C8 16.4477 8.44772 16 9 16H15C15.5523 16 16 16.4477 16 17C16 17.5523 15.5523 18 15 18H9C8.44772 18 8 17.5523 8 17Z" fill="#0D0D0D"></path>
        </svg>
      </button>
      <Button color="info" icon="uil:external-link-alt" href={`https://boardgamegeek.com/boardgame/${data.id}`} />
    </div>
  </div>
</div>