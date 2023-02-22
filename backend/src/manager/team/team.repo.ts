import { Mongoose } from '@class/mongoose.crud'
import { Teams } from './team.model'

export class TeamRepo extends Mongoose {
  constructor() {
    super(Teams)
  }

  // -------------------------------------------------------------- //
  // -- Mongoose Class extend get directly crud based operations -- //
  // -------------------------------------------------------------- //
  // --- Here you can make custom mongo query for Promotion Code -- //
  // -------------------------------------------------------------- //

  // public async customQuery(query) {
  //   return await Teams.find(query)
  // }

  // -------------------------------------------------------------- //
  // -------------------------------------------------------------- //
}

export default new TeamRepo()
