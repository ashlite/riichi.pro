<script lang="ts">
import TextInput from "molecule/textInput.svelte";
import Select from "molecule/select.svelte";
import SelectItem from "atom/selectItem.svelte";
import Toggle from "atom/toggle.svelte";
import NumberInput from "molecule/numberInput.svelte";
import TextArea from "molecule/textArea.svelte";
import Button from "atom/button.svelte";
import { onMount } from "svelte"
import type { iGetProductBulk, iCollectionComplex } from "interface/catalogue";
import { get } from "$lib/service/api"

interface iTokopediaCategoryC2 {
  name: String
  id: string
}
interface iTokopediaCategoryC1 {
  name: String
  id: string
  child: iTokopediaCategoryC2[]
}
interface iTokopediaCategoryC0 {
  name: String
  id: string
  child: iTokopediaCategoryC1[]
}
interface iTokopediaShowcase {
  id: number
  name: string
}
interface iTokopediaInput {
  name: string
  category_id: string
  price: number
  stock: number
  id_showcase: number
  sku: string
  min_order?: number
  weight_gram?: number
  is_new?: boolean
  description?: string
  must_insurance?: boolean
  free_return?: boolean
  preorder?: number
  pictures?: string[]
  youtube?: string[]
}

export let codxProduct: iGetProductBulk
let tokopediaCategory: Promise<iTokopediaCategoryC0[]> = get('/channel/tokopedia/category')
let tokopediaShowcase: Promise<iTokopediaShowcase[]> = get('/channel/tokopedia/showcase')
tokopediaCategory.then(res => console.log(res))
tokopediaShowcase.then(res => console.log(res))
let tokopediaInput: iTokopediaInput = {
  name: codxProduct.collection.name + ' ' + codxProduct.name,
  category_id: '',
  price: codxProduct.sell_price,
  stock: codxProduct.total_stock,
  id_showcase: 0,
  sku: codxProduct.id.toString(),
  min_order: 1,
  weight_gram: 1,
  is_new: true,
  description: '',
  must_insurance: false,
  free_return: false,
  preorder: 0,
  pictures: [codxProduct.product_image ?? codxProduct.collection.cover ?? ''],
  youtube: [],
}
let imageLink: string
let youtubeLink: string

// onMount(async () => {
//   tokopediaCategory = await get('/channel/tokopedia/category')
//   tokopediaShowcase = await get('/channel/tokopedia/showcase')
// })

// function descriptionCreator(): string {
//   if (codxCollection.category == 'core game') {
//     return (`Pemain : ${codxCollection.min_player}-${codxCollection.max_player} Orang
//     lama permainan : ${codxCollection.min_playtime}-${codxCollection.max_playtime} min
//     Usia : ${codxCollection.min_age}+
//     Tingkat kesulitan : ${codxCollection.game_difficulties ?? '0'} / 10
//     TAG : ${codxCollection.bgg_group?.forEach(item => {
//       return item.value+','
//     })}

//     ${codxCollection.description}`)
//   } else if (codxCollection.category == 'expansion') {
//     return ''
//   }
//   return ''
// }

</script>

<form>
  <div class="grid grid-cols-4 gap-4">
    <div class="col-span-2">
      <TextInput labelTL="Listing name" bind:value={tokopediaInput.name} limit={300} />
    </div>
    <div>
      {#await tokopediaCategory}
        <div class="loading loading-ring loading-lg"></div>
      {:then category} 
        <Select labelTL="Category" bind:value={tokopediaInput.category_id}>
          {#each category as c0}
            {#each c0.child as c1}
              {#each c1.child as c2}
                <SelectItem text={`${c0.name} - ${c1.name} - ${c2.name}`} value={c2.id} />
              {/each}  
            {/each}
          {/each}
        </Select> 
      {/await}
    </div>
    <div>
      {#await tokopediaShowcase}
        <div class="loading loading-ring loading-lg"></div>
      {:then showcase} 
        <Select labelTL="Etalase" bind:value={tokopediaInput.id_showcase}>
          {#each showcase as item}
            <SelectItem text={item.name} value={item.id} />
          {/each}
        </Select>
      {/await}
    </div>
    <div>
      <NumberInput labelTL="Price in IDR" bind:value={tokopediaInput.price} />
    </div>
    <div>
      <NumberInput labelTL="Weight in Gram" bind:value={tokopediaInput.weight_gram} />
    </div>
    <div>
      <NumberInput labelTL="Minimal Order" bind:value={tokopediaInput.min_order} />
    </div>
    <div>
      <NumberInput labelTL="Preorder in days" bind:value={tokopediaInput.preorder} labelTR="0 if no preorder" />
    </div>
    <div>
      <Toggle label="New Items?" bind:checked={tokopediaInput.is_new} vertical size="lg" />
    </div>
    <div>
      <Toggle label="Must Insurance?" bind:checked={tokopediaInput.must_insurance} vertical size="lg" />
    </div>
    <div class="col-span-2">
      <TextArea labelTL="Description" bind:value={tokopediaInput.description} limit={3000} />
    </div>
    <div>
      <TextInput labelTL="Image Link" bind:value={imageLink} />
    </div>
    <div class="self-end">
      <Button text="Add Image" size="lg" color="info" full />
    </div>
    <div>
      <TextInput labelTL="Youtube Link" bind:value={youtubeLink} />
    </div>
    <div class="self-end">
      <Button text="Add Video" size="lg" color="info" full/>
    </div>
  </div>
</form>