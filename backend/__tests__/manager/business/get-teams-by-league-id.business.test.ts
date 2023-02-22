import { connectMongo } from '@database/mongodb'
import mongoose from 'mongoose'
import { GetTeamsByLeagueId } from '@manager/team/business/get-teams-by-league-id.business'

describe('TEAMS CONTROLLER', function () {
  beforeAll(async () => {
    await connectMongo()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('should get teams by league id', async () => {
    const params = {
      id: '5d2cdcf7da07b95bb8f16ed1'
    }
    const res = await new GetTeamsByLeagueId().init(params)
    expect(res).toHaveLength(3)
  })
})
