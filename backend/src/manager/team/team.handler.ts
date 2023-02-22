import Koa from 'koa'
import GetTeamsByLeagueId from './business/get-teams-by-league-id.business'

export async function handleGetTeamsByLeagueId(ctx: Koa.Context) {
  const params: any = ctx.params
  const res = await GetTeamsByLeagueId.init(params)
  ctx.body = res
}
