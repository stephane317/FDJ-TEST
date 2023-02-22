import 'module-alias/register'
import Koa from 'koa'
import { koaSwagger } from 'koa2-swagger-ui'
import yamljs from 'yamljs'
import Router from 'koa-router'
const PORT = 3000

const app = new Koa()
const router = new Router()

const spec = yamljs.load('api.yml')

router.get('/swagger', koaSwagger({ routePrefix: false, swaggerOptions: { spec } }))

router.get('/health', (ctx, next) => {
  ctx.body = {
    status: 'UP'
  }
})

app.use(router.routes())
app.listen(PORT)

console.log('API started')
