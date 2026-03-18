// import type { RealTimeConnection } from '@feathersjs/feathers'
// import type { Application } from './declarations'

// export const channels = (app: Application) => {


//   app.on('connection', (connection: RealTimeConnection) => {
//     console.log("Socket connected")

//     app.channel('example').join(connection)
//   })

//   app.service('messages').publish('created',(data:any)=>{

//     console.log("socket12345")
//     return[
//       app.channel(`user/${data.senderId}`), 
//       app.channel(`user/${data.receiverId}`)
//     ]
//   })





// }import type { RealTimeConnection } from '@feathersjs/feathers'


import type { Application } from './declarations'
import { services } from './services'

export const channels = (app: Application) => {
  app.on('connection', (connection: any) => {
    console.log('connection joined everybody')
    app.channel('everybody').join(connection)
  })

  app.service("messages").publish('created', (data: any) => {
    const senderId = data.senderId.toString()
    const receiverId = data.receiverId.toString()

    console.log(" publish  triggered")

    console.log("Channels exist?",
      app.channel(`msg/${senderId}`).connections.length,
      app.channel(`msg/${receiverId}`).connections.length
    )

    return [
      app.channel(`msg/${senderId}`),
      app.channel(`msg/${receiverId}`)
    ]
  })

} 