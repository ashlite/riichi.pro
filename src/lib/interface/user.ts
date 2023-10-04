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

interface iPlayer {
  id: number
  alias: string | null
  currentRP: number
  currentMP: number
  rtData: iRtData
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