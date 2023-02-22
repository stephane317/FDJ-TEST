import { LeagueController } from '../league.controller'
import searchJoi from '@joi/search.joi'
import { ILeague } from '@type/league.interface'
import LeagueRepo from '../league.repo'

interface IBodySearch {
  search: string
}

export class SearchLeague extends LeagueController {
  constructor() {
    super(searchJoi)
  }

  public async init(body: IBodySearch): Promise<ILeague[]> {
    const validatedBody: IBodySearch = this.isBodyValid(body)
    return LeagueRepo.searchText(validatedBody.search)
  }
}

export default new SearchLeague()
