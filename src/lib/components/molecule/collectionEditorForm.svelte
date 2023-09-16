<script>
  import { listCollectionCategory, collectionEditorData } from 'store/utils'
  import { BggSingleItem } from '$lib/service/bggInteraction'


  async function PullDataBgg(bggId){
    let response = await BggSingleItem(bggId)
    collectionEditorData.set({
      ...collectionEditorData,
      bgg_id: bggId,
      ...response.boardgame,
    })
  }
</script>

<div id="name-released" class="grid grid-cols-12 gap-4">
  <div id="name-collection" class="form-control w-full col-span-9">
    <label class="label" for="nama-collection">
      <span class="label-text">Collection Name<span class="text-error font-bold">*</span></span>
    </label>
    <input id="nama-collection" type="text" placeholder="Type here" class="input input-bordered w-full" bind:value={$collectionEditorData.name} required/>
  </div>
  <div id="released-collection" class="form-control w-full col-span-3">
    <label class="label" for="released-collection">
      <span class="label-text">Year Published</span>
    </label>
    <input id="released-collection" type="number" class="input input-bordered w-full" bind:value={$collectionEditorData.released}/>
  </div>
</div>

<div id="nama-released" class="grid grid-cols-12 gap-4">
  <div id="category-collection" class="form-control w-full col-span-6">
    <label class="label" for="category-collection">
      <span class="label-text">Category<span class="text-error font-bold">*</span></span>
    </label>
    {#await $listCollectionCategory}
      <h1 class="text-xl">Loading...</h1>
    {:then value}
      <select id="category-collection" class="select select-bordered w-full" bind:value={$collectionEditorData.category}>
        {#each value as category}
          <option value={category.category}>{category.category}</option>
        {/each}
      </select>
    {/await}
  </div>
  <div id="bggId-collection" class="form-control w-full col-span-6">
    <label class="label" for="bggId-collection">
      <span class="label-text">ID from BGG</span>
      <span class="label-text-alt">(please use this only if the item have BGG page)</span>
    </label>
    <div class="grid grid-cols-4 gap-4 col-span-6">
      <input id="nama-collection" type="number" placeholder="Type here" class="input col-span-3 input-bordered w-full" bind:value={$collectionEditorData.bgg_id} />
      <button class="btn btn-info" on:click={() => PullDataBgg($collectionEditorData.bgg_id)}>
        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path xmlns="http://www.w3.org/2000/svg" d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="#0D0D0D"></path>
        </svg>
      </button>
    </div>
  </div>
</div>

{#if $collectionEditorData.category == 'Core Game' || $collectionEditorData.category == 'Expansion' || $collectionEditorData.category == 'Core & Expansion'}
  <div id="age-players-playtime" class="grid grid-cols-12 gap-4 mt-4">
    <div id="min-age" class="form-control w-full col-span-2">
      <label class="label" for="min-age">
        <span class="label-text">Minimal Age</span>
      </label>
      <input id="min-age-input" type="number" class="input input-bordered w-full" bind:value={$collectionEditorData.min_age}/>
    </div>
    <div id="players" class="form-control w-full col-span-4 border-l-2 border-secondary pl-2">
      <label class="label" for="players">
        <span class="label-text">Recomended Players</span>
      </label>
      <div class="grid grid-cols-7">
        <input id="min-player" type="number" class="input input-bordered w-full col-span-3" bind:value={$collectionEditorData.min_player}/>
        <div class="font-bold text-4xl text-center">-</div>
        <input id="max-player" type="number" class="input input-bordered w-full col-span-3" bind:value={$collectionEditorData.max_player}/>
      </div>
    </div>
    <div id="playtime" class="form-control w-full col-span-4 border-l-2 border-secondary pl-2">
      <label class="label" for="playtime">
        <span class="label-text">Recomended Playtime</span>
        <span class="label-text-alt">In Minutes</span>
      </label>
      <div class="grid grid-cols-7">
        <input id="min-playtime" type="number" class="input input-bordered w-full col-span-3" bind:value={$collectionEditorData.min_playtime}/>
        <div class="font-bold text-4xl text-center">-</div>
        <input id="max-playtime" type="number" class="input input-bordered w-full col-span-3" bind:value={$collectionEditorData.max_playtime}/>
      </div>
    </div>
    <div id="difficulties" class="form-control w-full col-span-2 border-l-2 border-secondary pl-2">
      <label class="label" for="difficulties">
        <span class="label-text">Game Difficulties</span>
      </label>
      <input id="difficulties-input" type="number" step="0.01" max="5" min="1" class="input input-bordered w-full" bind:value={$collectionEditorData.game_difficulties}/>
    </div>
  </div>
{/if}

<div id="desc-cover" class="mt-4">
  <div id="desc" class="form-control w-full">
    <label class="label" for="desc">
      <span class="label-text">Description</span>
    </label>
    <textarea id="desc-input" class="textarea textarea-bordered h-40" placeholder="Collection Description" bind:value={$collectionEditorData.description}/>
  </div>
  <div class="w-full">
    <div id="cover" class="form-control w-full">
      <label class="label" for="cover">
        <span class="label-text">Image Link (Must using CDN format)</span>
      </label>
      <input id="cover-input" type="text" class="input input-bordered w-full" bind:value={$collectionEditorData.cover}/>
    </div>
  </div>
</div>
