import Router from 'koa-router'
import leagueRoute from '@manager/league/league.route'
import playerRoute from '@manager/player/player.route'
import teamRoute from '@manager/team/team.route'

export const router: Router = new Router()

router.use('/league', leagueRoute)
router.use('/player', playerRoute)
router.use('/team', teamRoute)
