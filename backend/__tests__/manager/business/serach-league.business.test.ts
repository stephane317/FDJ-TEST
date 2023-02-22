import { connectMongo } from '@database/mongodb'
import mongoose from 'mongoose'
import { SearchLeague } from '@manager/league/business/search-league.business'

describe('LEAGUE CONTROLLER', function () {
  beforeAll(async () => {
    await connectMongo()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('should get a league by search with value e', async () => {
    const body = {
      search: 'e'
    }
    const res = await new SearchLeague().init(body)

    expect(res).toHaveLength(3)
  })

  test('should get a league by search with value fr', async () => {
    const body = {
      search: 'fr'
    }
    const res = await new SearchLeague().init(body)
    expect(res).toHaveLength(1)
  })
})
