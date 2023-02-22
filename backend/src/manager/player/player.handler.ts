import Koa from 'koa'
import GetPLayersByTeamId from './business/get-players-by-team-id.business'

export async function handleGetSoccerByTeamId(ctx: Koa.Context) {
  const params: { id: string } = ctx.params
  const res = await GetPLayersByTeamId.init(params)
  ctx.body = res
}
