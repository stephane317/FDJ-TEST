import Router from 'koa-router'
import { handleGetTeamsByLeagueId } from './team.handler'

const router: Router = new Router()

router.get('/league/:id', handleGetTeamsByLeagueId)

export default router.routes()
