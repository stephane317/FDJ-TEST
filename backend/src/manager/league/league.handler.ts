import Koa from 'koa'
import SearchLeague from './business/search-league.business'

export async function handleGetLeaguePaginated(ctx: Koa.Context) {
  const body: { search: string } = ctx.request.body
  const res = await SearchLeague.init(body)
  ctx.body = res
}
