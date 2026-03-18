import { app } from './app'
import { logger } from './logger'
import { configureSocketEvents, configureSockets } from './socket-listen'

const port = app.get('port')
const host = app.get('host')

process.on('unhandledRejection', reason => logger.error('Unhandled Rejection %O', reason))
configureSockets(app)
app.listen(port).then(() => {
    configureSocketEvents(app)
  console.log('channels:', app.channel('everybody').length)

  logger.info(`Feathers app listening on http://${host}:${port}`) 
})
 