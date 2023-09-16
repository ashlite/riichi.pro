interface cashflowType {
  flow_type: string
  is_negative: boolean
}

interface baseDoc {
  id: number
  name: string
  path: string
}

export interface iGetCashflowBulk {
  id: number
  flow_amount: number
  type: cashflowType
  type_id: number
  notes?: string
  forex_symbol?: string
  list_doc?: baseDoc[]
  forex_amount?: number
  forex_rate?: number
  created_at?: Date
  header_purchase_id?: number
}

export interface iEditCashflow {
  id? : number
  flow_amount: number
  notes?: string
  forex_symbol?: string
  forex_amount?: number
  forex_rate?: number
  created_at?: Date
  type_id?: number
  header_purchase_id?: number
}

export interface iCreateCashflow extends iEditCashflow {
  type_id: number
}

export interface iGetCashflowType {
  flow_type: string
  is_negative: boolean
  id: number
}