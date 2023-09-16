import { writable } from "svelte/store"
import {v4 as uuid4} from 'uuid'

export const bggSearchResult = writable()
export const collectionPagination = writable()
export const collectionDeleteId = writable(false)
export const collectionDeleteName = writable('')
export const listCollection = writable(false)
export const totalCollection = writable(false)
export const toggleModalCollectionEditor = writable(false)
export const toggleMainDrawer = writable(true)
export const forexPricingRate = writable(0)

const pageUniqueState = () => {
  const {set, subscribe} = writable(uuid4)
  return {
    subscribe,
    generate: () => set(uuid4)
  }
}

export const pageState = pageUniqueState()