import type { RealTimeConnection } from '@feathersjs/feathers'
import type { Application } from './declarations'

export const channels = (app: Application) => {

 
  app.on('connection', (connection: RealTimeConnection) => {
    console.log("Socket connected")

    app.channel('example').join(connection)
  })

  app.service('messages').publish('created',(data:any)=>{

    console.log("socket12345")
    return[
      app.channel(`user/${data.senderId}`),
      app.channel(`user/${data.receiverId}`)
    ]
  })
 

 


}