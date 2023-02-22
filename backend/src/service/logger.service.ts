import { IFormattedLoggerData } from '@type/app-error.type'
import config from 'config'
import { createLogger, format, transports } from 'winston'
import { consoleFormat } from 'winston-console-format'

const ENV = process.env.NODE_ENV

const defaultJsonFormat = format.combine(format.timestamp(), format.ms(), format.errors({ stack: true }), format.splat(), format.json())

const colorConsoleFormat = format.combine(
  format.colorize({ all: true }),
  format.padLevels(),
  consoleFormat({
    showMeta: true,
    inspectOptions: {
      depth: Infinity,
      colors: true,
      maxArrayLength: Infinity,
      breakLength: 120,
      compact: Infinity
    }
  })
)

const logger = createLogger({
  level: config.get('log.level'),
  defaultMeta: {
    service: 'api',
    env: ENV.toLowerCase()
  },
  format: defaultJsonFormat,
  transports: [
    new transports.Console({
      level: config.get('log.level'),
      format: 'color' ? colorConsoleFormat : defaultJsonFormat
    })
  ]
})

logger.silly('Logging initialized')

export default logger
