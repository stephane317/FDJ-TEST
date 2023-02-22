import Router from 'koa-router'
import { handleGetSoccerByTeamId } from './player.handler'

const router: Router = new Router()

router.get('/team/:id', handleGetSoccerByTeamId)

export default router.routes()
