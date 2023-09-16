<script lang="ts">
  import { bggSearchResult } from '$lib/store/utils'
  import { createEventDispatcher } from 'svelte'
  import { XMLParser } from 'fast-xml-parser'
  
  let startSearching = false
  let query = ''
  let totalResult = -1
  let resetToogle = false
  const parser = new XMLParser({
    ignoreAttributes : false,
    attributeNamePrefix : "",
  })

  const dispatch = createEventDispatcher()

  async function SearchGame(){
    if (query) {
      startSearching = true
      let stripQuery = query.replaceAll(' ', '+')
      try {
        const response = await fetch(`https://boardgamegeek.com/xmlapi2/search?type=boardgame,boardgameexpansion&query=${stripQuery}`,{})
        const dataBgg = parser.parse(await response.text())
        totalResult = dataBgg.items.total
        if (totalResult > 1) {
          bggSearchResult.set(dataBgg.items.item)
        } else if (totalResult == 1) {
          bggSearchResult.set([dataBgg.items.item])
        } else {
          bggSearchResult.set([null])
        }
      } catch (error) {
        console.log(error)
      } finally {
        startSearching = false
        resetToogle = true
      }
    }
  }

  function ResetQuery(){
    startSearching = false
    query = ''
    totalResult = -1
    resetToogle = false
    bggSearchResult.set(null)
    dispatch('message', {
      text: 'Reset'
    })
  }

</script>

<div class="form-control w-full max-w-xl mb-8 mx-auto" id="search-bar">
  <label class="label" for="search-bar">
    <span class="label-text">Search board game from BGG</span>
  </label>
  <form class='flex flex-row gap-4' on:submit|preventDefault={() => SearchGame()}>
    <input type="text" placeholder="Type here" class="input input-bordered input-md w-full max-w-xs" bind:value={query}/>
    <button class={startSearching ? "btn btn-primary gap-2 active loading" : "btn btn-primary gap-2"} on:click={() => SearchGame()}>
      {#if !startSearching}
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path xmlns="http://www.w3.org/2000/svg" d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z" />
        </svg>
      {/if}
      Search
    </button>
    {#if resetToogle}
      <button class="btn btn-info gap-2" on:click={ResetQuery}>
        Reset
      </button>
    {/if}
  </form>
  {#if totalResult >= 0}
    <label class="label" for="search-bar">
      <span class="label-text">Total Query Result = {totalResult}</span>
    </label>
  {/if}
</div> 