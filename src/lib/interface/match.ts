export interface iParticipant {
  userId: number
  fullName: string
  score: number
  playerRtId: number
  playerRtName: string
  chombo: number
  draw: boolean
  position?: number
  ron?: number
  tsumo?: number
  dealIn?: number
}

export interface iMatchInput {
  matchAt: Date
  type: number
  officialRule: boolean
  playerUniqueCode: string
  note?: string
  participantList: iParticipant[]
}