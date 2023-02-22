import { PlayerController } from '../player.controller'
import objectIdJoi from '@joi/objectId.joi'
import { IPlayer } from '@type/player.interface'
import PlayerRepo from '../player.repo'
import { ObjectId } from 'mongodb'
import InternalGetTeamById from '@manager/team/internal/get-team-by-id.internal'
import { ITeam } from '@type/team.interface'

interface IParams {
  id: string
}

export class GetPLayersByTeamId extends PlayerController {
  constructor() {
    super(objectIdJoi)
  }

  public async init(params: IParams): Promise<IPlayer[]> {
    const validatedBody: IParams = this.isBodyValid(params)
    const team: ITeam = await InternalGetTeamById.init(validatedBody.id)
    return PlayerRepo.getManyByQuery({ _id: { $in: team.players } })
  }
}

export default new GetPLayersByTeamId()
