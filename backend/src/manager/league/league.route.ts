import Router from 'koa-router'
import { handleGetLeaguePaginated } from './league.handler'

const router: Router = new Router()

router.post('/search', handleGetLeaguePaginated)

export default router.routes()
