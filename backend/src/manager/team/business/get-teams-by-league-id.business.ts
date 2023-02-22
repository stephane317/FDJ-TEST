import { TeamController } from '../team.controller'
import objectIdJoi from '@joi/objectId.joi'
import { ObjectId } from 'mongodb'
import TeamRepo from '../team.repo'
import { ITeam } from '@type/team.interface'
import InternalGetLeagueById from '@manager/league/internal/get-league-by-id.internal'
import { ILeague } from '@type/league.interface'
import { Types } from 'mongoose'

interface IParams {
  id: string
}

export class GetTeamsByLeagueId extends TeamController {
  constructor() {
    super(objectIdJoi)
  }

  public async init(params: IParams): Promise<ITeam[]> {
    const validatedBody: IParams = this.isBodyValid(params)
    const league: ILeague = await InternalGetLeagueById.init(validatedBody.id)
    return TeamRepo.getManyByQuery({ _id: { $in: league.teams } })
  }
}

export default new GetTeamsByLeagueId()
