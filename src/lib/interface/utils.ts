export interface iPagination {
  total_item: number
  total_page: number
  item_page: number
  current_page: number
  item_skip: number
}

export interface iReqError {
  status: number
  status_text: string
  url: string
}

export interface iCount {
  total_purchase?: number
  total_product?: number
  total_collection?: number
  total_customer?: number
  total_supplier?: number
  total_venue?: number
}

export interface iPrinter {
  name: string
  width: number
  invalid: boolean
}

export interface iUSBDevice {
  manufacturerName?: string
  productId: number
  productName?: string
  serialNumber?: string
  vendorId?: number | string
}