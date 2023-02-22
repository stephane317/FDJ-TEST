import { Mongoose } from '@class/mongoose.crud'
import { Players } from './player.model'

export class PlayerRepo extends Mongoose {
  constructor() {
    super(Players)
  }

  // -------------------------------------------------------------- //
  // -- Mongoose Class extend get directly crud based operations -- //
  // -------------------------------------------------------------- //
  // --- Here you can make custom mongo query for Promotion Code -- //
  // -------------------------------------------------------------- //

  // public async customQuery(query) {
  //   return await Player.find(query)
  // }

  // -------------------------------------------------------------- //
  // -------------------------------------------------------------- //
}

export default new PlayerRepo()
