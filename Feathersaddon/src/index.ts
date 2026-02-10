import { app } from './app'
import { logger } from './logger'
import { messages } from './services/mess/mess'

const port = app.get('port')
const host = app.get('host')
// app.configure(messages); 

process.on('unhandledRejection', reason => logger.error('Unhandled Rejection %O', reason))

app.listen(port).then(() => {
  logger.info(`Feathers app listening on http://${host}:${port}`)
})
 