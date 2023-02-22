import { Mongoose } from '@class/mongoose.crud'
import { ILeague } from '@type/league.interface'
import { Leagues } from './league.model'

export class LeagueRepo extends Mongoose {
  constructor() {
    super(Leagues)
  }

  // -------------------------------------------------------------- //
  // -- Mongoose Class extend get directly crud based operations -- //
  // -------------------------------------------------------------- //
  // --- Here you can make custom mongo query for Promotion Code -- //
  // -------------------------------------------------------------- //

  // public async customQuery(query) {
  //   return await League.find(query)
  // }

  public async searchText(value: string): Promise<ILeague[]> {
    return Leagues.aggregate([
      {
        $match: {
          name: {
            $regex: value,
            $options: 'i'
          }
        }
      },
      { $limit: 10 }
    ])
  }

  // -------------------------------------------------------------- //
  // -------------------------------------------------------------- //
}

export default new LeagueRepo()
