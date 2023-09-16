export interface iWebUser {
  name: string
  email: string
  avatar: string
  level: number
}

export interface iBaseUser {
  id: string
  first_name: string
  last_name: string
  email: string
}

export interface iBaseUserComplex extends iBaseUser{
  user_level: number
  registered_at: Date
  user_access: any
}