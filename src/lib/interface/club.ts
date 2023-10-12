import type { iUserSimple } from "./user"

export interface iRegisterClub {
  name: string
  slug: string
  countryISO2: string
  district: string
  address: string
  emailContact?: string
  phoneContact?: string
  phoneCode?: string
  website?: string
}

export interface iMemberPicker {
  id: number
  userData: iUserSimple
}

export interface iMemberAction {
  action: 'rejectPending' | 'approvePending' | 'quit' | 'kick' | 'applyMain' | 'approveMain' | 'rejectMain' | 'becomeAdmin' | 'kickAdmin' | 'transferOwnership'
  targetId: number
}