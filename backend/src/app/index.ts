import cors from '@koa/cors'
import Koa from 'koa'
import koaBody from 'koa-body'
import bodyparser from 'koa-bodyparser'
import compress from 'koa-compress'
import helmet from 'koa-helmet'
import { router } from '../router'

const app = new Koa()

app.use(cors())
app.use(helmet())
app.use(compress())
app.use(koaBody({ multipart: true }))
app.use(bodyparser())
app.use(router.routes())
app.use((ctx: Koa.Context) => {
  ctx.type = 'json'
})

export { app }
