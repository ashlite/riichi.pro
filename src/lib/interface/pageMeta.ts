/* eslint-disable @typescript-eslint/no-empty-interface */
import type { iPagination } from "interface/utils"

interface standardMeta {
  pagination: iPagination
  url_param: string
}
export interface iCollectionMeta extends standardMeta{}

export interface iProductMeta extends standardMeta{}

export interface iCustomerMeta extends standardMeta{}

export interface iSupplierMeta extends standardMeta{}

export interface iVenueMeta extends standardMeta{}

export interface iPurchaseMeta extends standardMeta{}

export interface iInvReportMeta extends standardMeta{}

export interface iMovementMeta extends standardMeta{}

export interface iSaleMeta extends standardMeta{}

export interface iAccessMeta extends standardMeta{}

export interface iChannelMeta extends standardMeta{}