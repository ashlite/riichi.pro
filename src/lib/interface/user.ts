export interface iRegisterData {
  firstName: string,
  lastName: string,
  countryISO2: string,
  email: string,
  pass1: string,
  pass2: string,
  firebaseId?: string
  firebaseIdToken?: string
}

interface iRtData {
  name: string
}

interface iPlayer {
  id: number
  alias: string | null
  currentRP: number
  currentMP: number
  rtData: iRtData
}

export interface iUserLocal {
  id: string
  firstName: string,
  lastName: string,
  countryCode: string,
  email: string,
  emailVerified: boolean,
  roleId: number
  playerData: iPlayer | null
}