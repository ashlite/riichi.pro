import { Prisma } from "@prisma/client"

export interface iParticipant {
  clubMemberId: number
  fullName: string
  score: number
  playerRtId: number
  playerRtName: string
  playerRtGroup: number
  chombo: number
  yakuman: number
  ron?: number
  tsumo?: number
  dealIn?: number
  avatarUrl: string | null
}

export interface iMatchInput {
  matchAt: Date
  type: number
  matchRuleId: number
  playerUniqueCode: string
  note?: string
  participantList: iParticipant[]
  participantIdList: number[]
  deposit: number
}

export interface iRTList {
  [key: number]: Prisma.RankTittleGetPayload<{
    select:{
      id: true,
      groupRefId: true,
      skillIndex: true,
      first: true,
      second: true,
      third: true,
      fourth: true,
      promotionRP: true,
      demotion: true,
      baseRP: true,
    }
  }>
}

export interface iPlayerData {
  [key: number]: Prisma.ClubMemberGetPayload<{
    select: {
      id: true,
      roleId: true,
      userData: {
        select: {
          id: true,
          seqId: true,
          currentRP: true,
          rtId: true,
          rankedAt: true,
        }
      }
    }
  }>
}

export interface iUpdateManyPlayerData {
  [key: number]: Prisma.UserUpdateArgs
}

export interface iUpsertUmaStandingInput {
  [key: number]: Prisma.ClubUmaStandingUpsertArgs
}