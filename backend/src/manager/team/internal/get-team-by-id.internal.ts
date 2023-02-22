import { TeamController } from '../team.controller'
import searchJoi from '@joi/search.joi'
import { ObjectId } from 'mongodb'
import TeamRepo from '../team.repo'
import { ITeam } from '@type/team.interface'
import InternalGetLeagueById from '@manager/league/internal/get-league-by-id.internal'
import { ILeague } from '@type/league.interface'

export class InternalGetTeamById extends TeamController {
  constructor() {
    super()
  }

  public async init(teamId: string): Promise<ITeam> {
    return TeamRepo.getOneById(teamId)
  }
}

export default new InternalGetTeamById()
