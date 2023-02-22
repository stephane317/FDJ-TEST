import Koa from 'koa'

export default async (ctx: Koa.Context, next: Koa.Next) => {
  await next()
}
