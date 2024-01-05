import { Prisma } from "@prisma/client"
export interface iRegisterData {
  fullName: string
  nationalityCountryCode: string
  residenceCountryCode: string
  dob: Date
  genderRefId: number
  district: string
  address: string
  phoneCountry: string
  phone: string
  realId: string
  sourceRealId: string
  telegramId?: string
}

interface iRtData {
  name: string
  skillIndex: number
  baseRP: number
  promotionRP: number
  clubLimit: number
  groupRefId: number
}

export type iUserLocal = Prisma.UserGetPayload<{
  select: {
    id: true,
    seqId: true,
    fullName: true,
    email: true,
    nationalityCountryCode: true,
    residenceCountryCode: true,
    genderRefId: true,
    rtId: true,
    banStatus: true,
    banExpiration: true,
    roleId: true,
    bioValid: true,
    avatarUrl: true,
    rtData: true
  }
}>

export type iUserComplex = Prisma.UserGetPayload<{
  include: {
    rtData: true,
    clubList: true,
  }
}>

export interface iMemberRoles {
  id: number
  roleId: number
  canApproveMember: boolean
  canBuyCC: boolean
  canEditAccess: boolean
  canEditClubInfo: boolean
  canEditClubSetting: boolean
  canSubmitMatch: boolean
  canSubmitTournament: boolean
}