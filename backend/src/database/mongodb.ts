import logger from '@service/logger.service'
import config from 'config'
import mongoose from 'mongoose'

// CONFIG MONGO
mongoose.Promise = global.Promise
mongoose.set('strictQuery', true)
mongoose.set('debug', false)

const MONGO_URL = config.get('db.mongo_uri')
const MONGO_URL_CO: any = MONGO_URL

export async function connectMongo() {
  logger.info('LAUNCH MONGO CONNECTION')

  if (process.env.PLATFORM === 'developement') {
    // mongoose debug mode
    mongoose.set('debug', false)
  }

  return new Promise((res, rej) => {
    mongoose.connect(MONGO_URL_CO, {})
    const connection = mongoose.connection
    connection.on('err', rej)
    connection.once('open', res)
  })
}
