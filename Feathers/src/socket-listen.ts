import type { Application } from './declarations'
import { Socket } from 'socket.io'

const userSocketMap = new Map<string, any>()

 export const configureSockets = (app: Application) => {
  app.on('login', async (authResult: any, info: any) => {
    console.log('login triggered')

    const user = authResult.userdet
    if (!user?._id) return

    const userId = String(user._id)
    const connection = info?.connection

    if (connection) {
      connection.user = user
      userSocketMap.set(userId, connection)

      console.log('User attached')

      app.channel(`user/${userId}`).join(connection)

      console.log('User attached to socket:', userId)
    }

    await app.service('userdet').patch(userId, {
      isOnline: true,
      lastAction: new Date().toISOString()
    })

    console.log(`User ${userId} online`)
  })
}

 export const configureSocketEvents = (app: Application) => {
  const io = (app as any).io

  if (!io) {
    console.error('Socket.io not ready — make sure configureSocketEvents is called after app.listen()')
    return
  }

  io.on('connection', (socket: Socket) => {
    console.log('Socket connected:', socket.id)

    socket.on('joinPoll', (pollId: string) => {
      const connection = (socket as any).feathers

      if (!connection) {
        console.log('Feathers connection not ready')
        return
      }

      const room = `poll/${pollId}`
      console.log('Joining:', room)
      app.channel(room).join(connection)
    })

    socket.on('leavePoll', (pollId: string) => {
      const connection = (socket as any).feathers
      if (!connection) return

      const room = `poll/${pollId}`
      console.log('Leaving:', room)
      app.channel(room).leave(connection)
    })
  })
}