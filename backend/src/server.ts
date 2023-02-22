import 'module-alias/register'
import { app } from '@app'
import { connectMongo } from '@database/mongodb'
import logger from '@service/logger.service'
const PORT = process.env.FDJ_PORT

// eslint-disable-next-line import/no-mutable-exports
let server = null
;(async () => {
  try {
    server = app.listen(PORT)
    logger.info(`SERVER STARTED ON PORT ${PORT}`)
    await connectMongo()
  } catch (error) {
    logger.error('---> ERROR SERVER', error)
    app.emit('error', error)
  }
})()

export default server
