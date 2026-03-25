
import type { Application } from './declarations'

export const channels = (app: Application) => {
  app.on('connection', (connection: any) => {
    app.channel('everybody').join(connection)
  })
 


} 