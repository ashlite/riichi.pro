import type { Prisma } from "@prisma/client"

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

export type iMemberPicker = Prisma.ClubMemberGetPayload<{
  include: {
    userData: {
      include: {
        rtData: true
      }
    }
  }
}>

export type iListClub = Prisma.ClubGetPayload<{
  select: {
    id: true,
    name: true,
    emblemFile: true,
    totalMember: true,
    totalMainMember: true,
    countryISO2: true,
    slug: true
  }
}>

export interface iMemberAction {
  action: 'rejectPending' | 'approvePending' | 'quit' | 'kick' | 'applyMain' | 'approveMain' | 'rejectMain' | 'becomeAdmin' | 'kickAdmin' | 'transferOwnership'
  targetId: number
}

export interface iClubOfficialAction {
  actionId: number
  notes: string | null
}