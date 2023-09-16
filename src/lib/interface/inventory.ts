/* eslint-disable @typescript-eslint/no-empty-interface */
import type { iGetSupplierComplex } from "./crm"

interface baseVenue {
  id: number
  name: string
  city?: string
}

interface baseUser {
  id: string
  first_name: string
  last_name: string
  email: string
}

interface baseApproval {
  id: number
  approval_type: number
  created_at: Date
  notes?: string
  user: baseUser
}

interface baseHeaderPurchase {
  supplier_id: number
  purchase_notes?: string
  idr_buy_rate?: number
  idr_sell_rate?: number
  forex_symbol?: string
  header_date: string
  canceled: boolean
  external_ref?: string
}

interface baseCollection {
  id: number
  name: string
  released: number
  cover: string
}

export interface baseProduct {
  id: number
  sku: string
  name: string
  buy_price: number
  sell_price: number
  product_image: string
  collection: baseCollection
}

interface baseDoc {
  id: number
  name: string
  path: string
  header_purchase_id: number
}

interface baseCashflowType {
  id: number
  flow_type: string
  is_negative: boolean
}

//////////////////////////////
// Purchase
//////////////////////////////

export interface iGetHeaderPurchaseBulk {
  id: number
  header_date: Date
  finish_at?: Date
  creator: baseUser
  supplier: iGetSupplierComplex
  approval_purchase: baseApproval[]
  total_idr_buy: number
  total_idr_sell: number
  total_items?: number
  canceled_at?: Date
  external_ref?: string
}

interface itemList {
  id: number
  product_id: number
  ordered_qty: number
  forex_buy?: number
  forex_sell?: number
  idr_buy_price: number
  idr_sell_price: number
  is_new: boolean
  product: baseProduct
}

interface cashFlow {
  id: number
  notes?: string
  type: baseCashflowType
  forex_symbol?: string
  forex_amount?: number
  forex_rate?: number
  flow_amount: number
  created_at: Date
  list_doc: baseDoc[]
}

export interface iGetHeaderPurchaseComplex extends baseHeaderPurchase {
  id: number
  finish_at?: Date
  creator: baseUser
  supplier: iGetSupplierComplex
  approval_purchase: baseApproval[]
  canceled_at?: Date
  created_at: Date
  list_item: itemList[]
  canceled_user?: baseUser
  list_doc: baseDoc[]
  reference_movement: headerMovement[]
  cashflow: cashFlow[]
}

export interface iGetItemList extends itemList{}

export interface iEditHeaderPurchase extends baseHeaderPurchase {}

//////////////////////////////
// Header Movement
//////////////////////////////
export interface iListMovement {
  id: number
  product_id: number
  qty: number
  apply_movement: boolean
  product: baseProduct
}

interface headerMovement {
  id: number
  header_purchase_id?: number 
  movement_notes?: string
  movement_type: number
  canceled: boolean
  create_at: Date
  finish_at?: Date
  canceled_at?: Date
  target_venue: baseVenue
  list_movement?: iListMovement[]
}

export interface iGetHeaderMovementBulk {
  id: number,
  movement_type: number
  header_purchase_id?: number
  movement_notes?: string
  create_at: Date
  finish_at?: Date
  origin_venue?: baseVenue
  target_venue?: baseVenue
  canceled_at?: Date
}

export interface iGetHeaderMovementComplex extends iGetHeaderMovementBulk {
  create_user: baseUser
  finalized_user?: baseUser
  canceled_user?: baseUser
  list_movement?: iListMovement[]
}

export interface iEditHeaderMovement {
  id?: number
  header_purchase_id?: number
  movement_type: number
  movement_notes?: string
  origin_venue_id?: number
  target_venue_id?: number
}

export interface iAddMovementItem {
  qty: number
  product_id: number
  move_at?: string
}

export interface iMovementType {
  id: number
  movement_type: string
}

export interface iListMovementInventory {
  id: number
  qty: number
  move_at: Date
  apply_movement: boolean
  product: baseProduct
  header_movement_id?: number
  sale_id?: number
}

export interface iGetListMovement {
  total: number,
  list_movement: iListMovementInventory[]
}

export interface iUpcomingProduct{
  product_id: number,
  product: baseProduct,
  ordered_qty: number
}