export interface iParticipant {
  userId: number
  fullName: string
  score: number
  playerRtId: number
  playerRtName: string
  playerRtGroup: number
  playerSkillIndex: number
  chombo: number
  yakuman: number
  draw: number
  position: number
  ron?: number
  tsumo?: number
  dealIn?: number
  gainUma?: number
}

export interface iMatchInput {
  matchAt: Date
  type: number
  matchRuleId: number
  playerUniqueCode: string
  note?: string
  participantList: iParticipant[]
  deposit: number
}