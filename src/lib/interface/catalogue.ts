import type { iVenueStock } from "./crm"
///////////////////////////////
// BASE
///////////////////////////////
interface baseCollectionSimple {
  id: number
  name: string
  category: string
  released?: number
  cover?: string
  bgg_id?: string
}

interface baseCollection {
  id?: number
  name: string
  category: string
  released?: number
  min_player?: number
  max_player?: number
  min_playtime?: number
  max_playtime?: number
  min_age?: number
  bgg_id?: string
  game_difficulties?: number
  cover?: string
  thumb_cover?: string
  description?: string
}
interface baseProduct {
  collection_id?: number
  name: string
  barcode?: string
  product_image?: string
  notes?: string
}
export interface iBggGroup {
  id: string
  group_type: string
  value: string
}

////////////////////////////////////
// Collection
////////////////////////////////////
export interface iCollectionBulk extends baseCollection {
  id: number
  total_product: number
}
export interface iBggId {
  bggId: string
}
export interface iAddCollection extends baseCollection {
  id?: number
  master?: number[]
  slave?: number[]
  bgg_group?: iBggGroup[]
  product?: iProduct[]
}

export interface iCollectionComplex extends baseCollection {
  id: number
  slave?: baseCollection[]
  master?: baseCollection[]
  product?: iProduct[]
  bgg_group?: iBggGroup[]
}

export interface iCollectionSimple {
  id: number
  name: string
  category: string
  released?: 0
  cover?: string
  bgg_id?: string
}

//////////////////////////////////
// PRODUCT
//////////////////////////////////
export interface iAddProduct extends baseProduct{
  id?: number
  track_inventory?: boolean
  buy_price?: number
  sell_price?: number
  commision?: number
}

export interface iProduct extends baseProduct {
  id: number
  track_inventory: boolean
  buy_price: number
  sell_price: number
  commision?: number
}
export interface iGetProductBulk extends iProduct {
  create_at: Date
  total_stock: number
  collection: iCollectionSimple
  sku: string
}

//////////////////////////////////
// CHANNEL
//////////////////////////////////

interface Channel {
  id: number
  product_id: number
  provider: 'tokopedia' | 'shopee' | 'tiktok'
  provider_uid: string
  status?: string
}

export interface iEditChannel {
  id?: number
  product_id: number
  provider?: 'tokopedia' | 'shopee' | 'tiktok'
  provider_uid: string
  status?: string
}

export interface iGetChannelProductList extends iGetProductBulk {
  channel: Channel[]
}

interface TokopediaCategory {
  id: number
  name: string
  title: string
}

interface TokopediaPic {
  id: number
  ori_url: string
  thumb_url: string
}

interface TokopediaVid {
  source: string
  url: string
}

export enum enumStatusTokopedia {
  Banned = -2,
  Pending = -1,
  Deleted = 0,
  Active = 1,
  Best = 2,
  Inactive = 3
}

export enum enumConditionTokopedia {
  Baru = 1,
  Bekas = 2
}

export interface iTokopediaProduct {
  tokopedia_id: number
  status: enumStatusTokopedia
  name: string
  sku?: string
  condition: enumConditionTokopedia
  main_category_id: number
  short_desc: number
  page_url: string
  mobile_url: string
  price: number
  weight: number
  use_stock: boolean
  main_stock: number
  reserve_stock: number
  showcase_id: number
  showcase_name: string
  preorder_duration: number
  min_order: number
  on_campaign: boolean
  total_success: number
  total_reject: number
  total_sold: number
  total_view: number
  category_tree: TokopediaCategory[]
  pictures: TokopediaPic[]
  videos: TokopediaVid[]
}