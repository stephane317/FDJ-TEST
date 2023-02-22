import { connectMongo } from '@database/mongodb'
import mongoose from 'mongoose'
import { GetPLayersByTeamId } from '@manager/player/business/get-players-by-team-id.business'

describe('PLAYERS CONTROLLER', function () {
  beforeAll(async () => {
    await connectMongo()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('should get players by team id', async () => {
    const params = {
      id: '5d2d01fdda07b95bb8f16f0a'
    }
    const res = await new GetPLayersByTeamId().init(params)
    expect(res).toHaveLength(2)
  })
})
