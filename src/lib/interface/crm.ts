/* eslint-disable @typescript-eslint/no-empty-interface */
interface baseVenue {
  id: number
  name: string
  address?: string
  phone?: string
  city?: string
}

interface baseCustomer {
  name: string
  email?: string
  mobile?: string
  // address?: string
  state?: string
  country?: string
}

interface baseSupplier {
  supplier_name: string
  country: string
  email?: string
}

export interface iVenueStock {
  Venue: iGetVenueBulk
  stock: number
}

////////////////////////////
// CUSTOMER
////////////////////////////
export interface iGetCustomerBulk extends baseCustomer {
  id: number
}

export interface iGetCustomerComplex extends baseCustomer {
  id: number
  score?: number
  address1?: string
  address2?: string
  zipcode?: string
  city?: string
}

export interface iEditCustomer extends baseCustomer{
  address1?: string
  address2?: string
  zipcode?: string
  city?: string
}

/////////////////////////////
// SUPPLIER
/////////////////////////////
export interface iGetSupplierBulk extends baseSupplier {
  id: number
}

export interface iEditSupplier extends baseSupplier {
  phone?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  zipcode?: string
  notes?: string
  cp_name?: string
  cp_email?: string
  cp_mobile?: string
}

export interface iGetSupplierComplex extends iEditSupplier {
  id: number
}

///////////////////////////////
// VENUE
///////////////////////////////
export interface iGetVenueBulk {
  id: number
  name: string
  is_internal: boolean
}

export interface iGetVenueComplex extends iGetVenueBulk {
  address?: string
  phone?: string
  city?: string
}

export interface iEditVenue {
  name: string
  is_internal: boolean
  address?: string
  phone?: string
  city?: string
}