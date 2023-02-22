import { LeagueController } from '../league.controller'
import { ILeague } from '@type/league.interface'
import LeagueRepo from '../league.repo'
import { ObjectId } from 'mongodb'

export class InternalGetLeagueById extends LeagueController {
  constructor() {
    super()
  }

  public async init(leagueId: string): Promise<ILeague> {
    return LeagueRepo.getOneById(leagueId)
  }
}

export default new InternalGetLeagueById()
