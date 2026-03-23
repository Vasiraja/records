 
import type { Application } from './declarations'
 
export const channels = (app: Application) => {
  app.on('connection', (connection: any) => {
    console.log('connection joined everybody')
    app.channel('everybody').join(connection)
  })

   
} 