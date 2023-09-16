export interface iGetForex {
  forex_symbol: string
  forex_name: string
  idr_buy_rate: number
  idr_sell_rate: number
}

export interface iEditForex {
  forex: iGetForex
}