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
}

export interface iUserLocal {
  id: number
  uuid: string
  fullName: string
  email: string
  roleId: number
  banStatus: boolean
  banReason: string | null
  banExpiration: Date | null
  banedAt: Date | null
  currentRP: number
  rtData: iRtData
}

export interface iUserSimple {
  id: number
  uuid: string
  fullName: string
  email: string
  banStatus: boolean
  rtId: number
  rtData: iRtData
}

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