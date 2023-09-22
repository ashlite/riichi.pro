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

interface iPlayer {
  id: number
  alias?: string
  currentRP: number
  currentMP: number
  rtName: string
}

export interface iUser {
  id: string
  firstName: string,
  lastName: string,
  countryISO2: string,
  email: string,
  emailVerified: boolean,
  firebaseId: string,
  roleId: number
  playerData?: iPlayer
}