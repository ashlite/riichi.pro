import type { iBaseUser } from "./user"
import type { iGetCustomerBulk, iGetVenueComplex } from "./crm"
import type { baseProduct } from "./inventory"

interface iBaseProcessor {
  id: number
  name: string
  description?: string
  image_link?: string
}

export interface iBaseModifierType {
  sale_type: string
  id: number
  default_mod?: number
  is_percentage?: boolean
  notes?: string
  is_substraction: boolean
}

interface iBaseStatus {
  id: number
  status_id: string
  created_at: Date
  external_update: boolean
  notes?: string
  user?: iBaseUser
}

export interface iListModifier {
  mod_price: number
  notes?: string
  id: number
  type_data: iBaseModifierType
}

export interface iBaseListProduct {
  discount_price?: number
  qty: number
  sell_price: number
  id: number
  cost_price: number
  product: baseProduct
}

export interface iGetSaleBulk {
  notes?: string
  created_at: Date
  id: number
  created_user: iBaseUser
  customer?: iGetCustomerBulk
  venue: iGetVenueComplex
  status: string
  is_finish: boolean
  processor?: iBaseProcessor
  list_product: iBaseListProduct[]
}

export interface iGetSaleComplex extends iGetSaleBulk{
  list_product: iBaseListProduct[]
  list_modifier: iListModifier[]
  status_history: iBaseStatus[]
}

export interface iCreateSale {
  id: number
  notes?: string
  created_at?: Date | string
  customer_id?: number
  venue_id: number
}